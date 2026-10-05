import type { Metadata } from "next";
import { TopicPage } from "@/components/sections/TopicPage";
import { site } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Human Psychology, Behavior & Habits",
  description:
    "Notes by Sheesh Mirza on human psychology, behavioral economics, cognitive biases, habit formation, consumer decision-making, and why people buy.",
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
      "Explorations into human motivation, habit loops, decision-making biases, and the 10 fundamental desires that dictate consumer behavior.",
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
        eyebrow="Human Psychology & Behavior"
        title="Technology changes. Human wiring does not."
        description="Understanding what people truly care about, why they act, and how habits form is the prerequisite for designing products, writing persuasive messages, and making sound engineering trade-offs."
        points={[
          "The 10 fundamental human desires: survival, security, pleasure, status, belonging, attraction, achievement, freedom, identity, and curiosity that drive why people buy.",
          "Behavior and habit loops: the cue, craving, response, and reward cycle that builds lasting personal routines and sustainable software engagement.",
          "Decision-making under uncertainty: cognitive biases, loss aversion, status quo bias, and the mental models that help avoid predictable human traps.",
          "Emotional drivers vs. logical rationalization: customers purchase based on perceived identity and emotional relief, then justify their choice with feature checklists.",
          "Psychology of building: how friction, attention limits, and cognitive overload kill adoption faster than bad technology.",
        ]}
        related={[
          { label: "Writing on Psychology", href: "/blog" },
          { label: "Entrepreneurship", href: "/entrepreneurship" },
          { label: "System Design", href: "/system-design" },
          { label: "About Sheesh", href: "/about" },
        ]}
      />
    </>
  );
}
