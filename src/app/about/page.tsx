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
import { site } from "@/data/site-config";
import { JsonLd } from "@/components/ui/JsonLd";
import { createProfileSchema } from "@/lib/seo-schema";

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

const profileJsonLd = createProfileSchema({
  path: "/about",
  jobTitle: "Software Engineer, AI Builder & Systems Architect",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={profileJsonLd} />
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