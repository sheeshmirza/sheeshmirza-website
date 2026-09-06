"use client";

import { motion } from "framer-motion";
import { curiosityAreas } from "@/data/site-config";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function CuriosityGrid() {
  return (
    <Section className="border-t border-border">
      <Reveal>
        <SectionHeading
          eyebrow="Interests"
          title="Things That Keep Me Curious"
        />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {curiosityAreas.map((area, i) => (
          <Reveal key={area.key} delay={i * 0.06}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="h-full border border-border bg-surface p-6"
            >
              <p className="text-xs font-semibold tracking-widest text-accent uppercase">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 font-serif text-xl text-foreground">
                {area.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {area.description}
              </p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
