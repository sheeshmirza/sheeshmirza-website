import type { Metadata } from "next";
import { TopicPage } from "@/components/sections/TopicPage";
import { site, socialLinks } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Sheesh Mirza — Official Profile",
  description:
    "Official profile for Sheesh Mirza, a software engineer, AI builder, writer, and creator.",
  alternates: { canonical: "/sheesh-mirza" },
  openGraph: {
    title: "Sheesh Mirza — Official Profile",
    description: "Software engineer, AI builder, writer, and creator.",
    url: "/sheesh-mirza",
    type: "profile",
  },
};

const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": site.url + "/sheesh-mirza#profile",
  mainEntity: {
    "@type": "Person",
    "@id": site.url + "/#person",
    name: "Sheesh Mirza",
    alternateName: ["Sheesh", "Sheesh Mirza"],
    url: site.url,
    jobTitle: "Software Engineer, AI Builder & Creator",
    sameAs: socialLinks.map((s) => s.href),
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
        description="This is the public home for Sheesh Mirza's work across software engineering, artificial intelligence, product experiments, entrepreneurship, writing, and creator projects. The operating idea is simple: do useful work, document it clearly, and keep improving."
        points={[
          "Software engineering is the foundation: backend systems, APIs, distributed systems, reliability, debugging, and the trade-offs behind production software.",
          "AI is the current frontier: LLM applications, AI agents, automation, evaluation, and the engineering required to turn prototypes into dependable systems.",
          "Building in public is the operating philosophy: share experiments, lessons, decisions, failures, and the evidence behind changing an opinion.",
          "Writing is part of the craft: technical notes, practical explanations, product thinking, and observations from actually building things.",
          "Sheesh Unfiltered is the creator layer: conversations, experiments, technology, career, business, stories, and unfiltered perspectives.",
        ]}
        related={[
          { label: "About", href: "/about" },
          { label: "Projects", href: "/projects" },
          { label: "Writing", href: "/blog" },
          { label: "Videos", href: "/videos" },
          { label: "Profiles", href: "/media" },
        ]}
      />
    </>
  );
}
