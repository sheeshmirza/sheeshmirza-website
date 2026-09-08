import { Hero } from "@/components/sections/Hero";
import { CuriosityGrid } from "@/components/sections/CuriosityGrid";
import { FeaturedWriting } from "@/components/sections/FeaturedWriting";
import { Projects } from "@/components/sections/Projects";
import { Principles } from "@/components/sections/Principles";

export default function Home() {
  return (
    <>
      <Hero />
      <CuriosityGrid />
      <FeaturedWriting />
      <Projects />
      <Principles />
    </>
  );
}
