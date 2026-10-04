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

export const articles: Article[] = [
  {
    slug: "the-psychology-of-why-people-buy-10-fundamental-human-desires-that-drive-consumer-behavior-ec22f16f9a1b",
    category: "Psychology",
    title: "The Psychology of Why People Buy: 10 Fundamental Human Desires That Drive Consumer Behavior",
    description:
      "Why do people really buy? Explore the psychology behind survival, security, pleasure, status, belonging, attraction, achievement, freedom, identity, and curiosity.",
    date: "September 4, 2024",
    readingTime: "17 min",
    featured: true,
    href: "https://sheeshmirza.medium.com/the-psychology-of-why-people-buy-10-fundamental-human-desires-that-drive-consumer-behavior-ec22f16f9a1b",
    tags: ["Psychology", "Marketing", "Business"],
  },
  {
    slug: "the-complete-guide-to-model-context-protocol-mcp-mcp-servers-with-javascript-and-build-ai-agents-b881354debec",
    category: "AI",
    title: "The Complete Guide to Model Context Protocol (MCP): MCP Servers with JavaScript and AI Agents",
    description:
      "Learn what Model Context Protocol (MCP) is, why it matters, how MCP servers work, how AI agents communicate with tools, and how to build MCP servers.",
    date: "July 30, 2024",
    readingTime: "7 min",
    featured: true,
    href: "https://sheeshmirza.medium.com/the-complete-guide-to-model-context-protocol-mcp-mcp-servers-with-javascript-and-build-ai-agents-b881354debec",
    tags: ["AI", "Software Engineering", "AI Agents"],
  },
  {
    slug: "the-complete-guide-to-message-queues-and-event-streaming-54d3ce065c58",
    category: "Technology",
    title: "The Complete Guide to Message Queues and Event Streaming: Scalable Distributed Systems",
    description:
      "A deep dive into distributed systems, queues, event brokers, delivery semantics, Kafka, RabbitMQ, idempotency, and asynchronous reliability.",
    date: "July 30, 2024",
    readingTime: "6 min",
    featured: true,
    href: "https://sheeshmirza.medium.com/the-complete-guide-to-message-queues-and-event-streaming-54d3ce065c58",
    tags: ["Technology", "System Design", "Distributed Systems"],
  },
  {
    slug: "understanding-generative-ai-the-complete-beginners-guide-to-artificial-intelligence-llms-74872222e091",
    category: "AI",
    title: "Understanding Generative AI: The Complete Beginner's Guide to AI & LLMs",
    description:
      "An engineer's breakdown of foundational models, tokens, embeddings, fine-tuning, retrieval-augmented generation (RAG), and generative application architecture.",
    date: "July 28, 2024",
    readingTime: "6 min",
    featured: false,
    href: "https://sheeshmirza.medium.com/understanding-generative-ai-the-complete-beginners-guide-to-artificial-intelligence-llms-74872222e091",
    tags: ["AI", "LLMs"],
  },
  {
    slug: "understanding-agentic-ai-and-its-architecture-the-complete-beginners-guide-to-autonomous-ai-aaf3c01cde20",
    category: "AI",
    title: "Understanding Agentic AI and Its Architecture: The Guide to Autonomous AI Systems",
    description:
      "Examining tool usage, planning loops, state management, reflection, guardrails, and deterministic verification in production AI agents.",
    date: "July 16, 2024",
    readingTime: "7 min",
    featured: false,
    href: "https://sheeshmirza.medium.com/understanding-agentic-ai-and-its-architecture-the-complete-beginners-guide-to-autonomous-ai-aaf3c01cde20",
    tags: ["AI", "AI Agents"],
  },
  {
    slug: "why-chatgpt-gives-different-answers-to-the-same-question-understanding-randomness-4bdee41c25fb",
    category: "Technology",
    title: "Why ChatGPT Gives Different Answers to the Same Question: Understanding Randomness",
    description:
      "Explaining temperature, top_p sampling, log probabilities, and non-deterministic behavior in modern language model inferences.",
    date: "July 17, 2024",
    readingTime: "6 min",
    featured: false,
    href: "https://sheeshmirza.medium.com/why-chatgpt-gives-different-answers-to-the-same-question-understanding-randomness-4bdee41c25fb",
    tags: ["Technology", "AI"],
  },
];
