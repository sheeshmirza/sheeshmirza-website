export interface Article {
  slug: string;
  category: string; // Dynamically determined from Medium articles
  title: string;
  description: string;
  date: string;
  readingTime: string;
  featured?: boolean;
  href: string;
}

// Articles are fetched dynamically from Medium RSS via /api/articles.
