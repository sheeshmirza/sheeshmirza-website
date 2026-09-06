export interface Video {
  slug: string;
  category: string;
  title: string;
  description: string;
  date: string;
  duration?: string;
  featured?: boolean;
  href: string;
  thumbnail?: string;
}

// Fetched dynamically from YouTube RSS feed via /api/videos
// No static videos - all content is pulled from https://www.youtube.com/@Sheesh.Unfiltered
export const videos: Video[] = [];
