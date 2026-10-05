import type { Metadata } from "next";
import { TopicPage } from "@/components/sections/TopicPage";
import { site, socialLinks } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Sheesh Mirza — Official Profile & Knowledge Base",
  description:
    "Official canonical profile for Sheesh Mirza. Software Engineer at FreeCharge, AI systems builder, writer, and host of Sheesh Unfiltered.",
  alternates: { canonical: "/sheesh-mirza" },
  openGraph: {
    title: "Sheesh Mirza — Official Profile",
    description: "Software Engineer, AI Systems Builder, Writer, and Creator.",
    url: `${site.url}/sheesh-mirza`,
    type: "profile",
  },
};

const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${site.url}/sheesh-mirza#profile`,
  mainEntity: {
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: "Sheesh Mirza",
    alternateName: ["Sheesh", "Sheesh Mirza"],
    url: site.url,
    image: `${site.url}/og-image.png`,
    jobTitle: "Software Engineer & AI Systems Architect",
    worksFor: {
      "@type": "Organization",
      name: "FreeCharge",
    },
    sameAs: socialLinks.map((s) => s.href),
    knowsAbout: [
      "Software Engineering & System Designing",
      "Artificial Intelligence & Machine Learning",
      "Automation and Intelligent Systems",
      "Distributed Systems & Cloud Architecture",
      "Entrepreneurship & Problem Discovery",
      "Startups & Business Innovation",
      "Human Psychology, Behavior & Habits",
    ],
  },
};

export default function SheeshMirzaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />
      <TopicPage
        eyebrow="Official Profile"
        title="Sheesh Mirza — Software Engineer, AI Builder & Creator"
        description="This is the canonical public hub for Sheesh Mirza's work across software engineering, artificial intelligence, startups, product experiments, writing, and creator initiatives. The operating ethos: build dependable software, share honest evidence, and document compounding progress."
        points={[
          "Software Engineering & System Designing: backend microservices, high concurrency, financial systems at FreeCharge, distributed reliability, and scalable architecture.",
          "Artificial Intelligence & Machine Learning: Model Context Protocol (MCP), autonomous agent orchestration, local models via Ollama, and deterministic guardrails.",
          "Automation & Intelligent Systems: converting high-friction human operations into autonomous background pipelines.",
          "Entrepreneurship & Startups: uncovering acute user problems, building rapid validation prototypes, and engineering growth loops.",
          "Human Psychology & Habits: understanding the 10 fundamental desires that dictate consumer behavior, decision-making biases, and habit formation.",
        ]}
        related={[
          { label: "About Background", href: "/about" },
          { label: "GitHub Repositories", href: "/projects" },
          { label: "Technical Essays", href: "/blog" },
          { label: "Video Essays", href: "/videos" },
          { label: "Press Kit & Bio", href: "/press" },
        ]}
      />
    </>
  );
}
