"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { type Article } from "@/data/articles";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { useRemoteData } from "@/hooks/useRemoteData";

type ArticlesResponse = {
  articles: Article[];
  categories?: string[];
  tags?: string[];
};

export function Thinking() {
  const [active, setActive] = useState<string>("All");
  const { data, loading } = useRemoteData<ArticlesResponse>("/api/articles");
  const articles = data?.articles ?? [];
  const categories = data?.categories ?? data?.tags ?? [];

  const filtered = useMemo(
    () =>
      active === "All" ? articles : articles.filter((a) => a.category === active),
    [active, articles],
  );

  const categoryList = ["All", ...categories] as const;

  return (
    <Section id="thinking" className="border-t border-border">
      <Reveal>
        <SectionHeading eyebrow="Thinking" title="What I'm Learning" />
      </Reveal>

      <Reveal delay={0.1} className="mt-8">
        <FilterTabs options={categoryList} active={active} onChange={setActive} />
      </Reveal>

      {loading ? (
        <p className="mt-12 text-muted">Loading articles...</p>
      ) : filtered.length === 0 ? (
        <p className="mt-12 text-muted">
          New thoughts on {active} are on the way.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article, i) => (
            <Reveal key={article.slug} delay={i * 0.05}>
              <ExternalLink
                href={article.href}
                className="group flex h-full flex-col border border-border bg-surface p-6 transition-[transform,border-color] hover:-translate-y-1 hover:border-signal"
              >
                <span className="text-xs font-semibold tracking-widest text-accent uppercase">
                  {article.category}
                </span>
                <h3 className="mt-3 font-serif text-xl text-foreground">
                  {article.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {article.description}
                </p>
                <div className="mt-6 flex items-center justify-between text-xs text-muted">
                  <span>
                    {article.date} · {article.readingTime}
                  </span>
                  <span className="flex items-center gap-1 text-foreground transition-colors group-hover:text-accent">
                    Read <ArrowUpRight size={14} />
                  </span>
                </div>
              </ExternalLink>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
