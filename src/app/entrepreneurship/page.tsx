import type { Metadata } from "next";
import { TopicPage } from "@/components/sections/TopicPage";
import { site } from "@/data/site-config";
import { createBreadcrumbSchema, createTechArticleSchema } from "@/lib/seo-schema";

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

const jsonLd = [
  createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Entrepreneurship & Startups", path: "/entrepreneurship" },
  ]),
  createTechArticleSchema({
    headline: "Entrepreneurship, Problems & Solutions, and Startup Innovation",
    description:
      "A pragmatic framework for discovering painful customer problems, testing demand, validating startup business models, and building scalable distribution.",
    path: "/entrepreneurship",
  }),
];

export default function EntrepreneurshipPage() {
  return (
    <TopicPage
      jsonLd={jsonLd}
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
  );
}
