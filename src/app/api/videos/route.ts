import { fetchYouTubeVideos } from "@/lib/services/youtube.service";
import { cachedJsonResponse } from "@/lib/api-response";

export const revalidate = 3600;

export async function GET() {
  const result = await fetchYouTubeVideos();

  return cachedJsonResponse({
    success: true,
    videos: result.videos,
    categories: result.categories,
    count: result.videos.length,
    fallback: result.fallback,
  });
}
