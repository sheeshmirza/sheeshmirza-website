import type { Metadata } from "next";
import { FeaturedWriting } from "@/components/sections/FeaturedWriting";
import { Thinking } from "@/components/sections/Thinking";
import { articles } from "@/data/articles";
import { site } from "@/data/site-config";
import { JsonLd } from "@/components/ui/JsonLd";
import { createCollectionSchema, createBreadcrumbSchema } from "@/lib/seo-schema";

export const metadata: Metadata = {
  title: "Writing: Software Engineering, AI, Startups & Psychology",
  description:
    "Technical essays and field notes by Sheesh Mirza exploring Software Engineering & System Designing, Artificial Intelligence & Machine Learning, Automation, Startups, and Human Psychology.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Writing by Sheesh Mirza | Essays & Field Notes",
    description:
      "Deep technical essays on system design, AI architectures, startup economics, and human behavioral psychology.",
    url: `${site.url}/blog`,
    type: "website",
  },
};

const jsonLd = [
  createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Writing & Field Notes", path: "/blog" },
  ]),
  createCollectionSchema({
    name: "Writing & Field Notes by Sheesh Mirza",
    description: metadata.description as string,
    path: "/blog",
    items: articles.map((article, idx) => ({
      "@type": "BlogPosting",
      position: idx + 1,
      headline: article.title,
      description: article.description,
      url: article.href,
      datePublished: new Date(article.date).toISOString().split("T")[0] || article.date,
      author: {
        "@type": "Person",
        name: site.name,
        url: site.url,
      },
      publisher: {
        "@type": "Person",
        name: site.name,
      },
      articleSection: article.category,
      keywords: article.tags?.join(", ") || article.category,
    })),
  }),
];

export default function BlogPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <FeaturedWriting />
      <Thinking />
    </>
  );
}

