import { Hero } from "@/components/sections/Hero";
import { CuriosityGrid } from "@/components/sections/CuriosityGrid";
import { FeaturedWriting } from "@/components/sections/FeaturedWriting";
import { Projects } from "@/components/sections/Projects";
import { Principles } from "@/components/sections/Principles";
import { site } from "@/data/site-config";

export default function Home() {
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": site.url,
    url: site.url,
    name: "Sheesh Mirza — Software Engineering, System Design, AI & Entrepreneurship",
    description: site.description,
    about: [
      { "@type": "Thing", name: "Software Engineering & System Designing" },
      { "@type": "Thing", name: "Artificial Intelligence & Machine Learning" },
      { "@type": "Thing", name: "Automation and Intelligent Systems" },
      { "@type": "Thing", name: "Entrepreneurship & Problem Discovery" },
      { "@type": "Thing", name: "Startups & Business Innovation" },
      { "@type": "Thing", name: "Human Psychology & Habits" },
    ],
    hasPart: [
      {
        "@type": "WebPage",
        name: "Software Engineering & System Designing",
        url: `${site.url}/software-engineering`,
      },
      {
        "@type": "WebPage",
        name: "System Design",
        url: `${site.url}/system-design`,
      },
      {
        "@type": "WebPage",
        name: "AI Engineering & Machine Learning",
        url: `${site.url}/ai-engineering`,
      },
      {
        "@type": "WebPage",
        name: "Projects & Open Source Repositories",
        url: `${site.url}/projects`,
      },
      {
        "@type": "WebPage",
        name: "Entrepreneurship & Startups",
        url: `${site.url}/entrepreneurship`,
      },
      {
        "@type": "WebPage",
        name: "Human Psychology, Behavior & Habits",
        url: `${site.url}/psychology`,
      },
      {
        "@type": "WebPage",
        name: "Technical Writing & Essays",
        url: `${site.url}/blog`,
      },
      {
        "@type": "WebPage",
        name: "Videos & Conversations",
        url: `${site.url}/videos`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeJsonLd),
        }}
      />
      <Hero />
      <CuriosityGrid />
      <FeaturedWriting />
      <Projects />
      <Principles />
    </>
  );
}
