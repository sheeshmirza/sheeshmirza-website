"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ZodType } from "zod";

type RemoteState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
  isStale: boolean;
  refetch: () => Promise<void>;
};

// Global in-memory cache and in-flight promise map for request deduplication
const responseCache = new Map<string, { data: unknown; timestamp: number }>();
const inFlightRequests = new Map<string, Promise<unknown>>();
const CACHE_TTL_MS = 60 * 1000; // 60 seconds memory cache

function getSessionCached<T>(url: string, ttl: number): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(`remote_cache:${url}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.timestamp < ttl) {
      return parsed.data as T;
    }
  } catch {
    // Ignore storage quota or serialization errors
  }
  return null;
}

function setSessionCached(url: string, data: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(
      `remote_cache:${url}`,
      JSON.stringify({ data, timestamp: Date.now() }),
    );
  } catch {
    // Ignore storage quota errors
  }
}

export function useRemoteData<T>(
  url: string,
  options?: {
    schema?: ZodType<T>;
    fallbackData?: T;
    maxRetries?: number;
    ttlMs?: number;
  },
): RemoteState<T> {
  const schema = options?.schema;
  const fallbackData = options?.fallbackData;
  const maxRetries = options?.maxRetries ?? 2;
  const ttlMs = options?.ttlMs ?? CACHE_TTL_MS;

  const cachedEntry = responseCache.get(url);
  const isFreshInMemory = cachedEntry && Date.now() - cachedEntry.timestamp < ttlMs;

  const [data, setData] = useState<T | null>(() => {
    if (isFreshInMemory) return cachedEntry.data as T;
    const sessionData = getSessionCached<T>(url, ttlMs * 5);
    if (sessionData) return sessionData;
    return fallbackData ?? null;
  });

  const [loading, setLoading] = useState<boolean>(!isFreshInMemory && !fallbackData);
  const [error, setError] = useState<Error | null>(null);
  const [isStale, setIsStale] = useState<boolean>(!isFreshInMemory);

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchDataWithRetry = useCallback(
    async (targetUrl: string, retries: number): Promise<T> => {
      let lastError: Error | null = null;

      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          if (attempt > 0) {
            // Exponential backoff
            await new Promise((res) =>
              setTimeout(res, Math.min(1000 * 2 ** attempt, 4000)),
            );
          }

          const controller = new AbortController();
          abortControllerRef.current = controller;

          const response = await fetch(targetUrl, { signal: controller.signal });
          if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
          }

          const json = await response.json();
          const parsed = schema ? schema.parse(json) : (json as T);
          return parsed;
        } catch (err) {
          if (err instanceof Error && err.name === "AbortError") {
            throw err;
          }
          lastError = err instanceof Error ? err : new Error(String(err));
        }
      }

      throw lastError ?? new Error("Fetch failed after retries");
    },
    [schema],
  );

  const executeFetch = useCallback(async () => {
    // Check in-flight promise to deduplicate simultaneous requests
    let fetchPromise = inFlightRequests.get(url);
    if (!fetchPromise) {
      fetchPromise = fetchDataWithRetry(url, maxRetries)
        .then((result) => {
          responseCache.set(url, { data: result, timestamp: Date.now() });
          setSessionCached(url, result);
          return result;
        })
        .finally(() => {
          inFlightRequests.delete(url);
        });
      inFlightRequests.set(url, fetchPromise);
    }

    try {
      setLoading(true);
      setError(null);
      const result = (await fetchPromise) as T;
      setData(result);
      setIsStale(false);
      setLoading(false);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      setError(err instanceof Error ? err : new Error("Request failed"));
      setLoading(false);
    }
  }, [url, maxRetries, fetchDataWithRetry]);

  useEffect(() => {
    executeFetch();

    // Auto-revalidate on network reconnect
    const handleOnline = () => {
      executeFetch();
    };

    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("online", handleOnline);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [executeFetch]);

  return {
    data,
    loading,
    error,
    isStale,
    refetch: executeFetch,
  };
}
