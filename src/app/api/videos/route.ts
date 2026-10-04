import { NextResponse } from "next/server";
import { fetchYouTubeVideos } from "@/lib/services/youtube.service";

export const revalidate = 3600;

export async function GET() {
  const result = await fetchYouTubeVideos();

  return NextResponse.json(
    {
      success: true,
      videos: result.videos,
      categories: result.categories,
      count: result.videos.length,
      fallback: result.fallback,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
