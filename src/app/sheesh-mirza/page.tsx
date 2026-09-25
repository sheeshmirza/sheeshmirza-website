import type { Metadata } from "next";
import { TopicPage } from "@/components/sections/TopicPage";

export const metadata: Metadata = {
  title: "Sheesh Mirza — Software Engineer, AI Builder & Creator",
  description:
    "Sheesh Mirza is a software engineer and creator focused on AI, software engineering, product building, entrepreneurship, and documenting the journey.",
  alternates: { canonical: "/sheesh-mirza" },
  openGraph: {
    title: "Sheesh Mirza — Software Engineer, AI Builder & Creator",
    description:
      "The official profile of Sheesh Mirza: software engineering, AI, product building, entrepreneurship, and creator work.",
    url: "/sheesh-mirza",
    type: "profile",
  },
};

export default function SheeshMirzaPage() {
  return (
    <TopicPage
      eyebrow="Official Profile"
      title="Sheesh Mirza — Software Engineer, AI Builder & Creator"
      description="This is the public home for Sheesh Mirza's work across software engineering, artificial intelligence, product experiments, entrepreneurship, writing, and creator projects. The goal is simple: do useful work, document it clearly, and keep improving."
      points={[
        "Software engineering is the foundation: backend systems, APIs, distributed systems, reliability, debugging, and the trade-offs behind production software.",
        "AI is the current frontier: LLM applications, AI agents, automation, evaluation, and the engineering required to turn prototypes into dependable systems.",
        "Building in public is the operating philosophy: share experiments, lessons, decisions, failures, and the evidence behind changing an opinion.",
        "Writing is part of the craft: technical notes, practical explanations, product thinking, and observations from actually building things.",
        "Sheesh Unfiltered is the creator layer: conversations, experiments, technology, career, business, stories, and unfiltered perspectives."
      ]}
      related={[
        { label: "About", href: "/about" },
        { label: "Projects", href: "/projects" },
        { label: "Writing", href: "/blog" },
        { label: "Videos", href: "/videos" },
        { label: "Contact", href: "/contact" },
      ]}
    />
  );
}
