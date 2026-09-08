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

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Sheesh Mirza approaches software, startups, AI, business, psychology, and the space between systems and people.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Sheesh Mirza",
    description:
      "How Sheesh Mirza approaches software, startups, AI, business, and human behavior.",
    url: "/about",
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <>
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