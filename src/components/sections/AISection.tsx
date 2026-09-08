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
          title="Making AI useful enough to trust"
          subtitle="The important question is not whether AI is capable, but where it can be useful, dependable, and responsibly applied."
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
        I explore generative AI, agents, and applied machine learning through
        small experiments that reveal the real trade-offs: capability,
        reliability, cost, and the need for human judgment.
      </p>
    </Section>
  );
}
