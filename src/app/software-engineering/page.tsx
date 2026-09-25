import type { Metadata } from "next";
import { TopicPage } from "@/components/sections/TopicPage";

export const metadata: Metadata = {
  title: "Software Engineering — Sheesh Mirza",
  description:
    "Software engineering notes from Sheesh Mirza covering backend systems, APIs, reliability, distributed systems, debugging, and engineering judgment.",
  alternates: { canonical: "/software-engineering" },
};

export default function SoftwareEngineeringPage() {
  return (
    <TopicPage
      eyebrow="Software Engineering"
      title="Engineering is mostly trade-offs."
      description="I write about the practical side of software engineering: understanding constraints, choosing simple designs, debugging from evidence, and making systems behave predictably under failure."
      points={[
        "Backend engineering: APIs, services, data flows, integrations, transactions, and the boundaries between components.",
        "Distributed systems: retries, timeouts, idempotency, consistency, queues, observability, and the uncomfortable states between success and failure.",
        "System design: problem first, constraints second, trade-offs third, architecture after that.",
        "Debugging: write a hypothesis, gather evidence, run a test, and learn from the result instead of changing code randomly.",
        "Engineering judgment: choosing what not to build is often as valuable as knowing how to build it."
      ]}
      related={[
        { label: "System Design", href: "/system-design" },
        { label: "AI Engineering", href: "/ai-engineering" },
        { label: "Projects", href: "/projects" },
        { label: "About", href: "/about" },
      ]}
    />
  );
}
