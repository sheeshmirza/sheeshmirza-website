//Reviewed

export interface Article {
  slug: string;
  category: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  featured?: boolean;
  href: string;
}
