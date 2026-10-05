import { NextResponse } from "next/server";

export interface CachedResponseOptions {
  maxAgeSeconds?: number;
  staleWhileRevalidateSeconds?: number;
}

/**
 * Creates a standardized Next.js JSON response with multi-tier caching headers.
 */
export function cachedJsonResponse(
  data: unknown,
  options: CachedResponseOptions = {},
): NextResponse {
  const { maxAgeSeconds = 3600, staleWhileRevalidateSeconds = 86400 } = options;

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": `public, s-maxage=${maxAgeSeconds}, stale-while-revalidate=${staleWhileRevalidateSeconds}`,
    },
  });
}
