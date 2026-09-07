import { businessTopics } from "@/data/site-config";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TopicPill } from "@/components/ui/TopicPill";

export function Business() {
  return (
    <Section id="business" className="border-t border-border">
      <Reveal>
        <SectionHeading
          eyebrow="Startups & Business"
          title="Building businesses people choose"
          subtitle="Products succeed at the intersection of a real problem, a clear promise, and a reason to come back."
        />
      </Reveal>

      <div className="mt-10 flex flex-wrap gap-3">
        {businessTopics.map((topic, i) => (
          <Reveal key={topic} delay={i * 0.03}>
            <TopicPill>{topic}</TopicPill>
          </Reveal>
        ))}
      </div>
      <p className="mt-10 max-w-2xl text-muted">
        I&apos;m interested in the full loop: finding demand, shaping a product,
        earning attention, and learning what customers actually value.
      </p>
    </Section>
  );
}
