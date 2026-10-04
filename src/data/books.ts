export type BookCategory =
  | "Psychology"
  | "Business"
  | "Startups"
  | "Technology"
  | "AI"
  | "Human Behavior";

export interface Book {
  title: string;
  author: string;
  topic: BookCategory;
  takeaway: string;
  rating: number; // out of 5
}

// Populate with real reads — ratings and takeaways should be genuine.
export const books: Book[] = [];

