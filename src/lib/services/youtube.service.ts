import { videos as fallbackVideos, type Video } from "@/data/videos";
import { sanitizeHtmlToPlainText } from "@/lib/utils/sanitize";

const YOUTUBE_HANDLE = "Sheesh.Unfiltered";
const MANUAL_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

const categoryKeywords: Record<string, string[]> = {
  AI: ["ai", "llm", "generative", "chatgpt", "machine learning", "neural", "model", "agent"],
  Tech: [
    "tutorial",
    "system",
    "design",
    "database",
    "api",
    "coding",
    "javascript",
    "typescript",
    "react",
    "backend",
    "frontend",
    "devops",
    "docker",
    "software",
    "code",
    "development",
    "architecture",
  ],
  Business: [
    "business",
    "startup",
    "entrepreneur",
    "market",
    "strategy",
    "growth",
    "product",
    "sales",
    "founder",
  ],
  Psychology: ["psychology", "behavior", "consumer", "desire", "motivation", "human"],
  Ideas: ["guide", "tutorial", "learning", "complete", "beginners", "explained"],
  Startups: ["startup", "founder", "raise", "venture", "seed", "building"],
};

function detectCategory(title: string, description: string): string {
  const text = `${title} ${description}`.toLowerCase();
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some((k) => text.includes(k))) {
      return category;
    }
  }
  return "Ideas";
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

const VERIFIED_CHANNEL_ID = "UCqTAh-n3Tqg0Ui9joxAcfCA";

async function resolveChannelId(): Promise<string | null> {
  if (MANUAL_CHANNEL_ID) return MANUAL_CHANNEL_ID;
  return VERIFIED_CHANNEL_ID;
}

async function fetchFromRss2Json(channelId: string): Promise<Video[] | null> {
  try {
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`,
    );
    if (!res.ok) return null;
    const json = await res.json();
    if (json.status !== "ok" || !Array.isArray(json.items) || json.items.length === 0) {
      return null;
    }

    return json.items.map((item: any, index: number) => {
      const title = sanitizeHtmlToPlainText(item.title || "Untitled");
      const link = item.link || "";
      const videoIdMatch = link.match(/v=([a-zA-Z0-9_-]{11})/);
      const videoId = videoIdMatch ? videoIdMatch[1] : "";
      const description = sanitizeHtmlToPlainText(
        item.description || item.content || "",
      ).slice(0, 200);
      const category = detectCategory(title, description);
      const thumbnail =
        item.thumbnail ||
        (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : undefined);

      return {
        slug: videoId || title.toLowerCase().replace(/\s+/g, "-"),
        title,
        description: description ? `${description}…` : "",
        category,
        date: formatDate(item.pubDate || new Date().toISOString()),
        thumbnail,
        featured: index < 3,
        href: link,
      };
    });
  } catch {
    return null;
  }
}

export async function fetchYouTubeVideos(): Promise<{
  videos: Video[];
  categories: string[];
  fallback: boolean;
}> {
  const fallbackCategories = Array.from(
    new Set(fallbackVideos.map((v) => v.category || "Ideas")),
  ).sort();

  const channelId = await resolveChannelId();
  if (!channelId) {
    return { videos: fallbackVideos, categories: fallbackCategories, fallback: true };
  }

  try {
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const response = await fetch(rssUrl, { next: { revalidate: 3600 } });
    if (!response.ok) {
      throw new Error(`YouTube RSS returned HTTP ${response.status}`);
    }

    const xml = await response.text();
    const itemMatches = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];
    if (!itemMatches.length) {
      throw new Error("No video entries found in YouTube RSS XML");
    }

    const videos: Video[] = [];
    const categoriesSet = new Set<string>();

    for (const [index, match] of itemMatches.entries()) {
      const entryXml = match[1];
      const titleMatch = entryXml.match(/<title>(.*?)<\/title>/);
      const title = sanitizeHtmlToPlainText(titleMatch ? titleMatch[1] : "Untitled");

      const summaryMatch = entryXml.match(/<summary>([\s\S]*?)<\/summary>/);
      const description = sanitizeHtmlToPlainText(summaryMatch ? summaryMatch[1] : "").slice(0, 200);

      const linkMatch = entryXml.match(/<link rel="alternate" href="(.*?)"/);
      const link = linkMatch ? linkMatch[1].trim() : "";

      const videoIdMatch = link.match(/v=([a-zA-Z0-9_-]{11})/);
      const videoId = videoIdMatch ? videoIdMatch[1] : "";

      const pubDateMatch = entryXml.match(/<published>(.*?)<\/published>/);
      const pubDate = pubDateMatch ? pubDateMatch[1].trim() : new Date().toISOString();

      if (!title || !link) continue;

      const category = detectCategory(title, description);
      categoriesSet.add(category);

      const thumbnail = videoId
        ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        : undefined;

      videos.push({
        slug: videoId || title.toLowerCase().replace(/\s+/g, "-"),
        title,
        description: description ? `${description}…` : "",
        category,
        date: formatDate(pubDate),
        thumbnail,
        featured: index < 3,
        href: link,
      });
    }

    return {
      videos,
      categories: Array.from(categoriesSet).sort(),
      fallback: false,
    };
  } catch (err) {
    // Attempt CORS-friendly RSS JSON proxy for browser environments
    const proxyVideos = await fetchFromRss2Json(channelId);
    if (proxyVideos && proxyVideos.length > 0) {
      const categoriesSet = new Set<string>();
      proxyVideos.forEach((v) => categoriesSet.add(v.category));
      return {
        videos: proxyVideos,
        categories: Array.from(categoriesSet).sort(),
        fallback: false,
      };
    }

    console.warn("YouTube fetch failed, using fallback videos:", err);
    return {
      videos: fallbackVideos,
      categories: fallbackCategories,
      fallback: true,
    };
  }
}
