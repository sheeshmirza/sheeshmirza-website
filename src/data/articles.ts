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

export const articles: Article[] = [];
