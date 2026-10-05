export const site = {
  name: "Sheesh Mirza",
  title: "Sheesh Mirza — Software Engineering, System Design, AI & Entrepreneurship",
  description:
    "Official website of Sheesh Mirza. Deep explorations across Software Engineering & System Designing, Artificial Intelligence & Machine Learning, Automation, Startups, and Human Psychology.",
  url: "https://smirza.in",
  image: "https://smirza.in/og-image.png",
  avatar: "https://github.com/sheeshmirza.png",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Writing", href: "/blog" },
  { label: "Videos", href: "/videos" },
  { label: "Topics", href: "/software-engineering" },
  { label: "Contact", href: "/contact" },
];

export const topicLinks = [
  {
    label: "Software Engineering",
    href: "/software-engineering",
    description: "APIs, reliability, backend architecture & clean engineering judgment",
  },
  {
    label: "System Design",
    href: "/system-design",
    description: "Distributed systems, scalability, consistency & trade-offs",
  },
  {
    label: "AI Engineering",
    href: "/ai-engineering",
    description: "LLMs, AI agents, machine learning & production automation",
  },
  {
    label: "Entrepreneurship",
    href: "/entrepreneurship",
    description: "Problems & solutions, startups, business models & validation",
  },
  {
    label: "Human Psychology",
    href: "/psychology",
    description: "Consumer behavior, human motivation, decision-making & habits",
  },
  {
    label: "Building in Public",
    href: "/building-in-public",
    description: "Transparent experiments, metrics & lessons learned",
  },
  {
    label: "Sheesh Unfiltered",
    href: "/sheesh-unfiltered",
    description: "Unfiltered conversations, podcast essays & video reflections",
  },
  {
    label: "Media & Profiles",
    href: "/media",
    description: "Official public profiles, channels & verified social links",
  },
  {
    label: "Press Kit & Bio",
    href: "/press",
    description: "Official bio, speaking topics, photos & downloadable press kit",
  },
];

export const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sheeshmirza" },
  { label: "GitHub", href: "https://github.com/sheeshmirza" },
  { label: "Medium", href: "https://sheeshmirza.medium.com" },
  { label: "YouTube", href: "https://www.youtube.com/@Sheesh.Unfiltered" },
  { label: "Instagram", href: "https://www.instagram.com/_mir_zey/" },
];

export const calendlyUrl = "https://calendly.com/sheesh-mirza/30min";

// Prioritized focus areas aligned to the exact user hierarchy:
// 1. Engineering, AI & Automation
// 2. Entrepreneurship, Business & Innovation
// 3. Human Psychology, Behavior & Habits
export const priorityPillars = [
  {
    id: "software-engineering",
    title: "Software Engineering & System Designing",
    subtitle: "Dependable architecture, scalable backends, and deliberate trade-offs.",
    description:
      "Designing robust backend microservices, distributed systems, resilient APIs, message queues, and real-time event streaming architectures that thrive under heavy scale.",
    href: "/software-engineering",
    tags: [
      "Software Engineering",
      "System Design",
      "Distributed Systems",
      "Backend Architecture",
      "High Concurrency",
      "API Design",
    ],
  },
  {
    id: "ai-machine-learning",
    title: "Artificial Intelligence & Machine Learning",
    subtitle: "Practical AI systems, LLM orchestration, and autonomous agent frameworks.",
    description:
      "Building practical AI systems that move beyond hype: Model Context Protocol (MCP), agentic workflows, LLM evaluation, local models (Ollama), and scalable inference pipelines.",
    href: "/ai-engineering",
    tags: [
      "Artificial Intelligence",
      "Machine Learning",
      "Large Language Models",
      "AI Agents",
      "Model Context Protocol",
      "Agentic AI",
    ],
  },
  {
    id: "automation-systems",
    title: "Automation and Intelligent Systems",
    subtitle: "Eliminating friction through automated pipelines and deterministic workflows.",
    description:
      "Connecting disparate tools into cohesive, self-healing automated workflows, autonomous task executors, and intelligent data processing systems.",
    href: "/ai-engineering",
    tags: [
      "Automation",
      "Intelligent Systems",
      "Workflow Automation",
      "Autonomous Agents",
      "DevOps",
      "Reliability",
    ],
  },
  {
    id: "entrepreneurship-startups",
    title: "Entrepreneurship & Problem Discovery",
    subtitle: "Turning real problems into sustainable products and high-growth businesses.",
    description:
      "Discovering burning customer problems, validating market demand with rapid prototypes, engineering distribution advantages, and scaling sustainable startup economics.",
    href: "/entrepreneurship",
    tags: [
      "Entrepreneurship",
      "Problems & Solutions",
      "Startups & Business",
      "Innovation & Growth",
      "Product Validation",
      "Venture Building",
    ],
  },
  {
    id: "human-psychology",
    title: "Human Psychology, Behavior & Habits",
    subtitle: "Understanding why humans decide, buy, persist, and change.",
    description:
      "Applying behavioral psychology, cognitive biases, persuasion principles, habit loops, and the 10 fundamental human desires that govern consumer behavior and product adoption.",
    href: "/psychology",
    tags: [
      "Human Psychology",
      "Behavior and Habits",
      "Consumer Behavior",
      "Decision Making",
      "Cognitive Biases",
      "Persuasion",
    ],
  },
];

export const curiosityAreas = [
  {
    key: "systems",
    title: "Software Engineering & System Designing",
    description:
      "Backend systems, distributed architectures, APIs, reliability, and the engineering decisions that make software dependable.",
  },
  {
    key: "ai",
    title: "Artificial Intelligence & Machine Learning",
    description:
      "LLMs, AI agents, Model Context Protocol, evaluation, automation, and turning probabilistic models into production systems.",
  },
  {
    key: "automation",
    title: "Automation and Intelligent Systems",
    description:
      "Autonomous workflows, intelligent task execution, and eliminating operational friction through software.",
  },
  {
    key: "entrepreneurship",
    title: "Entrepreneurship, Startups & Innovation",
    description:
      "Finding problems worth solving, testing ideas with real users, building distribution, and scaling products into sustainable businesses.",
  },
  {
    key: "psychology",
    title: "Human Psychology, Behavior & Habits",
    description:
      "Why people buy, how habits form, mental models for clearer thinking, and the behavioral drivers behind technology adoption.",
  },
] as const;

export const exploringTopics = [
  "Software Engineering & System Designing",
  "Artificial Intelligence & Machine Learning",
  "Automation and Intelligent Systems",
  "System Design & Distributed Systems",
  "Model Context Protocol (MCP)",
  "Agentic AI & Autonomous Agents",
  "Entrepreneurship & Problem Discovery",
  "Startups & Business Innovation",
  "Growth Engineering & Distribution",
  "Human Psychology & Decision Making",
  "Behavior and Habits",
  "Building in Public",
];

export const psychologyTopics = [
  "Fundamental Human Desires",
  "Consumer Buying Behavior",
  "Decision Making Under Uncertainty",
  "Habit Loops & Behavioral Change",
  "Cognitive Biases in Product Design",
  "Trust & Social Proof",
  "Attention & Retention",
];

export const aiTopics = [
  "Model Context Protocol (MCP)",
  "Agentic AI Architecture",
  "Large Language Models (LLMs)",
  "AI Agents & Tool Calling",
  "Intelligent Workflow Automation",
  "Local LLMs & Ollama",
  "Machine Learning Operations (MLOps)",
];

export const businessTopics = [
  "Problem Discovery & Validation",
  "Startup Business Models",
  "Distribution & Go-To-Market",
  "Innovation & Growth Loops",
  "Pricing Strategy & Unit Economics",
  "Bootstrapping vs Venture Capital",
  "Building in Public",
];
