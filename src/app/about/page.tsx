import { About } from "@/components/sections/About";
import { CuriosityGrid } from "@/components/sections/CuriosityGrid";
import { Thinking } from "@/components/sections/Thinking";
import { Psychology } from "@/components/sections/Psychology";
import { AISection } from "@/components/sections/AISection";
import { Business } from "@/components/sections/Business";
import { Projects } from "@/components/sections/Projects";
import { MentalModel } from "@/components/sections/MentalModel";
import { CurrentlyExploring } from "@/components/sections/CurrentlyExploring";
import { Books } from "@/components/sections/Books";
import { ExperienceEducation } from "@/components/sections/ExperienceEducation";
import { Principles } from "@/components/sections/Principles";

export default function AboutPage() {
  return (
    <>
      <About />
      <CuriosityGrid />
      <Thinking />
      <Psychology />
      <AISection />
      <Business />
      <Projects />
      <MentalModel />
      <CurrentlyExploring />
      <Books />
      <ExperienceEducation />
      <Principles />
    </>
  );
}