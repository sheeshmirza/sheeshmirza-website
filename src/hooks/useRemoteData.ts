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

async function fetchDirectFallback(targetUrl: string, signal?: AbortSignal): Promise<unknown | null> {
  try {
    if (targetUrl.includes("/api/projects")) {
      const res = await fetch("https://api.github.com/users/sheeshmirza/repos?sort=updated&per_page=100", {
        headers: { Accept: "application/vnd.github.v3+json" },
        signal,
      });
      if (!res.ok) return null;
      const repos = await res.json();
      if (!Array.isArray(repos) || repos.length === 0) return null;

      const projects = repos
        .filter((r) => r.name !== "sheeshmirza")
        .map((r) => {
          const lang = r.language || null;
          const topics = Array.isArray(r.topics) ? r.topics : [];
          const name = r.name.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
          const description = r.description || "Public software repository and code exploration by Sheesh Mirza.";
          const combined = `${r.name} ${description} ${lang || ""}`.toLowerCase();
          let category = "Web & Engineering";
          if (/\b(ai|llm|agents?|gpt|langchain|ollama|vision|ml)\b/i.test(combined)) category = "AI & Machine Learning";
          else if (/\b(docker|backend|go|c\+\+|systems?)\b/i.test(combined)) category = "Systems & Backend";
          else if (/\b(leetcode|data-structures?)\b/i.test(combined)) category = "Algorithms & Learning";

          const technologies = [lang, ...topics].filter(Boolean) as string[];
          if (!technologies.length) technologies.push("Software");

          return {
            name,
            description,
            category,
            technologies,
            href: r.html_url,
            stars: r.stargazers_count ?? 0,
            forks: r.forks_count ?? 0,
            updatedAt: r.updated_at,
          };
        });

      const categories = Array.from(new Set(projects.map((p) => p.category))).sort();
      return { success: true, projects, categories, count: projects.length, fallback: false };
    }

    if (targetUrl.includes("/api/articles")) {
      const res = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40sheeshmirza", { signal });
      if (!res.ok) return null;
      const json = await res.json();
      if (json.status !== "ok" || !Array.isArray(json.items) || json.items.length === 0) return null;

      const articles = json.items.map((item: any, idx: number) => {
        const rawContent = (item.description || item.content || "").replace(/<[^>]+>/g, " ").trim();
        const description = rawContent.length > 200 ? `${rawContent.slice(0, 200)}…` : rawContent;
        const categories = Array.isArray(item.categories) ? item.categories : [];
        let category = "Engineering";
        const text = `${item.title} ${categories.join(" ")}`.toLowerCase();
        if (/\b(psychology|behavior|buy)\b/.test(text)) category = "Psychology";
        else if (/\b(ai|llm|agent|mcp)\b/.test(text)) category = "AI";
        else if (/\b(data|mining|seaborn)\b/.test(text)) category = "Data";
        else if (/\b(queues|streaming|distributed)\b/.test(text)) category = "Systems";

        return {
          slug: item.link?.split("/").pop() || `article-${idx}`,
          category,
          title: item.title,
          description,
          date: new Date(item.pubDate || Date.now()).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
          readingTime: `${Math.max(1, Math.ceil(rawContent.split(/\s+/).length / 200))} min`,
          featured: idx < 3,
          href: item.link,
          tags: categories,
        };
      });

      const tags = Array.from(new Set(articles.map((a: any) => a.category))).sort();
      return { success: true, articles, tags, categories: tags, count: articles.length, fallback: false };
    }

    if (targetUrl.includes("/api/videos")) {
      const res = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fchannel_id%3DUCqTAh-n3Tqg0Ui9joxAcfCA", { signal });
      if (!res.ok) return null;
      const json = await res.json();
      if (json.status !== "ok" || !Array.isArray(json.items) || json.items.length === 0) return null;

      const videos = json.items.map((item: any, idx: number) => {
        const videoIdMatch = item.link?.match(/v=([a-zA-Z0-9_-]{11})/);
        const videoId = videoIdMatch ? videoIdMatch[1] : "";
        const rawContent = (item.description || item.content || "").replace(/<[^>]+>/g, " ").trim();
        const description = rawContent.length > 200 ? `${rawContent.slice(0, 200)}…` : rawContent;
        let category = "Ideas";
        const text = `${item.title} ${description}`.toLowerCase();
        if (/\b(ai|llm|agent|business)\b/.test(text)) category = "AI";
        else if (/\b(tech|code|system)\b/.test(text)) category = "Tech";

        return {
          slug: videoId || `video-${idx}`,
          category,
          title: item.title,
          description,
          date: new Date(item.pubDate || Date.now()).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
          featured: idx < 3,
          href: item.link,
          thumbnail: item.thumbnail || (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : undefined),
        };
      });

      const categories = Array.from(new Set(videos.map((v: any) => v.category))).sort();
      return { success: true, videos, categories, count: videos.length, fallback: false };
    }
  } catch {
    return null;
  }
  return null;
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

      // Try direct provider fallback if API route returned 404 or failed
      const directData = await fetchDirectFallback(targetUrl, abortControllerRef.current?.signal);
      if (directData) {
        return schema ? schema.parse(directData) : (directData as T);
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
