const REPO_NAME_OVERRIDES: Record<string, string> = {
  "sheeshmirza-website": "sheeshmirza.com",
  "mailhost-frontend": "MailHost Web Client",
  "mailhost-backend": "MailHost API Service",
  "ollama-with-langchain": "Ollama LangChain Client",
  "ai-agents-for-beginners": "AI Agents for Beginners",
  "Hands-On-Large-Language-Models": "Hands-On LLMs Code",
  "llm-course": "LLM Course & Notebooks",
  "Made-With-ML": "Made With ML Applications",
  "ai-wrapper": "AI Model Gateway & Wrapper",
  "FC-Hackathon-2026": "FreeCharge Hackathon Project",
  Docker: "Local DevOps & Docker Environment",
  "data-structures": "Data Structures in JavaScript",
  "leetcode-30-days-of-javascript": "LeetCode 30 Days of JS",
  "opencv-object-detection": "OpenCV Vision & Detection",
  languages: "Polyglot Systems Programming",
};

/**
 * Standardize repository display names with curated overrides or title-casing.
 */
export function cleanRepoName(raw: string): string {
  if (REPO_NAME_OVERRIDES[raw]) return REPO_NAME_OVERRIDES[raw];
  return raw
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Categorize repository into primary taxonomy.
 */
export function categorizeRepo(
  name: string,
  desc: string,
  lang: string | null,
  topics: string[],
): string {
  const n = name.toLowerCase();
  if (n === "docker") return "Systems & Backend";
  if (n.includes("leetcode") || n.includes("data-structures")) return "Algorithms & Learning";
  if (n.includes("languages")) return "Systems & Backend";
  if (n.includes("mailhost-backend") || n.includes("backend")) return "Systems & Backend";
  if (n.includes("mailhost-frontend") || n.includes("website") || n.includes("hackathon")) {
    return "Web & Engineering";
  }

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
  return "Web & Engineering";
}

/**
 * Fallback description provider for repositories missing descriptions on GitHub.
 */
export function getRepoDescription(name: string, rawDesc: string | null): string {
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
