import type { Metadata } from "next";
import { TopicPage } from "@/components/sections/TopicPage";
import { site } from "@/data/site-config";
import { createBreadcrumbSchema, createTechArticleSchema } from "@/lib/seo-schema";

export const metadata: Metadata = {
  title: "System Design & Distributed Systems",
  description:
    "System design and distributed systems notes by Sheesh Mirza covering scalable architecture, event streaming, message queues, idempotency, caching, and engineering trade-offs.",
  alternates: { canonical: "/system-design" },
  openGraph: {
    title: "System Design & Distributed Systems | Sheesh Mirza",
    description:
      "Deep architectural notes on distributed systems, message queues, failure modes, and building reliable systems at scale.",
    url: `${site.url}/system-design`,
    type: "article",
  },
};

const jsonLd = [
  createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "System Design", path: "/system-design" },
  ]),
  createTechArticleSchema({
    headline: "System Design & Distributed Architecture at Scale",
    description:
      "A principled guide to designing distributed software: constraints, failure modes, message queues, caching tiers, and operational cost.",
    path: "/system-design",
  }),
];

export default function SystemDesignPage() {
  return (
    <TopicPage
      jsonLd={jsonLd}
      eyebrow="System Design & Architecture"
      title="Design for the messy reality of distributed failure."
      description="System design is not an abstract architecture diagram competition. It is the practical discipline of understanding real-world constraints, failure modes, data flows, operational cost, and concrete system guarantees."
      points={[
        "Problem-first architecture: clarify read vs. write volumes, acceptable latency bounds, consistency requirements, and SLA invariants before choosing components.",
        "Design for inevitable failure: network partitions, timeouts, duplicate requests, stale cache hits, cascading retries, and database failovers are normal states.",
        "Explicit messaging semantics: understand the exact trade-offs between message queues (point-to-point, task distribution) and event streams (immutable logs, pub/sub replay).",
        "Observability as an architectural pillar: end-to-end distributed tracing, high-cardinality metrics, structured logs, and proactive circuit breakers.",
        "Simplicity over premature complexity: start monolithic or modular, profile bottlenecks with telemetry, and extract distributed services only when required by scale.",
      ]}
      related={[
        { label: "Software Engineering", href: "/software-engineering" },
        { label: "AI Engineering", href: "/ai-engineering" },
        { label: "Technical Essays", href: "/blog" },
        { label: "Source Code Repositories", href: "/projects" },
      ]}
    />
  );
}
