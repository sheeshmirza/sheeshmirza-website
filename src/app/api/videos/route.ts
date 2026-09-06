import { NextResponse } from "next/server";

export const revalidate = 3600; // Revalidate every hour

const YOUTUBE_HANDLE = "Sheesh.Unfiltered";
// Manual channel ID - can be found at youtube.com/@handle -> check browser console for ucid or in page source
// If not provided, API will attempt to resolve it dynamically
const MANUAL_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

interface YouTubeVideo {
  slug: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  category?: string;
  thumbnail?: string;
}

// Keywords to categorize videos
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
    if (keywords.some((keyword) => text.includes(keyword))) {
      return category;
    }
  }

  return "Ideas"; // Default category
}

async function resolveChannelId(): Promise<string | null> {
  // If manual channel ID is provided via env, use it
  if (MANUAL_CHANNEL_ID) {
    return MANUAL_CHANNEL_ID;
  }

  try {
    // Try to fetch the channel page with different approaches
    const response = await fetch(`https://www.youtube.com/@${YOUTUBE_HANDLE}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      console.error(`Failed to fetch YouTube channel page: ${response.status}`);
      return null;
    }

    const html = await response.text();

    // Try multiple patterns to extract channel ID
    const patterns = [
      /"externalChannelId":"([^"]+)"/,
      /"channelId":"([^"]+)"/,
      /\/channel\/([^"\/]+)/,
      /"canonicalBaseUrl":"\/channel\/([^"]+)"/,
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match?.[1]) {
        return match[1];
      }
    }

    console.error("Could not extract channel ID from YouTube page - no patterns matched");
    return null;
  } catch (error) {
    console.error("Error resolving YouTube channel ID:", error);
    return null;
  }
}

async function parseYouTubeRSSFeed(channelId: string): Promise<YouTubeVideo[]> {
  try {
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const response = await fetch(rssUrl, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`YouTube RSS feed fetch failed: ${response.status}`);
    }

    const xml = await response.text();

    // Parse RSS XML to extract videos
    const videos: YouTubeVideo[] = [];

    // Extract items from RSS feed
    const itemMatches = xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g);

    for (const match of itemMatches) {
      const itemXml = match[1];

      // Extract title
      const titleMatch = itemXml.match(/<title>(.*?)<\/title>/);
      const title = titleMatch ? titleMatch[1].trim() : "Untitled";

      // Extract description
      const summaryMatch = itemXml.match(/<summary>([\s\S]*?)<\/summary>/);
      let description = summaryMatch ? summaryMatch[1].trim() : "";

      // Remove HTML tags from description
      description = description
        .replace(/<[^>]*>/g, "")
        .substring(0, 200)
        .concat("...");

      // Extract link
      const linkMatch = itemXml.match(/<link rel="alternate" href="(.*?)"/);
      const link = linkMatch ? linkMatch[1].trim() : "";

      // Extract video ID from link
      const videoIdMatch = link.match(/v=([a-zA-Z0-9_-]{11})/);
      const videoId = videoIdMatch ? videoIdMatch[1] : "";

      // Extract pub date
      const pubDateMatch = itemXml.match(/<published>(.*?)<\/published>/);
      const pubDate = pubDateMatch ? pubDateMatch[1].trim() : new Date().toISOString();

      // Generate thumbnail URL
      const thumbnail = videoId
        ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        : undefined;

      // Create slug from video ID or title
      const slug = videoId || title.toLowerCase().replace(/\s+/g, "-");

      // Detect category from content
      const category = detectCategory(title, description);

      if (title && link) {
        videos.push({
          slug,
          title,
          description,
          link,
          pubDate,
          category,
          thumbnail,
        });
      }
    }

    return videos;
  } catch (error) {
    console.error("Error fetching YouTube RSS feed:", error);
    return [];
  }
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

export async function GET() {
  try {
    // Resolve channel ID from handle or use manual channel ID
    let channelId: string | null = MANUAL_CHANNEL_ID || null;

    if (!channelId) {
      channelId = await resolveChannelId();
    }

    if (!channelId) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Could not resolve YouTube channel ID. Set YOUTUBE_CHANNEL_ID env variable with your channel ID.",
          videos: [],
          categories: [],
        },
        { status: 500 }
      );
    }

    // Fetch and parse RSS feed
    const videos = await parseYouTubeRSSFeed(channelId);

    if (videos.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "No videos found in the RSS feed",
          videos: [],
          categories: [],
        },
        { status: 404 }
      );
    }

    // Extract unique categories from videos
    const categoriesSet = new Set(videos.map((v) => v.category || "Ideas"));
    const categories = Array.from(categoriesSet).sort();

    // Format videos for frontend
    const formattedVideos = videos.map((video, index) => ({
      slug: video.slug,
      category: video.category,
      title: video.title,
      description: video.description,
      date: formatDate(video.pubDate),
      thumbnail: video.thumbnail,
      featured: index < 3, // First 3 are featured
      href: video.link,
    }));

    return NextResponse.json({
      success: true,
      videos: formattedVideos,
      categories,
      count: formattedVideos.length,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch videos",
        videos: [],
        categories: [],
      },
      { status: 500 }
    );
  }
}
