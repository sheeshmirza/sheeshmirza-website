import { projects as fallbackProjects, type Project } from "@/data/projects";

const GITHUB_USERNAME = "sheeshmirza";
const GITHUB_REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;

function cleanRepoName(raw: string): string {
  return raw
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function categorizeRepo(
  name: string,
  desc: string,
  lang: string | null,
  topics: string[],
): string {
  const combined = `${name} ${desc} ${lang || ""} ${topics.join(" ")}`.toLowerCase();

  if (
    /\b(ai|agentic|agents?|llm|llms|gpt|langchain|ollama|machine-learning|ml|deep-learning|vision|opencv|pytorch)\b/i.test(
      combined,
    )
  ) {
    return "AI & Machine Learning";
  }
  if (
    /\b(go|golang|docker|backend|c\+\+|systems?|microservice|server|kafka|redis|elasticsearch|postgresql)\b/i.test(
      combined,
    )
  ) {
    return "Systems & Backend";
  }
  if (/\b(data-structures?|algorithms?|leetcode)\b/i.test(combined)) {
    return "Algorithms & Learning";
  }
  return "Web & Engineering";
}

function getRepoDescription(name: string, rawDesc: string | null): string {
  if (rawDesc && rawDesc.trim().length > 0) {
    return rawDesc.trim();
  }
  const lower = name.toLowerCase();
  if (lower.includes("mailhost-frontend")) {
    return "Web application interface for the MailHost email service.";
  }
  if (lower.includes("mailhost-backend")) {
    return "High-performance backend API and microservice for MailHost.";
  }
  if (lower.includes("ai-wrapper")) {
    return "Go-based generative AI wrapper and integration proxy.";
  }
  if (lower.includes("website")) {
    return "Personal website and digital garden built with Next.js, React, and Tailwind CSS.";
  }
  if (lower.includes("languages")) {
    return "Polyglot programming explorations in C++ and systems languages.";
  }
  if (lower.includes("fc-hackathon")) {
    return "FreeCharge Hackathon engineering project and prototype.";
  }
  return "Public software repository and open source exploration by Sheesh Mirza.";
}

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

    const response = await fetch(GITHUB_REPOS_URL, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned HTTP ${response.status}`);
    }

    const repos = await response.json();
    if (!Array.isArray(repos) || repos.length === 0) {
      throw new Error("No repositories returned from GitHub API");
    }

    const categoriesSet = new Set<string>();
    const projects: Project[] = repos
      .filter((repo: any) => repo.name !== "sheeshmirza") // omit the special profile README repository
      .map((repo: any) => {
        const lang = repo.language || null;
        const topics = Array.isArray(repo.topics) ? repo.topics : [];
        const description = getRepoDescription(repo.name, repo.description);
        const category = categorizeRepo(repo.name, description, lang, topics);
        categoriesSet.add(category);

        const technologies = [lang, ...topics].filter(Boolean) as string[];
        if (technologies.length === 0) {
          technologies.push(category === "AI & Machine Learning" ? "AI" : "Software");
        }

        return {
          name: cleanRepoName(repo.name),
          description,
          category,
          technologies: Array.from(new Set(technologies)),
          href: repo.html_url,
          stars: repo.stargazers_count ?? 0,
          forks: repo.forks_count ?? 0,
          updatedAt: repo.updated_at,
        };
      });

    return {
      projects,
      categories: Array.from(categoriesSet).sort(),
      fallback: false,
    };
  } catch (err) {
    console.warn("GitHub fetch failed, falling back to local dataset:", err);
    const categories = Array.from(new Set(fallbackProjects.map((p) => p.category))).sort();
    return {
      projects: fallbackProjects,
      categories,
      fallback: true,
    };
  }
}
