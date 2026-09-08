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
    name: "High-Throughput Payment Orchestrator",
    description:
      "A distributed transaction router and reconciliation engine designed for high-concurrency financial operations with deterministic idempotency.",
    category: "Software",
    technology: ["Java", "Spring Boot", "Kafka", "PostgreSQL", "Redis", "Docker"],
    problemSolved:
      "Eliminates duplicate charges, prevents double-spending anomalies, and provides sub-50ms transaction latency under burst traffic.",
    github: "https://github.com/sheeshmirza",
  },
  {
    name: "AgentMesh: Stateful AI Orchestration",
    description:
      "A modular graph-based execution runtime for autonomous LLM agents with structured tool schemas, state persistence, and automatic retry rollbacks.",
    category: "AI",
    technology: ["Python", "FastAPI", "LangChain", "Vector DB", "Redis", "Next.js"],
    problemSolved:
      "Prevents multi-agent execution drift and token exhaustion by enforcing deterministic state transitions and budget limits.",
    github: "https://github.com/sheeshmirza",
  },
  {
    name: "CognitiveUX: Consumer Psychology Framework",
    description:
      "An open-source mental model repository and UI pattern library mapping behavioral cognitive biases directly to product design decisions.",
    category: "Software",
    technology: ["TypeScript", "Next.js", "Tailwind CSS", "MDX", "Framer Motion"],
    problemSolved:
      "Bridges the gap between behavioral economics theory and actionable UX heuristics for high-conversion onboarding and checkout flows.",
    github: "https://github.com/sheeshmirza",
    demo: "https://smirza.in",
  },
  {
    name: "Distributed Consensus & Partition Simulator",
    description:
      "An interactive educational visualizer demonstrating Raft leader election, log replication, network partitions, and split-brain resolution.",
    category: "Experiments",
    technology: ["TypeScript", "React", "Canvas API", "WebSockets"],
    problemSolved:
      "Transforms counter-intuitive distributed systems theory (CAP theorem, quorum arithmetic) into tangible, interactive visual simulations.",
    github: "https://github.com/sheeshmirza",
  },
  {
    name: "Automated Market Intelligence Pipeline",
    description:
      "An automated scraper and NLP intelligence engine that extracts competitor positioning shifts, pricing tier changes, and consumer sentiment trends.",
    category: "Automation",
    technology: ["Python", "Playwright", "HuggingFace Transformers", "PostgreSQL", "Tailwind"],
    problemSolved:
      "Replaces hours of manual competitive tracking with automated weekly diff reports and sentiment shift alerts.",
    github: "https://github.com/sheeshmirza",
  },
  {
    name: "SignalValidator: Startup Idea Screener",
    description:
      "A validation tool synthesizing real-time search intent, ad spend competition, and consumer desire signals to score early startup concepts.",
    category: "Business",
    technology: ["Node.js", "TypeScript", "OpenAI API", "React", "Tailwind CSS"],
    problemSolved:
      "Cuts preliminary customer demand validation time from weeks to hours by cross-referencing search friction against willingness-to-pay.",
    github: "https://github.com/sheeshmirza",
  },
];

export const projectCategories: ProjectCategory[] = [
  "Software",
  "AI",
  "Automation",
  "Experiments",
  "Business",
];
