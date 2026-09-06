"use client";

import { motion } from "framer-motion";
import { exploringTopics } from "@/data/site-config";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function CurrentlyExploring() {
  return (
    <Section className="border-t border-border bg-surface/40">
      <Reveal>
        <SectionHeading eyebrow="Right Now" title="Currently Exploring" />
      </Reveal>

      <div className="mt-10 flex flex-wrap gap-3">
        {exploringTopics.map((topic, i) => (
          <motion.span
            key={topic}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            whileHover={{ y: -3 }}
            className="rounded-full border border-border bg-surface px-5 py-2 text-sm text-foreground"
          >
            {topic}
          </motion.span>
        ))}
      </div>
    </Section>
  );
}
