import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <Section id="about">
      <Reveal>
        <SectionHeading
          eyebrow="About"
          title="I build systems with people in mind."
          subtitle="My work sits where reliable software, practical business, and human behavior overlap."
          level="h1"
        />
      </Reveal>

      <Reveal delay={0.1} className="mt-10 grid max-w-5xl gap-8 text-base leading-relaxed text-muted lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          <p className="text-lg text-foreground">
            Most of my work begins with one question: what changes when we understand the system and the person using it together?
          </p>
          <p>
            I work as a <strong className="font-semibold text-foreground">Software Development Engineer at Freecharge Payment Technologies</strong>, helping build payment infrastructure where transaction integrity, idempotency, and reliability matter deeply.
          </p>
          <p>
            Alongside production engineering, I am completing a <strong className="font-semibold text-foreground">Master of Computer Applications at Chandigarh University</strong>, with a focus on machine learning, natural language processing, and algorithms.
          </p>
        </div>
        <div className="space-y-5 border-l border-border pl-6 lg:pl-8">
          <p>
            <span className="font-medium text-foreground">Technology shapes what is possible.</span>{" "}
            <span className="font-medium text-foreground">Psychology explains what matters to people.</span>{" "}
            <span className="font-medium text-foreground">Business turns that understanding into value.</span>{" "}
            <span className="font-medium text-foreground">AI is changing the pace and shape of all three.</span>
          </p>
          <p>
            Through <strong className="font-semibold text-foreground">Sheesh Unfiltered</strong> and essays on Medium, I share field notes on building small businesses, using AI well, navigating career shifts, and the biases that shape customer decisions.
          </p>
          <p>
            I value clear thinking over hype, evidence over vanity metrics, and software that earns its place by solving a real human problem.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
