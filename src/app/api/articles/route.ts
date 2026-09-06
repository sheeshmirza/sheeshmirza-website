import { NextResponse } from "next/server";

export const revalidate = 3600;

const MEDIUM_FEED_URL = "https://medium.com/feed/@sheeshmirza";
const REVALIDATE_SECONDS = 3600;
const MAX_ARTICLES_TO_FETCH = 50;
const WORDS_PER_MINUTE = 200;
const DESCRIPTION_MAX_LENGTH = 200;

interface MediumArticle {
  slug: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  tags: string[];
  content: string;
}

function getXmlValue(xml: string, tag: string): string {
  const regex = new RegExp(
    `<${tag}(?:\\s[^>]*)?>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([\\s\\S]*?))</${tag}>`,
    "i",
  );
  const match = xml.match(regex);
  return (match?.[1] ?? match?.[2] ?? "").trim();
}

function getXmlValues(xml: string, tag: string): string[] {
  const regex = new RegExp(
    `<${tag}(?:\\s[^>]*)?>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([\\s\\S]*?))</${tag}>`,
    "gi",
  );
  return [...xml.matchAll(regex)]
    .map((match) => (match[1] ?? match[2] ?? "").trim())
    .filter(Boolean);
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function stripHtml(html: string): string {
  return decodeHtmlEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function createDescription(content: string): string {
  const text = stripHtml(content);
  if (text.length <= DESCRIPTION_MAX_LENGTH) {
    return text;
  }
  const truncated = text.slice(0, DESCRIPTION_MAX_LENGTH);
  const lastSpace = truncated.lastIndexOf(" ");
  return `${truncated.slice(
    0,
    lastSpace > 0 ? lastSpace : DESCRIPTION_MAX_LENGTH,
  )}…`;
}

function createSlug(title: string): string {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "article";
}

function getSlug(link: string, title: string): string {
  try {
    const url = new URL(link);
    const segments = url.pathname.split("/").filter(Boolean);
    return segments.at(-1) || createSlug(title);
  } catch {
    return createSlug(title);
  }
}

function estimateReadingTime(content: string): string {
  const text = stripHtml(content);
  if (!text) {
    return "1 min";
  }
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
  return `${minutes} min`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

async function parseMediumFeed(): Promise<MediumArticle[]> {
  const response = await fetch(MEDIUM_FEED_URL, {
    next: {
      revalidate: REVALIDATE_SECONDS,
    },
    headers: {
      Accept: "application/rss+xml, application/xml, text/xml",
    },
  });
  if (!response.ok) {
    throw new Error(
      `Medium feed request failed: ${response.status} ${response.statusText}`,
    );
  }
  const xml = await response.text();
  if (!xml.trim()) {
    throw new Error("Medium feed returned an empty response");
  }
  const articles: MediumArticle[] = [];
  const itemMatches = xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi);
  const itemsArray = [...itemMatches].slice(0, MAX_ARTICLES_TO_FETCH);
  for (const match of itemsArray) {
    const itemXml = match[1];
    const title = stripHtml(getXmlValue(itemXml, "title")).trim();
    const descriptionXml = getXmlValue(itemXml, "description");
    const contentXml = getXmlValue(itemXml, "content:encoded");
    const link = getXmlValue(itemXml, "link");
    const pubDate = getXmlValue(itemXml, "pubDate");
    const creatorXml = getXmlValue(itemXml, "creator");
    if (!title || !link) {
      continue;
    }
    // Extract tags from category elements, with fallback to empty array
    let tags: string[] = [];
    const categoryTags = getXmlValues(itemXml, "category")
      .map((tag) => stripHtml(tag).trim())
      .filter(Boolean);
    
    if (categoryTags.length > 0) {
      tags = [...new Set(categoryTags)];
    } else {
      // Fallback: extract keywords from description or generate from title
      // Medium may include tags as comma-separated values or hashtags
      const contentToSearch = descriptionXml || contentXml || "";
      const hashtagMatches = contentToSearch.match(/#[\w-]+/g) || [];
      tags = [...new Set(hashtagMatches.map((tag) => tag.replace(/^#/, "")))];
    }
    
    const content = contentXml || descriptionXml;
    articles.push({
      slug: getSlug(link, title),
      title,
      description: createDescription(descriptionXml || content),
      link,
      pubDate: pubDate || new Date().toISOString(),
      tags,
      content,
    });
  }
  return articles;
}

export async function GET() {
  try {
    const articles = await parseMediumFeed();
    const tags = [...new Set(articles.flatMap((article) => article.tags))].sort(
      (a, b) => a.localeCompare(b),
    );
    const formattedArticles = articles.map((article, index) => ({
      slug: article.slug,
      title: article.title,
      description: article.description,
      category: article.tags[0] || "Ideas",
      tags: article.tags,
      date: formatDate(article.pubDate),
      readingTime: estimateReadingTime(article.content),
      featured: index < 3,
      href: article.link,
    }));
    return NextResponse.json(
      {
        success: true,
        articles: formattedArticles,
        tags,
        count: formattedArticles.length,
      },
      {
        headers: {
          "Cache-Control": `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=86400`,
        },
      },
    );
  } catch (error) {
    console.error("Failed to fetch Medium articles:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch articles",
        articles: [],
        tags: [],
        count: 0,
      },
      { status: 500 },
    );
  }
}
