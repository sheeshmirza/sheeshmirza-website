import type { Metadata } from "next";
import { TopicPage } from "@/components/sections/TopicPage";
import { site } from "@/data/site-config";
import { createBreadcrumbSchema, createTechArticleSchema } from "@/lib/seo-schema";

export const metadata: Metadata = {
  title: "Building in Public & Open Learning",
  description:
    "Sheesh Mirza's building-in-public approach: documenting technical architectures, honest startup experiments, production metrics, failures, and compounding lessons.",
  alternates: { canonical: "/building-in-public" },
  openGraph: {
    title: "Building in Public & Open Learning | Sheesh Mirza",
    description:
      "Documenting real technical work, product experiments, failures, and transparent lessons learned in public.",
    url: `${site.url}/building-in-public`,
    type: "article",
  },
};

const jsonLd = [
  createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Building in Public", path: "/building-in-public" },
  ]),
  createTechArticleSchema({
    headline: "Building in Public: Documenting Engineering, AI, and Startups",
    description:
      "The philosophy and methodology of transparent software building: documenting experiments, sharing metrics, and turning failures into public knowledge.",
    path: "/building-in-public",
  }),
];

export default function BuildingInPublicPage() {
  return (
    <TopicPage
      jsonLd={jsonLd}
      eyebrow="Building in Public & Transparency"
      title="Do the work first. Document the lessons second."
      description="The purpose of building in public is never self-congratulatory theater. It is to produce an honest, durable, and searchable public archive of systems built, code shipped, assumptions falsified, and compounding insights."
      points={[
        "Build before broadcasting: technology and frameworks only earn discussion after being tested against production constraints and stress benchmarks.",
        "Document the wreckage: the most instructive engineering artifacts are postmortems—what broke, how it failed under load, and what architecture replaced it.",
        "Produce verifiable proof: public GitHub repositories, real deployed services, reproducible benchmarks, and technical essays outweigh superficial advice.",
        "Compound public equity: each transparent experiment, open source commit, video walkthrough, and field note expands the public knowledge moat.",
        "Multi-channel distribution: synthesizing deep insights across LinkedIn, YouTube, Medium, and this digital garden to create authentic organic reach.",
      ]}
      related={[
        { label: "Profile & Bio", href: "/sheesh-mirza" },
        { label: "Open Source Projects", href: "/projects" },
        { label: "Technical Writing", href: "/blog" },
        { label: "YouTube Videos", href: "/videos" },
      ]}
    />
  );
}
