export type ProjectCategory =
  | "Software"
  | "AI"
  | "Automation"
  | "Experiments"
  | "Business";

export interface Project {
  name: string;
  description: string;
  category: ProjectCategory;
  technology: string[];
  problemSolved: string;
  github?: string;
  demo?: string;
}

// Add real projects here as they're built. No fabricated entries.
export const projects: Project[] = [
  {
    name: "AI-Powered Analytics Dashboard",
    description:
      "Real-time analytics platform using LLMs to generate actionable insights from complex data sets.",
    category: "AI",
    technology: ["React", "TypeScript", "Next.js", "OpenAI API", "PostgreSQL"],
    problemSolved: "Transforms raw data into human-readable insights without manual analysis.",
  },
  {
    name: "Startup Idea Validator",
    description:
      "Automated tool that validates startup ideas against market data and consumer psychology principles.",
    category: "Business",
    technology: ["Node.js", "ML Models", "Web Scraping", "React"],
    problemSolved:
      "Reduces time-to-market validation from weeks to hours by automating research.",
  },
  {
    name: "Consumer Psychology Framework",
    description:
      "Open-source framework documenting decision-making patterns, cognitive biases, and persuasion principles for product teams.",
    category: "Software",
    technology: ["TypeScript", "React", "Markdown", "GraphQL"],
    problemSolved: "Provides standardized mental models for product and marketing decision-making.",
  },
  {
    name: "Distributed System Simulator",
    description:
      "Educational tool simulating distributed systems challenges including CAP theorem, consensus, and failure scenarios.",
    category: "Software",
    technology: ["Python", "Visualization.js", "Next.js"],
    problemSolved:
      "Makes abstract distributed systems concepts tangible through interactive simulations.",
  },
  {
    name: "AI Agent Orchestration Platform",
    description:
      "Framework for coordinating multiple AI agents with different specialties to solve complex multi-step problems.",
    category: "AI",
    technology: ["Python", "FastAPI", "LangChain", "Vector Databases"],
    problemSolved: "Enables autonomous agents to work together without manual task routing.",
  },
  {
    name: "Market Research Automation Engine",
    description:
      "Crawls competitor websites, analyzes positioning, and generates competitive intelligence reports.",
    category: "Automation",
    technology: ["Python", "Selenium", "NLP", "MongoDB"],
    problemSolved: "Replaces manual competitive analysis with automated, real-time intelligence.",
  },
];

export const projectCategories: ProjectCategory[] = [
  "Software",
  "AI",
  "Automation",
  "Experiments",
  "Business",
];
