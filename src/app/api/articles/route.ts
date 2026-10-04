import { NextResponse } from "next/server";
import { fetchMediumArticles } from "@/lib/services/medium.service";

export const revalidate = 3600;

export async function GET() {
  const result = await fetchMediumArticles();

  return NextResponse.json(
    {
      success: true,
      articles: result.articles,
      tags: result.tags,
      categories: result.tags,
      count: result.articles.length,
      fallback: result.fallback,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
