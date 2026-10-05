import { fetchGitHubProjects } from "@/lib/services/github.service";
import { cachedJsonResponse } from "@/lib/api-response";

export const revalidate = 3600;

export async function GET() {
  const result = await fetchGitHubProjects();

  return cachedJsonResponse({
    success: true,
    projects: result.projects,
    categories: result.categories,
    count: result.projects.length,
    fallback: result.fallback,
  });
}
