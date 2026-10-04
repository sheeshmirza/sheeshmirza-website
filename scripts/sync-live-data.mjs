#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const YOUTUBE_CHANNEL_ID = "UCqTAh-n3Tqg0Ui9joxAcfCA";
const MEDIUM_FEED_URL = "https://medium.com/feed/@sheeshmirza";
const GITHUB_USERNAME = "sheeshmirza";

function stripHtml(html) {
  return (html || "")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

// -------------------------------------------------------------
// 1. YouTube Sync
// -------------------------------------------------------------
async function syncYouTube() {
  console.log("Fetching live YouTube videos from channel:", YOUTUBE_CHANNEL_ID);
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;
  const res = await fetch(rssUrl, {
    headers: { "User-Agent": "sheeshmirza-sync" },
  });

  if (!res.ok) {
    throw new Error(`YouTube RSS returned HTTP ${res.status}`);
  }

  const xml = await res.text();
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];
  if (!entries.length) {
    throw new Error("No YouTube video entries found");
  }

  const videos = entries.map((entry, idx) => {
    const titleMatch = entry[1].match(/<title>([\s\S]*?)<\/title>/);
    const linkMatch = entry[1].match(/<link rel="alternate" href="(.*?)"/);
    const videoIdMatch = entry[1].match(/<yt:videoId>(.*?)<\/yt:videoId>/);
    const descMatch = entry[1].match(/<media:description>([\s\S]*?)<\/media:description>/);
    const pubMatch = entry[1].match(/<published>(.*?)<\/published>/);

    const title = stripHtml(titleMatch ? titleMatch[1] : "Untitled");
    const link = linkMatch ? linkMatch[1].trim() : "";
    const videoId = videoIdMatch ? videoIdMatch[1].trim() : "";
    const rawDesc = stripHtml(descMatch ? descMatch[1] : "");
    const description = rawDesc.length > 200 ? `${rawDesc.slice(0, 200)}…` : rawDesc;
    const pubDate = pubMatch ? pubMatch[1].trim() : new Date().toISOString();

    let category = "Ideas";
    const text = `${title} ${description}`.toLowerCase();
    if (/\b(ai|llm|agents?|business|money)\b/.test(text)) {
      category = "AI";
    } else if (/\b(tech|code|system|dev)\b/.test(text)) {
      category = "Tech";
    }

    return {
      slug: videoId || `video-${idx + 1}`,
      category,
      title,
      description,
      date: formatDate(pubDate),
      featured: idx < 3,
      href: link,
      thumbnail: videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : undefined,
    };
  });

  const content = `// Auto-generated from live YouTube channel: ${YOUTUBE_CHANNEL_ID}
export interface Video {
  slug: string;
  category: string;
  title: string;
  description: string;
  date: string;
  duration?: string;
  featured: boolean;
  href: string;
  thumbnail?: string;
}

export const videos: Video[] = ${JSON.stringify(videos, null, 2)};
`;

  await fs.writeFile(path.join(ROOT, "src/data/videos.ts"), content, "utf-8");
  console.log(`Synced ${videos.length} videos from YouTube.`);
}

// -------------------------------------------------------------
// 2. Medium Sync
// -------------------------------------------------------------
async function syncMedium() {
  console.log("Fetching live Medium articles from:", MEDIUM_FEED_URL);
  const res = await fetch(MEDIUM_FEED_URL, {
    headers: {
      Accept: "application/rss+xml, application/xml, text/xml",
      "User-Agent": "sheeshmirza-sync",
    },
  });

  if (!res.ok) {
    throw new Error(`Medium RSS returned HTTP ${res.status}`);
  }

  const xml = await res.text();
  const items = [...xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)];
  if (!items.length) {
    throw new Error("No Medium article items found");
  }

  const articles = items.map((item, idx) => {
    const itemXml = item[1];
    const titleMatch = itemXml.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
    const linkMatch = itemXml.match(/<link>([\s\S]*?)<\/link>/i);
    const pubMatch = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/i);
    const contentMatch = itemXml.match(/<content:encoded>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/content:encoded>/i);
    const descMatch = itemXml.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i);

    const title = stripHtml(titleMatch ? titleMatch[1] : "Untitled");
    const link = linkMatch ? linkMatch[1].trim() : "";
    const rawContent = contentMatch ? contentMatch[1] : (descMatch ? descMatch[1] : "");
    const cleanContent = stripHtml(rawContent);
    const description = cleanContent.length > 200 ? `${cleanContent.slice(0, 200)}…` : cleanContent;

    const wordCount = cleanContent.split(/\s+/).filter(Boolean).length;
    const readingTime = `${Math.max(1, Math.ceil(wordCount / 200))} min`;

    const categoryMatches = [...itemXml.matchAll(/<category>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/category>/gi)];
    const tags = categoryMatches.map((m) => stripHtml(m[1])).filter(Boolean);

    let category = "Engineering";
    const text = `${title} ${tags.join(" ")}`.toLowerCase();
    if (/\b(psychology|behavior|consumer|buy)\b/.test(text)) {
      category = "Psychology";
    } else if (/\b(ai|llm|mcp|agent|agentic|generative)\b/.test(text)) {
      category = "AI";
    } else if (/\b(data|mining|lakes|warehousing|seaborn)\b/.test(text)) {
      category = "Data";
    } else if (/\b(queues|streaming|distributed|architecture)\b/.test(text)) {
      category = "Systems";
    }

    let slug = "article";
    try {
      const u = new URL(link);
      slug = u.pathname.split("/").filter(Boolean).pop() || "article";
    } catch {
      slug = title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
    }

    return {
      slug,
      category,
      title,
      description,
      date: formatDate(pubMatch ? pubMatch[1] : new Date().toISOString()),
      readingTime,
      featured: idx < 3,
      href: link,
      tags,
    };
  });

  const content = `// Auto-generated from live Medium feed: ${MEDIUM_FEED_URL}
export interface Article {
  slug: string;
  category: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  featured?: boolean;
  href: string;
  tags?: string[];
}

export const articles: Article[] = ${JSON.stringify(articles, null, 2)};
`;

  await fs.writeFile(path.join(ROOT, "src/data/articles.ts"), content, "utf-8");
  console.log(`Synced ${articles.length} articles from Medium.`);
}

// -------------------------------------------------------------
// 3. GitHub Sync
// -------------------------------------------------------------
async function syncGitHub() {
  console.log("Fetching live GitHub repositories for:", GITHUB_USERNAME);
  const url = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "sheeshmirza-sync",
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
    },
  });

  if (!res.ok) {
    throw new Error(`GitHub API returned HTTP ${res.status}`);
  }

  const repos = await res.json();
  if (!Array.isArray(repos) || !repos.length) {
    throw new Error("No GitHub repositories returned");
  }

  const cleanRepoName = (raw) => {
    const overrides = {
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
      "Docker": "Local DevOps & Docker Environment",
      "data-structures": "Data Structures in JavaScript",
      "leetcode-30-days-of-javascript": "LeetCode 30 Days of JS",
      "opencv-object-detection": "OpenCV Vision & Detection",
      "languages": "Polyglot Systems Programming",
    };
    if (overrides[raw]) return overrides[raw];
    return raw.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const getRepoDesc = (name, desc) => {
    if (desc && desc.trim().length > 0) return desc.trim();
    const l = name.toLowerCase();
    if (l.includes("mailhost-frontend")) return "Web application interface for the MailHost email service.";
    if (l.includes("mailhost-backend")) return "High-performance backend API and microservice for MailHost.";
    if (l.includes("ai-wrapper")) return "Go-based generative AI wrapper and integration proxy.";
    if (l.includes("website")) return "Personal website and digital garden built with Next.js, React, and Tailwind CSS.";
    if (l.includes("languages")) return "Polyglot programming explorations in C++ and systems languages.";
    if (l.includes("fc-hackathon")) return "FreeCharge Hackathon engineering project and prototype.";
    return "Public software repository and open source exploration by Sheesh Mirza.";
  };

  const categorize = (name, desc, lang, topics) => {
    const n = name.toLowerCase();
    if (n === "docker") return "Systems & Backend";
    if (n.includes("leetcode") || n.includes("data-structures")) return "Algorithms & Learning";
    if (n.includes("languages")) return "Systems & Backend";
    if (n.includes("mailhost-backend") || n.includes("backend")) return "Systems & Backend";
    if (n.includes("mailhost-frontend") || n.includes("website") || n.includes("hackathon")) return "Web & Engineering";

    const combined = `${name} ${desc} ${lang || ""} ${topics.join(" ")}`.toLowerCase();
    if (/\b(ai|agentic|agents?|llm|llms|gpt|langchain|ollama|machine-learning|ml|deep-learning|vision|opencv|pytorch)\b/i.test(combined)) {
      return "AI & Machine Learning";
    }
    if (/\b(go|golang|docker|backend|c\+\+|systems?|microservice|server|kafka|redis|elasticsearch|postgresql)\b/i.test(combined)) {
      return "Systems & Backend";
    }
    return "Web & Engineering";
  };

  const projects = repos
    .filter((r) => r.name !== "sheeshmirza") // omit the special profile README repository
    .map((r) => {
      const lang = r.language || null;
      const topics = Array.isArray(r.topics) ? r.topics : [];
      const desc = getRepoDesc(r.name, r.description);
      const cat = categorize(r.name, desc, lang, topics);

      const technologies = [lang, ...topics].filter(Boolean);
      if (technologies.length === 0) {
        technologies.push(cat === "AI & Machine Learning" ? "AI" : "Software");
      }

      return {
        name: cleanRepoName(r.name),
        description: desc,
        category: cat,
        technologies: Array.from(new Set(technologies)),
        href: r.html_url,
        stars: r.stargazers_count ?? 0,
        forks: r.forks_count ?? 0,
        updatedAt: r.updated_at,
      };
    });

  const categories = Array.from(new Set(projects.map((p) => p.category))).sort();

  const content = `// Auto-generated from live GitHub user: ${GITHUB_USERNAME}
export type Project = {
  name: string;
  description: string;
  category: string;
  technologies: string[];
  href: string;
  stars?: number;
  forks?: number;
  updatedAt?: string;
};

export const projects: Project[] = ${JSON.stringify(projects, null, 2)};

export type ProjectCategory = Project["category"];

export const projectCategories: ProjectCategory[] = ${JSON.stringify(categories, null, 2)};
`;

  await fs.writeFile(path.join(ROOT, "src/data/projects.ts"), content, "utf-8");
  console.log(`Synced ${projects.length} projects from GitHub.`);
}

// -------------------------------------------------------------
// Main Runner
// -------------------------------------------------------------
async function main() {
  console.log("=== Syncing Live Data from YouTube, Medium, and GitHub ===");
  try {
    await Promise.allSettled([syncYouTube(), syncMedium(), syncGitHub()]);
    console.log("=== Live Data Sync Complete ===");
  } catch (err) {
    console.warn("Live data sync encountered an issue, preserving existing data:", err);
  }
}

main();
