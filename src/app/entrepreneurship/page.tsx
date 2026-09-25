import type { Metadata } from "next";
import { TopicPage } from "@/components/sections/TopicPage";

export const metadata: Metadata = {
  title: "Entrepreneurship & Product Building — Sheesh Mirza",
  description:
    "Sheesh Mirza explores entrepreneurship, product building, customer problems, distribution, validation, and the technology behind useful businesses.",
  alternates: { canonical: "/entrepreneurship" },
};

export default function EntrepreneurshipPage() {
  return (
    <TopicPage
      eyebrow="Entrepreneurship"
      title="Start with the problem, then earn the right to build."
      description="I am interested in the intersection of engineering and entrepreneurship: finding painful workflows, validating demand, building small experiments, learning from users, and turning software into something people genuinely use."
      points={[
        "Problem discovery: look for repetitive work, expensive mistakes, slow workflows, and places where people create manual workarounds.",
        "Validation: talk to users, test assumptions, and learn whether the problem is painful enough to justify a product.",
        "Product judgment: when implementation gets cheaper, choosing what should exist becomes more important.",
        "Distribution: a useful product still needs a repeatable way to reach the people who need it.",
        "Building in public: experiments create both product feedback and a public record of what was learned."
      ]}
      related={[
        { label: "AI Engineering", href: "/ai-engineering" },
        { label: "Building in Public", href: "/building-in-public" },
        { label: "Projects", href: "/projects" },
        { label: "Contact", href: "/contact" },
      ]}
    />
  );
}
