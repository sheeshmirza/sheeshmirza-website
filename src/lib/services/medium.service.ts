import { articles as fallbackArticles, type Article } from "@/data/articles";
import { sanitizeHtmlToPlainText } from "@/lib/utils/sanitize";

const MEDIUM_FEED_URL = "https://medium.com/feed/@sheeshmirza";
const WORDS_PER_MINUTE = 200;
const DESCRIPTION_MAX_LENGTH = 200;

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

function createDescription(content: string): string {
  const text = sanitizeHtmlToPlainText(content);
  if (text.length <= DESCRIPTION_MAX_LENGTH) {
    return text;
  }
  const truncated = text.slice(0, DESCRIPTION_MAX_LENGTH);
  const lastSpace = truncated.lastIndexOf(" ");
  return `${truncated.slice(0, lastSpace > 0 ? lastSpace : DESCRIPTION_MAX_LENGTH)}…`;
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
  const text = sanitizeHtmlToPlainText(content);
  if (!text) return "1 min";
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

async function fetchFromRss2Json(): Promise<Article[] | null> {
  try {
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_FEED_URL)}`,
    );
    if (!res.ok) return null;
    const json = await res.json();
    if (json.status !== "ok" || !Array.isArray(json.items) || json.items.length === 0) {
      return null;
    }

    return json.items.map((item: any, index: number) => {
      const title = sanitizeHtmlToPlainText(item.title || "Untitled");
      const desc = createDescription(item.description || item.content || "");
      const link = item.link || "";
      const categories: string[] = Array.isArray(item.categories)
        ? item.categories.map((c: string) => sanitizeHtmlToPlainText(c))
        : [];

      return {
        slug: getSlug(link, title),
        title,
        description: desc,
        category: categories[0] || "Engineering",
        tags: categories,
        date: formatDate(item.pubDate || new Date().toISOString()),
        readingTime: estimateReadingTime(item.content || item.description || ""),
        featured: index < 3,
        href: link,
      };
    });
  } catch {
    return null;
  }
}

export async function fetchMediumArticles(): Promise<{
  articles: Article[];
  tags: string[];
  fallback: boolean;
}> {
  try {
    const response = await fetch(MEDIUM_FEED_URL, {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/rss+xml, application/xml, text/xml",
      },
    });

    if (!response.ok) {
      throw new Error(`Medium feed returned HTTP ${response.status}`);
    }

    const xml = await response.text();
    if (!xml.trim()) {
      throw new Error("Empty XML payload returned by Medium feed");
    }

    const itemMatches = [...xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)];
    if (!itemMatches.length) {
      throw new Error("No items found in Medium RSS feed");
    }

    const parsedArticles: Article[] = [];
    const allTags = new Set<string>();

    for (const [index, match] of itemMatches.entries()) {
      const itemXml = match[1];
      const title = sanitizeHtmlToPlainText(getXmlValue(itemXml, "title"));
      const descriptionXml = getXmlValue(itemXml, "description");
      const contentXml = getXmlValue(itemXml, "content:encoded");
      const link = getXmlValue(itemXml, "link");
      const pubDate = getXmlValue(itemXml, "pubDate");

      if (!title || !link) continue;

      const categoryTags = getXmlValues(itemXml, "category")
        .map((t) => sanitizeHtmlToPlainText(t))
        .filter(Boolean);

      for (const tag of categoryTags) {
        allTags.add(tag);
      }

      parsedArticles.push({
        slug: getSlug(link, title),
        title,
        description: createDescription(descriptionXml || contentXml),
        category: categoryTags[0] || "Engineering",
        tags: categoryTags,
        date: formatDate(pubDate || new Date().toISOString()),
        readingTime: estimateReadingTime(contentXml || descriptionXml),
        featured: index < 3,
        href: link,
      });
    }

    return {
      articles: parsedArticles,
      tags: Array.from(allTags).sort(),
      fallback: false,
    };
  } catch (err) {
    // Attempt CORS-friendly RSS JSON proxy for browser environments
    const proxyArticles = await fetchFromRss2Json();
    if (proxyArticles && proxyArticles.length > 0) {
      const allTags = new Set<string>();
      proxyArticles.forEach((a) => a.tags?.forEach((t) => allTags.add(t)));
      return {
        articles: proxyArticles,
        tags: Array.from(allTags).sort(),
        fallback: false,
      };
    }

    console.warn("Medium feed fetch failed, using verified fallback articles:", err);
    const tags = Array.from(new Set(fallbackArticles.map((a) => a.category))).sort();
    return {
      articles: fallbackArticles,
      tags,
      fallback: true,
    };
  }
}
