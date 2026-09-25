import type { Metadata } from "next";
import { TopicPage } from "@/components/sections/TopicPage";

export const metadata: Metadata = {
  title: "System Design — Sheesh Mirza",
  description:
    "System design notes by Sheesh Mirza on distributed systems, scalability, reliability, queues, retries, idempotency, APIs, and engineering trade-offs.",
  alternates: { canonical: "/system-design" },
};

export default function SystemDesignPage() {
  return (
    <TopicPage
      eyebrow="System Design"
      title="Design for the real state of the system."
      description="System design is not an architecture diagram competition. It is the discipline of understanding constraints, failure modes, data flow, operational cost, and what the system needs to guarantee."
      points={[
        "Start with the problem: who uses the system, what matters, and what constraints cannot be violated?",
        "Design for failure: timeouts, retries, duplicate requests, partial outages, stale data, and dependency failures are normal states.",
        "Make semantics explicit: queues, caches, databases, and services are tools; their meaning comes from the guarantees the product actually needs.",
        "Observability is part of architecture: logs, metrics, traces, alerts, and useful diagnostic signals reduce the cost of operating a system.",
        "Prefer the simplest architecture that satisfies the requirements, then add complexity only when evidence demands it."
      ]}
      related={[
        { label: "Software Engineering", href: "/software-engineering" },
        { label: "AI Engineering", href: "/ai-engineering" },
        { label: "Projects", href: "/projects" },
        { label: "Writing", href: "/blog" },
      ]}
    />
  );
}
