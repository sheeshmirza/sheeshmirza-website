import { Hero } from "@/components/sections/Hero";
import { CuriosityGrid } from "@/components/sections/CuriosityGrid";
import { FeaturedWriting } from "@/components/sections/FeaturedWriting";
import { Projects } from "@/components/sections/Projects";
import { Principles } from "@/components/sections/Principles";
import { site } from "@/data/site-config";
import { JsonLd } from "@/components/ui/JsonLd";
import { createWebPageSchema } from "@/lib/seo-schema";

const homeJsonLd = createWebPageSchema({
  name: site.title,
  description: site.description,
  path: "/",
  about: [
    "Software Engineering & System Designing",
    "Artificial Intelligence & Machine Learning",
    "Automation and Intelligent Systems",
    "Entrepreneurship & Problem Discovery",
    "Startups & Business Innovation",
    "Human Psychology & Habits",
  ],
  parts: [
    { name: "Software Engineering & System Designing", path: "/software-engineering" },
    { name: "System Design", path: "/system-design" },
    { name: "AI Engineering & Machine Learning", path: "/ai-engineering" },
    { name: "Projects & Open Source Repositories", path: "/projects" },
    { name: "Entrepreneurship & Startups", path: "/entrepreneurship" },
    { name: "Human Psychology, Behavior & Habits", path: "/psychology" },
    { name: "Technical Writing & Essays", path: "/blog" },
    { name: "Videos & Conversations", path: "/videos" },
  ],
});

export default function Home() {
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <Hero />
      <CuriosityGrid />
      <FeaturedWriting />
      <Projects />
      <Principles />
    </>
  );
}
