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

export const articles: Article[] = [
  {
    slug: "10-fundamental-human-desires-that-drive-consumer-behavior",
    category: "Psychology",
    title: "10 Fundamental Human Desires That Drive Consumer Behavior",
    description:
      "People don't buy products for their specifications. They buy to satisfy underlying evolutionary desires: status, security, belonging, mastery, and autonomy.",
    date: "January 14, 2025",
    readingTime: "7 min",
    featured: true,
    href: "https://sheeshmirza.medium.com/10-fundamental-human-desires-that-drive-consumer-behavior",
  },
  {
    slug: "architecture-of-payment-systems-high-throughput-engineering",
    category: "Technology",
    title: "The Architecture of Payment Systems: Lessons from Engineering at Scale",
    description:
      "A deep dive into distributed transaction integrity, idempotency keys, two-phase commits, and designing zero-downtime ledger reconciliation in financial microservices.",
    date: "February 2, 2025",
    readingTime: "9 min",
    featured: true,
    href: "https://sheeshmirza.medium.com",
  },
  {
    slug: "building-autonomous-ai-agents-that-dont-break",
    category: "AI",
    title: "Building Autonomous AI Agents That Don't Break in Production",
    description:
      "Moving past brittle prompt chains: how to implement deterministic guardrails, structured tool validation, and stateful multi-agent orchestration that holds up in real workflows.",
    date: "March 18, 2025",
    readingTime: "8 min",
    featured: true,
    href: "https://sheeshmirza.medium.com",
  },
  {
    slug: "psychology-of-product-positioning",
    category: "Business",
    title: "The Psychology of Product Positioning: Why Perception Beats Features",
    description:
      "How cognitive anchoring, contrast effects, and category creation dictate willingness-to-pay long before a customer ever tests your feature list.",
    date: "November 29, 2024",
    readingTime: "6 min",
    featured: false,
    href: "https://sheeshmirza.medium.com",
  },
  {
    slug: "fast-numerical-computing-numpy-pandas-guide",
    category: "Technology",
    title: "Fast Numerical Computing in Python: An Engineer's Guide to NumPy & Pandas",
    description:
      "Understanding memory strides, C-contiguous arrays, vectorization patterns, and how to eliminate the hidden performance bottlenecks in production data pipelines.",
    date: "October 12, 2024",
    readingTime: "11 min",
    featured: false,
    href: "https://sheeshmirza.medium.com",
  },
  {
    slug: "solopreneur-stack-one-person-ai-businesses",
    category: "Startups",
    title: "The Solopreneur Stack: Engineering One-Person AI Businesses",
    description:
      "Why agentic workflows and automated distribution are rewriting the minimum viable team size. A blueprint for building hyper-lean software enterprises with zero bloated headcount.",
    date: "April 5, 2025",
    readingTime: "8 min",
    featured: false,
    href: "https://sheeshmirza.medium.com",
  },
];
