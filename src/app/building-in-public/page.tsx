import type { Metadata } from "next";
import { TopicPage } from "@/components/sections/TopicPage";

export const metadata: Metadata = {
  title: "Building in Public — Sheesh Mirza",
  description:
    "Sheesh Mirza's building-in-public approach: document real work, experiments, failures, technical lessons, and the journey of becoming a better builder.",
  alternates: { canonical: "/building-in-public" },
};

export default function BuildingInPublicPage() {
  return (
    <TopicPage
      eyebrow="Building in Public"
      title="Do the work first. Document the work second."
      description="The goal of building in public is not to perform expertise. It is to create a useful, searchable record of projects, experiments, decisions, failures, and lessons that other people can learn from."
      points={[
        "Teach what you test: new technology becomes content only after it has been used, challenged, or measured.",
        "Show failures: the most useful lesson is often what broke, why it broke, and what changed afterward.",
        "Create evidence: projects, repositories, articles, demos, and experiments are stronger signals than generic motivational content.",
        "Keep a recognizable point of view: AI, software engineering, building products, entrepreneurship, and the lessons between them.",
        "Let the archive compound: every useful page, project, video, and article makes the public record more complete."
      ]}
      related={[
        { label: "Sheesh Mirza", href: "/sheesh-mirza" },
        { label: "Projects", href: "/projects" },
        { label: "Writing", href: "/blog" },
        { label: "Videos", href: "/videos" },
      ]}
    />
  );
}
