import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const flow = [
  "Technology",
  "Creates Possibilities",
  "Business",
  "Creates Value",
  "Psychology",
  "Explains Behavior",
  "AI",
  "Accelerates Everything",
];

export function MentalModel() {
  return (
    <Section className="border-t border-border">
      <Reveal>
        <SectionHeading
          eyebrow="My Mental Model"
          title="How I Look At Things"
          align="center"
        />
      </Reveal>

      <Reveal delay={0.1} className="mt-14 flex flex-col items-center gap-2">
        {flow.map((step, i) => (
          <div key={step} className="flex flex-col items-center">
            <span
              className={`rounded-full px-6 py-2.5 text-sm ${
                i % 2 === 0
                  ? "border border-border bg-surface font-medium text-foreground"
                  : "text-muted"
              }`}
            >
              {step}
            </span>
            {i < flow.length - 1 && <span className="text-accent">↓</span>}
          </div>
        ))}
        <span className="text-accent">↓</span>
        <span className="rounded-full bg-accent px-8 py-3 font-serif text-lg text-accent-foreground">
          People
        </span>
      </Reveal>
    </Section>
  );
}
