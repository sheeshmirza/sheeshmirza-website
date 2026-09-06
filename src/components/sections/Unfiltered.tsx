import { ArrowUpRight } from "lucide-react";
import { unfilteredCategories } from "@/data/site-config";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Unfiltered() {
  return (
    <Section id="unfiltered" className="border-t border-border bg-foreground text-background">
      <Reveal>
        <p className="text-xs font-semibold tracking-[0.3em] text-accent uppercase">
          Sheesh Unfiltered
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">
          No Filter. Just Sheesh.
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-background/70">
          Technology, entrepreneurship, experiences, opinions, conversations,
          ideas and whatever else is worth talking about.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-2">
        {unfilteredCategories.map((cat) => (
          <span
            key={cat}
            className="rounded-full border border-background/20 px-4 py-1.5 text-sm text-background/80"
          >
            {cat}
          </span>
        ))}
      </Reveal>

      <Reveal delay={0.2}>
        <a
          href="https://www.youtube.com/@Sheesh.Unfiltered"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground"
        >
          Watch Sheesh Unfiltered <ArrowUpRight size={14} />
        </a>
      </Reveal>
    </Section>
  );
}
