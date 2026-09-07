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
          title="Where software starts to reason"
          subtitle="The interesting question is not whether AI is powerful. It is where that power becomes genuinely useful."
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
        I&apos;m exploring generative AI, agents, and applied machine learning
        through small experiments that make the trade-offs visible: capability,
        reliability, cost, and human judgment.
      </p>
    </Section>
  );
}
