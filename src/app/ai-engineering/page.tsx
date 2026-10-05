import type { Metadata } from "next";
import { TopicPage } from "@/components/sections/TopicPage";
import { site } from "@/data/site-config";

export const metadata: Metadata = {
  title: "AI Engineering, Machine Learning & Intelligent Automation",
  description:
    "Engineering insights by Sheesh Mirza on Artificial Intelligence, Machine Learning, Model Context Protocol (MCP), agentic AI architectures, LLM evaluation, and production intelligent systems.",
  alternates: { canonical: "/ai-engineering" },
  openGraph: {
    title: "AI Engineering & Machine Learning | Sheesh Mirza",
    description:
      "Building practical AI systems, Model Context Protocol servers, LLM orchestration, and intelligent automation frameworks.",
    url: `${site.url}/ai-engineering`,
    type: "article",
  },
};

export default function AIEngineeringPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: site.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "AI Engineering & Machine Learning",
        item: `${site.url}/ai-engineering`,
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "AI Engineering, Machine Learning & Intelligent Systems Architecture",
    description:
      "Deep exploration into Model Context Protocol (MCP), autonomous agent orchestration, LLM guardrails, structured evaluation, and production automation.",
    author: {
      "@type": "Person",
      name: "Sheesh Mirza",
      url: site.url,
    },
    publisher: {
      "@type": "Person",
      name: "Sheesh Mirza",
    },
    url: `${site.url}/ai-engineering`,
    inLanguage: "en-US",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbJsonLd, articleJsonLd]),
        }}
      />
      <TopicPage
        eyebrow="Artificial Intelligence & Machine Learning"
        title="Building production AI systems, not conversational toys."
        description="My AI engineering work focuses on the deterministic software surrounding probabilistic models: tool calling, Model Context Protocol (MCP), state machine orchestration, synthetic data evaluation, and automated agent workflows."
        points={[
          "Model Context Protocol (MCP): building standardized client-server interfaces that allow LLMs to safely read contexts, query databases, and execute verified tools.",
          "Agentic AI architecture: stateful multi-agent execution loops, memory persistence, human-in-the-loop approvals, and automatic recovery from hallucinations.",
          "Automation and intelligent systems: transforming repetitive human processes into robust, self-healing background automation pipelines.",
          "Evaluation & benchmarks: creating ground-truth assertions, regression test suites, and quantitative metrics before deploying AI into mission-critical paths.",
          "Production realities: optimizing token costs, latency caching, local inference via Ollama, structured JSON output validation, and graceful deterministic fallbacks.",
        ]}
        related={[
          { label: "Software Engineering", href: "/software-engineering" },
          { label: "System Design", href: "/system-design" },
          { label: "GitHub Repositories", href: "/projects" },
          { label: "Technical Articles", href: "/blog" },
        ]}
      />
    </>
  );
}
