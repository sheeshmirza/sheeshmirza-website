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
export const books: Book[] = [
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    topic: "Psychology",
    takeaway:
      "Understanding cognitive biases and heuristics is essential for building products and businesses that align with how people actually think.",
    rating: 5,
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    topic: "Startups",
    takeaway:
      "Creating monopolistic businesses through unique value requires contrarian thinking and technology that doesn't just incrementally improve.",
    rating: 5,
  },
  {
    title: "The Innovator's Dilemma",
    author: "Clayton Christensen",
    topic: "Business",
    takeaway:
      "Disruption happens when new entrants deliver simpler, cheaper solutions that eventually outperform incumbents.",
    rating: 4,
  },
  {
    title: "Influence: The Psychology of Persuasion",
    author: "Robert Cialdini",
    topic: "Psychology",
    takeaway:
      "There are six universal principles of persuasion: reciprocity, commitment, social proof, authority, liking, and scarcity.",
    rating: 5,
  },
  {
    title: "Design of Everyday Things",
    author: "Don Norman",
    topic: "Technology",
    takeaway:
      "Good design solves user problems through invisible, intuitive systems that work with human psychology, not against it.",
    rating: 4,
  },
  {
    title: "The Lean Startup",
    author: "Eric Ries",
    topic: "Startups",
    takeaway:
      "Build-measure-learn feedback loops let you validate assumptions quickly and waste less time on ideas that don't work.",
    rating: 4,
  },
  {
    title: "Predictably Irrational",
    author: "Dan Ariely",
    topic: "Human Behavior",
    takeaway:
      "People are predictably irrational in consistent ways. Understanding these patterns helps predict behavior at scale.",
    rating: 4,
  },
  {
    title: "The Alignment Problem",
    author: "Brian Christian",
    topic: "AI",
    takeaway:
      "As AI systems become more powerful, ensuring they're aligned with human values is one of the most critical technical challenges.",
    rating: 5,
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    topic: "Human Behavior",
    takeaway:
      "Understanding how humans created shared fiction (money, nations, laws) helps explain why group dynamics override logic.",
    rating: 5,
  },
  {
    title: "The Effective Engineer",
    author: "Edmond Lau",
    topic: "Technology",
    takeaway:
      "Impact is a function of leverage, execution, and how you allocate your limited time. Smart engineers optimize for these.",
    rating: 4,
  },
];

