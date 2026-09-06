import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <Section id="about">
      <Reveal>
        <SectionHeading
          eyebrow="About"
          title="A notebook for the space between systems and people."
          subtitle="I build software, study behavior, and write down the patterns that survive contact with reality."
        />
      </Reveal>

      <Reveal delay={0.1} className="mt-10 grid max-w-5xl gap-8 text-lg leading-relaxed text-muted lg:grid-cols-[1.1fr_0.9fr]">
        <p>
          Most of my work starts with the same question: what becomes possible
          when we understand the system and the person using it at the same
          time?
        </p>
        <p>
          <span className="text-foreground">Technology explains systems.</span>{" "}
          <span className="text-foreground">Psychology explains people.</span>{" "}
          <span className="text-foreground">Business connects the two.</span>{" "}
          And increasingly,{" "}
          <span className="text-foreground">AI is changing all three.</span>
        </p>
        <p>
          That&apos;s the lens I use to build software, think about startups,
          and study the ideas worth exploring — and it&apos;s the thread that
          runs through everything on this site.
        </p>
      </Reveal>
    </Section>
  );
}
