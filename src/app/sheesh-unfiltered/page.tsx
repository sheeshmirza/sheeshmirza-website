import type { Metadata } from "next";
import { TopicPage } from "@/components/sections/TopicPage";
import { site } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Sheesh Unfiltered — Video Essays & Real Conversations",
  description:
    "Sheesh Unfiltered is the video media channel hosted by Sheesh Mirza exploring Artificial Intelligence, software engineering, startups, business models, and career realities without fluff.",
  alternates: { canonical: "/sheesh-unfiltered" },
  openGraph: {
    title: "Sheesh Unfiltered | Sheesh Mirza",
    description:
      "Unfiltered video essays and podcast conversations about AI businesses, software systems, and transparent startup building.",
    url: `${site.url}/sheesh-unfiltered`,
    type: "website",
  },
};

export default function SheeshUnfilteredPage() {
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
        name: "Sheesh Unfiltered",
        item: `${site.url}/sheesh-unfiltered`,
      },
    ],
  };

  const seriesJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWorkSeries",
    name: "Sheesh Unfiltered",
    description: metadata.description,
    author: {
      "@type": "Person",
      name: "Sheesh Mirza",
      url: site.url,
    },
    url: "https://www.youtube.com/@Sheesh.Unfiltered",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbJsonLd, seriesJsonLd]),
        }}
      />
      <TopicPage
        eyebrow="Media Property"
        title="Sheesh Unfiltered — No Script. No Filter. Just Sheesh."
        description="Sheesh Unfiltered is the video and conversation platform of Sheesh Mirza. It is where artificial intelligence, software engineering, startup models, experiments, and career insights are explored honestly without artificial hype."
        points={[
          "Technology & Systems: software engineering, AI frameworks, system design trade-offs, and practical developer tools.",
          "Startup Experiments: what I build, measure, validate, abandon, or scale in the real market.",
          "Career & Engineering Growth: senior engineering judgment, interviews, mastery systems, and lessons from high-scale fintech.",
          "Business Models & AI: analyzing real revenue models for AI products, agency workflows, and one-person digital businesses.",
          "Unfiltered Perspective: honest observations on building in public, human psychology, and intellectual curiosity.",
        ]}
        related={[
          { label: "Watch on YouTube", href: "https://www.youtube.com/@Sheesh.Unfiltered" },
          { label: "Video Essays", href: "/videos" },
          { label: "Open Source Work", href: "/projects" },
          { label: "Technical Writing", href: "/blog" },
        ]}
      />
    </>
  );
}
