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

// Fetched dynamically from Medium RSS feed via /api/articles
// No static articles - all content is pulled from https://sheeshmirza.medium.com
export const articles: Article[] = [];
