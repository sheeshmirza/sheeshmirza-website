import type { Metadata } from "next";
import { TopicPage } from "@/components/sections/TopicPage";
import { site } from "@/data/site-config";
import { createBreadcrumbSchema, createTechArticleSchema } from "@/lib/seo-schema";

export const metadata: Metadata = {
  title: "Software Engineering & System Designing",
  description:
    "Core engineering notes by Sheesh Mirza on backend architecture, resilient APIs, high concurrency, distributed systems, debugging, and engineering judgment.",
  alternates: { canonical: "/software-engineering" },
  openGraph: {
    title: "Software Engineering & System Designing | Sheesh Mirza",
    description:
      "Deep architectural notes on backend systems, clean APIs, distributed reliability, and dependable system design.",
    url: `${site.url}/software-engineering`,
    type: "article",
  },
};

const jsonLd = [
  createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Software Engineering & System Designing", path: "/software-engineering" },
  ]),
  createTechArticleSchema({
    headline: "Software Engineering & System Designing: Principles & Architectures",
    description:
      "Practical engineering notes covering backend systems, distributed services, message queues, reliability, and architectural trade-offs.",
    path: "/software-engineering",
  }),
];

export default function SoftwareEngineeringPage() {
  return (
    <TopicPage
      jsonLd={jsonLd}
      eyebrow="Software Engineering & System Designing"
      title="Engineering is the disciplined management of trade-offs."
      description="I write about the practical craft of software engineering: understanding real constraints, choosing simple robust designs, debugging from evidence, and making systems behave predictably under failure."
      points={[
        "Backend systems & microservices: APIs, data flows, high concurrency, transactions, and the explicit boundaries between decoupled components.",
        "Distributed systems & messaging: idempotency, message queues (Kafka, RabbitMQ), event streaming, timeouts, retries, and distributed consistency.",
        "System design methodology: start with the business problem, calculate capacity constraints, map trade-offs, and choose minimal architecture that scales.",
        "Observability & debugging: formulate testable hypotheses, trace signals through metrics and logs, and fix root causes rather than symptoms.",
        "Engineering judgment: choosing what not to build and deleting obsolete code is often far more valuable than adding complexity.",
      ]}
      related={[
        { label: "System Design", href: "/system-design" },
        { label: "AI Engineering", href: "/ai-engineering" },
        { label: "GitHub Projects", href: "/projects" },
        { label: "Technical Writing", href: "/blog" },
      ]}
    />
  );
}
