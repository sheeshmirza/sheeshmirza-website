"use client";

import { useEffect, useState } from "react";

type RemoteState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export function useRemoteData<T>(url: string): RemoteState<T> {
  const [state, setState] = useState<RemoteState<T>>({
    data: null,
    loading: true,
    error: null,
  });
  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, loading: true, error: null });

    async function load() {
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = (await response.json()) as T;
        if (controller.signal.aborted) return;
        setState({ data, loading: false, error: null });
      } catch (error) {
        if (
          controller.signal.aborted ||
          (error instanceof Error && error.name === "AbortError")
        ) {
          return;
        }
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error : new Error("Request failed"),
        });
      }
    }
    load();
    return () => controller.abort();
  }, [url]);
  return state;
}
