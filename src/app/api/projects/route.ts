import { NextResponse } from "next/server";
import { fetchGitHubProjects } from "@/lib/services/github.service";

export const revalidate = 3600;

export async function GET() {
  const result = await fetchGitHubProjects();

  return NextResponse.json(
    {
      success: true,
      projects: result.projects,
      categories: result.categories,
      count: result.projects.length,
      fallback: result.fallback,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
