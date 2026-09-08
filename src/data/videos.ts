//Reviewed

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
    slug: "reality-of-building-one-person-ai-business",
    category: "Startups",
    title: "The Reality of Building a One-Person AI Business",
    description:
      "A no-BS breakdown of unit economics, toolchains, customer acquisition, and what it actually takes to run a high-margin software business as a solo engineer.",
    date: "February 2025",
    duration: "18:42",
    featured: true,
    href: "https://www.youtube.com/@Sheesh.Unfiltered",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "why-most-engineers-build-products-nobody-wants",
    category: "Psychology",
    title: "Why Most Engineers Build Products Nobody Wants",
    description:
      "The engineering trap: solving fascinating technical problems that have zero commercial demand. How to evaluate buyer psychology before committing code.",
    date: "January 2025",
    duration: "14:15",
    featured: true,
    href: "https://www.youtube.com/@Sheesh.Unfiltered",
    thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
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
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
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
    thumbnail: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
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
    thumbnail: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop",
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
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
  },
];
