export interface Video {
  slug: string;
  category: string;
  title: string;
  description: string;
  date: string;
  duration?: string;
  featured: boolean;
  href: string;
  thumbnail?: string;
}

export const videos: Video[] = [
  {
    slug: "6LFtCxlUiNQ",
    category: "AI",
    title: "How to Make Money With AI: 7 AI Businesses That Actually Work",
    description:
      "A no-BS breakdown of unit economics, toolchains, customer acquisition, and what it actually takes to run a high-margin software business as an engineer.",
    date: "August 17, 2024",
    duration: "18:42",
    featured: true,
    href: "https://www.youtube.com/watch?v=6LFtCxlUiNQ",
    thumbnail: "https://img.youtube.com/vi/6LFtCxlUiNQ/maxresdefault.jpg",
  },
  {
    slug: "FKIuRMq90uc",
    category: "Ideas",
    title: "Why I Started Sheesh Unfiltered | No Script, No Filter",
    description:
      "The engineering philosophy behind documenting building in public, experimenting without vanity metrics, and sharing candid career perspectives.",
    date: "August 15, 2024",
    duration: "14:15",
    featured: true,
    href: "https://www.youtube.com/watch?v=FKIuRMq90uc",
    thumbnail: "https://img.youtube.com/vi/FKIuRMq90uc/maxresdefault.jpg",
  },
  {
    slug: "agentic-ai-in-production-works-vs-hype",
    category: "AI",
    title: "Agentic AI in Production: What Works vs What's Pure Hype",
    description:
      "A hands-on reality check on autonomous LLM agents, multi-agent coordination frameworks, token costs, latency spikes, and predictable failure modes.",
    date: "December 2024",
    duration: "21:03",
    featured: true,
    href: "https://www.youtube.com/@Sheesh.Unfiltered",
    thumbnail: "https://img.youtube.com/vi/6LFtCxlUiNQ/hqdefault.jpg",
  },
  {
    slug: "getting-fired-pivoting-compounding-career-lessons",
    category: "Business",
    title: "Getting Fired, Pivoting, and Compounding: Unfiltered Career Lessons",
    description:
      "Candid thoughts on career setbacks, high-conviction pivots, developing unfair advantages, and viewing your skills through an investor lens.",
    date: "November 2024",
    duration: "16:50",
    featured: false,
    href: "https://www.youtube.com/@Sheesh.Unfiltered",
    thumbnail: "https://img.youtube.com/vi/FKIuRMq90uc/hqdefault.jpg",
  },
  {
    slug: "system-design-vs-product-design",
    category: "Tech",
    title: "System Design vs Product Design: What Developers Miss",
    description:
      "Why the cleanest microservice architecture doesn't matter if your customer journey has high cognitive friction. Blending backend thinking with UX empathy.",
    date: "October 2024",
    duration: "15:28",
    featured: false,
    href: "https://www.youtube.com/@Sheesh.Unfiltered",
    thumbnail: "https://img.youtube.com/vi/6LFtCxlUiNQ/hqdefault.jpg",
  },
  {
    slug: "how-to-learn-complex-tech-faster",
    category: "Tech",
    title: "How I Learn Complex Technical Subjects 3x Faster",
    description:
      "Deconstructing machine learning, distributed systems, and modern web frameworks through first principles, toy implementations, and publicly verifiable tests.",
    date: "September 2024",
    duration: "12:34",
    featured: false,
    href: "https://www.youtube.com/@Sheesh.Unfiltered",
    thumbnail: "https://img.youtube.com/vi/FKIuRMq90uc/hqdefault.jpg",
  },
];
