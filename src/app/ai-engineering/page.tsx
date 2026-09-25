import type { Metadata } from "next";
import { TopicPage } from "@/components/sections/TopicPage";

export const metadata: Metadata = {
  title: "AI Engineering — Sheesh Mirza",
  description:
    "Sheesh Mirza writes and builds around AI engineering, LLM applications, AI agents, evaluation, automation, and production systems.",
  alternates: { canonical: "/ai-engineering" },
};

export default function AIEngineeringPage() {
  return (
    <TopicPage
      eyebrow="AI Engineering"
      title="Building useful AI systems, not AI theatre."
      description="My AI work focuses on the engineering around the model: problem definition, structured outputs, tool use, state, evaluation, failure handling, observability, cost, and deployment."
      points={[
        "LLM applications: designing useful workflows around language models instead of treating the model as the entire product.",
        "AI agents: tool use, state, orchestration, memory, guardrails, and recovery when an agent makes the wrong decision.",
        "Evaluation: defining what success means, measuring failure, and testing AI behavior before trusting it in a real workflow.",
        "Automation: identifying repetitive work where AI can remove friction without hiding important human judgment.",
        "Production thinking: latency, cost, safety, monitoring, fallbacks, and graceful failure for systems that include probabilistic components."
      ]}
      related={[
        { label: "Projects", href: "/projects" },
        { label: "Software Engineering", href: "/software-engineering" },
        { label: "Writing", href: "/blog" },
        { label: "Videos", href: "/videos" },
      ]}
    />
  );
}
