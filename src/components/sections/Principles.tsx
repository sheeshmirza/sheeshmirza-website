import { principles } from "@/data/principles";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Principles() {
  return (
    <Section className="border-t border-border bg-surface/40">
      <Reveal>
        <SectionHeading
          eyebrow="Beliefs"
          title="A Few Things I Believe"
          align="center"
        />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {principles.map((p, i) => (
          <Reveal key={p.quote} delay={i * 0.05}>
            <blockquote className="h-full border border-border bg-surface p-6 font-serif text-lg leading-snug text-foreground">
              &ldquo;{p.quote}&rdquo;
            </blockquote>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
