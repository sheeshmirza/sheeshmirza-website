import { fetchMediumArticles } from "@/lib/services/medium.service";
import { cachedJsonResponse } from "@/lib/api-response";

export const revalidate = 3600;

export async function GET() {
  const result = await fetchMediumArticles();

  return cachedJsonResponse({
    success: true,
    articles: result.articles,
    tags: result.tags,
    categories: result.tags,
    count: result.articles.length,
    fallback: result.fallback,
  });
}
