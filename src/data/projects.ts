export type Project = {
  name: string;
  description: string;
  category: string;
  technologies: string[];
  href: string;
};

export const projects: Project[] = [
  {
    name: "Ollama Adapter",
    description:
      "A lightweight Python command-line example for querying a local Ollama chat model through LangChain.",
    category: "AI / Local LLM",
    technologies: ["Python", "LangChain", "Ollama"],
    href: "https://github.com/sheeshmirza/ollama-with-langchain",
  },
  {
    name: "AI Wrapper",
    description:
      "A small public repository exploring an AI wrapper implementation.",
    category: "AI",
    technologies: ["AI", "Software"],
    href: "https://github.com/sheeshmirza/ai-wrapper",
  },
  {
    name: "LLM Course",
    description:
      "A public learning repository covering LLM concepts, RAG, agents, inference, deployment, and security.",
    category: "AI / Learning",
    technologies: ["LLMs", "RAG", "Agents", "Inference"],
    href: "https://github.com/sheeshmirza/llm-course",
  },
  {
    name: "AI Agents for Beginners",
    description:
      "A repository used while studying and working through practical AI-agent concepts, patterns, tools, and production concerns.",
    category: "AI Agents",
    technologies: ["AI Agents", "Agentic AI"],
    href: "https://github.com/sheeshmirza/ai-agents-for-beginners",
  },
  {
    name: "LeetCode 30 Days of JavaScript",
    description:
      "A public coding repository focused on JavaScript problem-solving practice.",
    category: "Software Engineering",
    technologies: ["JavaScript", "Algorithms"],
    href: "https://github.com/sheeshmirza/leetcode-30-days-of-javascript",
  },
  {
    name: "FC Hackathon 2026",
    description:
      "A public repository from a 2026 hackathon project.",
    category: "Experiments",
    technologies: ["Software", "Hackathon"],
    href: "https://github.com/sheeshmirza/FC-Hackathon-2026",
  },
];

