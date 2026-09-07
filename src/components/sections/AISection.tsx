import { aiTopics } from "@/data/site-config";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TopicPill } from "@/components/ui/TopicPill";

export function AISection() {
  return (
    <Section id="ai" className="border-t border-border bg-surface/40">
      <Reveal>
        <SectionHeading
          eyebrow="Artificial Intelligence"
          title="Where Technology Gets Interesting"
        />
      </Reveal>

      <div className="mt-10 flex flex-wrap gap-3">
        {aiTopics.map((topic, i) => (
          <Reveal key={topic} delay={i * 0.03}>
            <TopicPill>{topic}</TopicPill>
          </Reveal>
        ))}
      </div>

      <p className="mt-10 max-w-2xl text-muted">
        Experiments and projects exploring generative AI, agents and applied
        machine learning will live here as they&apos;re built.
      </p>
    </Section>
  );
}
