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
      "A product is experienced by a fast brain first. Reduce the friction, ambiguity, and decisions that make the right action harder than it needs to be.",
    rating: 5,
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    topic: "Startups",
    takeaway:
      "The useful question is not whether an idea sounds contrarian. It is whether the product creates a durable advantage that customers can feel.",
    rating: 5,
  },
  {
    title: "The Innovator's Dilemma",
    author: "Clayton Christensen",
    topic: "Business",
    takeaway:
      "Healthy businesses can be disrupted by serving a smaller, ignored use case better. Scale is not protection when the customer experience is misaligned.",
    rating: 4,
  },
  {
    title: "Influence: The Psychology of Persuasion",
    author: "Robert Cialdini",
    topic: "Psychology",
    takeaway:
      "Persuasion works best when it lowers uncertainty without hiding the trade-off. Trust is not a trick in the interface; it is the product of the whole experience.",
    rating: 5,
  },
  {
    title: "Design of Everyday Things",
    author: "Don Norman",
    topic: "Technology",
    takeaway:
      "When an interface needs a manual, the design has probably handed its complexity to the user. Good tools make the next action legible.",
    rating: 4,
  },
  {
    title: "The Lean Startup",
    author: "Eric Ries",
    topic: "Startups",
    takeaway:
      "The goal of an early product is not to look complete. It is to expose the riskiest assumption quickly enough to learn before it becomes expensive.",
    rating: 4,
  },
  {
    title: "Predictably Irrational",
    author: "Dan Ariely",
    topic: "Human Behavior",
    takeaway:
      "People are not random; context changes what feels reasonable. Better products design the context instead of blaming the user for the outcome.",
    rating: 4,
  },
  {
    title: "The Alignment Problem",
    author: "Brian Christian",
    topic: "AI",
    takeaway:
      "An AI system can be technically impressive and still be wrong for the people relying on it. Capability needs evaluation, boundaries, and a clear account of who bears the risk.",
    rating: 5,
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    topic: "Human Behavior",
    takeaway:
      "Shared stories coordinate people at a scale that individual logic cannot. Products, brands, and institutions all depend on the meaning people agree to carry together.",
    rating: 5,
  },
  {
    title: "The Effective Engineer",
    author: "Edmond Lau",
    topic: "Technology",
    takeaway:
      "Engineering impact comes from choosing leverage deliberately: solve the expensive problem, remove recurring work, and spend craft where users can feel it.",
    rating: 4,
  },
];

