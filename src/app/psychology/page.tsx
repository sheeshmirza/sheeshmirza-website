import type { Metadata } from "next";
import { TopicPage } from "@/components/sections/TopicPage";
import { site } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Human Psychology, Behavior & Habits",
  description:
    "Plain-language notes by Sheesh Mirza on human psychology, behavioral economics, cognitive biases, habit formation, consumer decision-making, and why people buy.",
  alternates: { canonical: "/psychology" },
  openGraph: {
    title: "Human Psychology, Behavior & Habits | Sheesh Mirza",
    description:
      "Understanding the behavioral forces behind consumer decisions, product adoption, habit loops, and clear thinking.",
    url: `${site.url}/psychology`,
    type: "article",
  },
};

export default function PsychologyPage() {
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
        name: "Human Psychology",
        item: `${site.url}/psychology`,
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Human Psychology, Behavior and Habits in Product Building",
    description:
      "Explorations into human motivation, habit loops, decision-making biases, and the fundamental desires that dictate consumer behavior.",
    author: {
      "@type": "Person",
      name: "Sheesh Mirza",
      url: site.url,
    },
    publisher: {
      "@type": "Person",
      name: "Sheesh Mirza",
    },
    url: `${site.url}/psychology`,
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
        eyebrow="Human Psychology, Behavior & Habits"
        title="Technology evolves every year. Human psychology stays the same."
        description="Understanding what people actually care about, why they act, and how habits take root is essential for building products that people use, love, and return to."
        points={[
          "The core human desires: survival, security, pleasure, status, belonging, attraction, achievement, freedom, and curiosity. Every product succeeds or fails by how well it serves these needs.",
          "Behavior and habit loops: the cue, craving, action, and reward sequence that turns single visits into everyday routines.",
          "Clear decision-making: recognizing cognitive biases, fear of loss, and comfort with the status quo helps us design simpler, friendlier user experiences.",
          "Emotion leads, logic justifies: people decide using emotion and perceived trust, then confirm their choice with feature checklists and rational arguments.",
          "Removing friction: confusion, slow speeds, and cognitive overload drive users away long before technical differences ever matter.",
        ]}
        related={[
          { label: "Writing on Psychology", href: "/blog" },
          { label: "Entrepreneurship", href: "/entrepreneurship" },
          { label: "Software Engineering", href: "/software-engineering" },
          { label: "About Sheesh", href: "/about" },
        ]}
      />
    </>
  );
}

