import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { ExperienceEducation } from "@/components/sections/ExperienceEducation";
import { MentalModel } from "@/components/sections/MentalModel";
import { Psychology } from "@/components/sections/Psychology";
import { AISection } from "@/components/sections/AISection";
import { Business } from "@/components/sections/Business";
import { CurrentlyExploring } from "@/components/sections/CurrentlyExploring";
import { Books } from "@/components/sections/Books";
import { Principles } from "@/components/sections/Principles";
import { site, socialLinks } from "@/data/site-config";

export const metadata: Metadata = {
  title: "About Sheesh Mirza — Engineering, AI & Entrepreneurship",
  description:
    "Learn how Sheesh Mirza approaches Software Engineering & System Designing, Artificial Intelligence & Machine Learning, Startups, and Human Psychology.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Sheesh Mirza | Systems, AI & Entrepreneurship",
    description:
      "How Sheesh Mirza designs software systems, builds AI agents, tests startup models, and studies human psychology.",
    url: `${site.url}/about`,
    type: "profile",
  },
};

export default function AboutPage() {
  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "About Sheesh Mirza",
    url: `${site.url}/about`,
    mainEntity: {
      "@type": "Person",
      name: "Sheesh Mirza",
      url: site.url,
      jobTitle: "Software Engineer, AI Builder & Systems Architect",
      worksFor: {
        "@type": "Organization",
        name: "FreeCharge",
      },
      sameAs: socialLinks.map((s) => s.href),
      knowsAbout: [
        "Software Engineering & System Designing",
        "Artificial Intelligence & Machine Learning",
        "Automation and Intelligent Systems",
        "Entrepreneurship & Problem Discovery",
        "Startups & Business Innovation",
        "Human Psychology & Habits",
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profileJsonLd),
        }}
      />
      <About />
      <ExperienceEducation />
      <MentalModel />
      <Psychology />
      <AISection />
      <Business />
      <CurrentlyExploring />
      <Books />
      <Principles />
    </>
  );
}