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

// Videos are fetched dynamically from YouTube RSS via /api/videos.
