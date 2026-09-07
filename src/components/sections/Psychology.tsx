import { psychologyTopics } from "@/data/site-config";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const flow = ["Attention", "Emotion", "Desire", "Decision", "Action"];

export function Psychology() {
  return (
    <Section className="border-t border-border">
      <Reveal>
        <SectionHeading
          eyebrow="Human Behavior"
          title="Designing for how people really behave"
          subtitle="Technology changes what people can do. Psychology helps explain what they notice, want, trust, and choose."
        />
      </Reveal>

      <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center gap-3 border border-border bg-surface p-6">
        {flow.map((step, i) => (
          <span key={step} className="flex items-center gap-3">
            <span className="rounded-full border border-border px-4 py-2 text-sm text-foreground">
              {step}
            </span>
            {i < flow.length - 1 && <span className="text-accent">→</span>}
          </span>
        ))}
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {psychologyTopics.map((topic, i) => (
          <Reveal key={topic} delay={i * 0.04}>
            <div className="border border-border bg-surface px-4 py-5 text-center text-sm text-foreground transition-colors hover:border-signal hover:text-signal">
              {topic}
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mt-8 text-sm text-muted">
        The pattern I keep returning to: attention creates awareness, emotion
        creates meaning, desire creates momentum, and trust makes action feel
        safe.
      </p>
    </Section>
  );
}
