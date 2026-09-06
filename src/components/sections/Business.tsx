import { businessTopics } from "@/data/site-config";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Business() {
  return (
    <Section id="business" className="border-t border-border">
      <Reveal>
        <SectionHeading
          eyebrow="Startups & Business"
          title="Building & Understanding Businesses"
        />
      </Reveal>

      <div className="mt-10 flex flex-wrap gap-3">
        {businessTopics.map((topic, i) => (
          <Reveal key={topic} delay={i * 0.03}>
            <span className="inline-block rounded-full border border-border bg-surface px-5 py-2 text-sm text-foreground transition-colors hover:border-accent hover:text-accent">
              {topic}
            </span>
          </Reveal>
        ))}
      </div>

    </Section>
  );
}
