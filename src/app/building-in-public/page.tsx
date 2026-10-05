import type { Metadata } from "next";
import { TopicPage } from "@/components/sections/TopicPage";
import { site } from "@/data/site-config";

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

export default function BuildingInPublicPage() {
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
        name: "Building in Public",
        item: `${site.url}/building-in-public`,
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Building in Public: Documenting Engineering, AI, and Startups",
    description:
      "The philosophy and methodology of transparent software building: documenting experiments, sharing metrics, and turning failures into public knowledge.",
    author: {
      "@type": "Person",
      name: "Sheesh Mirza",
      url: site.url,
    },
    publisher: {
      "@type": "Person",
      name: "Sheesh Mirza",
    },
    url: `${site.url}/building-in-public`,
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
    </>
  );
}
