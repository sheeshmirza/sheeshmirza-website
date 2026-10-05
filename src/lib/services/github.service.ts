import { projects as fallbackProjects, type Project } from "@/data/projects";
import {
  cleanRepoName,
  categorizeRepo,
  getRepoDescription,
} from "@/lib/utils/repo-metadata";

const GITHUB_USERNAME = "sheeshmirza";
const GITHUB_REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;

export async function fetchGitHubProjects(): Promise<{
  projects: Project[];
  categories: string[];
  fallback: boolean;
}> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "sheeshmirza-website",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(GITHUB_REPOS_URL, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`GitHub API returned HTTP ${res.status}`);
    }

    const repos = await res.json();
    if (!Array.isArray(repos) || repos.length === 0) {
      throw new Error("No repositories found in GitHub API response");
    }

    const parsedProjects: Project[] = repos
      .filter((r) => r.name !== GITHUB_USERNAME) // omit special profile README repo
      .map((repo) => {
        const lang = repo.language || null;
        const topics = Array.isArray(repo.topics) ? repo.topics : [];
        const desc = getRepoDescription(repo.name, repo.description);
        const category = categorizeRepo(repo.name, desc, lang, topics);

        const technologies = [lang, ...topics].filter(Boolean);
        if (technologies.length === 0) {
          technologies.push(category === "AI & Machine Learning" ? "AI" : "Software");
        }

        return {
          name: cleanRepoName(repo.name),
          description: desc,
          category,
          technologies: Array.from(new Set(technologies)),
          href: repo.html_url,
          stars: repo.stargazers_count ?? 0,
          forks: repo.forks_count ?? 0,
          updatedAt: repo.updated_at,
        };
      });

    const categories = Array.from(new Set(parsedProjects.map((p) => p.category))).sort();

    return {
      projects: parsedProjects,
      categories,
      fallback: false,
    };
  } catch (err) {
    console.warn("GitHub repos fetch failed, using fallback projects:", err);
    const categories = Array.from(new Set(fallbackProjects.map((p) => p.category))).sort();
    return {
      projects: fallbackProjects,
      categories,
      fallback: true,
    };
  }
}
