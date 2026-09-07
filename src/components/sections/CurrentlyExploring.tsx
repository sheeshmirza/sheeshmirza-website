"use client";

import { exploringTopics } from "@/data/site-config";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TopicPill } from "@/components/ui/TopicPill";

export function CurrentlyExploring() {
  return (
    <Section className="border-t border-border bg-surface/40">
      <Reveal>
        <SectionHeading eyebrow="Right Now" title="Currently Exploring" />
      </Reveal>

      <div className="mt-10 flex flex-wrap gap-3">
        {exploringTopics.map((topic, i) => (
          <TopicPill
            key={topic}
            style={{ "--reveal-delay": `${i * 0.04}s` } as React.CSSProperties}
            className="reveal reveal-visible transition-transform duration-300 hover:-translate-y-1"
          >
            {topic}
          </TopicPill>
        ))}
      </div>
    </Section>
  );
}
