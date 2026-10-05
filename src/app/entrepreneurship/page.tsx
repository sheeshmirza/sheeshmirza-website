import type { Metadata } from "next";
import { TopicPage } from "@/components/sections/TopicPage";
import { site } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Entrepreneurship, Startups & Problem Solving",
  description:
    "Field notes by Sheesh Mirza on entrepreneurship, discovering acute problems, business validation, startup economics, innovation, and scaling useful software products.",
  alternates: { canonical: "/entrepreneurship" },
  openGraph: {
    title: "Entrepreneurship, Startups & Innovation | Sheesh Mirza",
    description:
      "Turning real-world problems into sustainable software products and high-growth startup ventures.",
    url: `${site.url}/entrepreneurship`,
    type: "article",
  },
};

export default function EntrepreneurshipPage() {
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
        name: "Entrepreneurship & Startups",
        item: `${site.url}/entrepreneurship`,
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Entrepreneurship, Problems & Solutions, and Startup Innovation",
    description:
      "A pragmatic framework for discovering painful customer problems, testing demand, validating startup business models, and building scalable distribution.",
    author: {
      "@type": "Person",
      name: "Sheesh Mirza",
      url: site.url,
    },
    publisher: {
      "@type": "Person",
      name: "Sheesh Mirza",
    },
    url: `${site.url}/entrepreneurship`,
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
        eyebrow="Entrepreneurship, Startups & Innovation"
        title="Find burning problems, then earn the right to build."
        description="I study and practice the discipline where engineering meets business: discovering expensive workflow bottlenecks, validating market demand before writing lines of code, and turning useful software into durable, profitable enterprises."
        points={[
          "Problems & solutions discovery: hunt for repetitive manual labor, costly operational blunders, and fragmented makeshift spreadsheets where users are desperate for solutions.",
          "Early validation: talk directly to prospects, pre-sell before building, and verify whether customers are willing to exchange money or attention to eliminate the pain.",
          "Startup economics & business models: understanding unit economics, recurring revenue dynamics, customer acquisition costs, and defensible technology moats.",
          "Innovation & growth engines: a superior product without repeatable distribution dies quietly; build intrinsic growth loops, organic search dominance, and developer community reach.",
          "Building in public: sharing authentic wins, failures, metrics, and technical iterations turns product development into transparent trust and audience magnet.",
        ]}
        related={[
          { label: "Building in Public", href: "/building-in-public" },
          { label: "AI Engineering", href: "/ai-engineering" },
          { label: "Human Psychology", href: "/psychology" },
          { label: "Videos on Startups", href: "/videos" },
        ]}
      />
    </>
  );
}
