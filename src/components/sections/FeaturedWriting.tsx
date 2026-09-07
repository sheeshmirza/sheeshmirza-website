"use client";

import { ArrowUpRight } from "lucide-react";
import { type Article } from "@/data/articles";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { useRemoteData } from "@/hooks/useRemoteData";
import { Card } from "@/components/ui/Card";

type ArticlesResponse = { articles: Article[] };

export function FeaturedWriting() {
  const { data, loading } = useRemoteData<ArticlesResponse>("/api/articles");
  const articles = data?.articles ?? [];

  const featured = articles.filter((a) => a.featured);

  return (
    <Section id="writing" className="border-t border-border bg-surface/40">
      <Reveal>
        <SectionHeading
          eyebrow="Featured Writing"
          title="Notes for people who build."
          subtitle="Essays about technology, business, psychology, and the strange work of making useful things."
        />
      </Reveal>

      {loading ? (
        <p className="mt-12 border-l-2 border-signal pl-4 text-sm text-muted">Fetching the latest notes...</p>
      ) : featured.length === 0 ? (
        <p className="mt-12 border border-border bg-surface p-6 text-sm text-muted">New notes are being indexed. Check back shortly.</p>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {featured.map((article, i) => (
            <Reveal key={article.slug} delay={i * 0.08}>
              <Card interactive className="h-full p-0">
                <ExternalLink
                href={article.href}
                className="group flex h-full flex-col justify-between p-7"
              >
                <div>
                  <span className="text-xs font-semibold tracking-widest text-signal uppercase">
                    {article.category}
                  </span>
                  <h3 className="mt-4 font-serif text-2xl leading-snug text-foreground">
                    {article.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {article.description}
                  </p>
                </div>
                <span className="mt-8 flex items-center gap-1 text-sm text-foreground transition-colors group-hover:text-accent">
                  Read the note <ArrowUpRight size={14} />
                </span>
                </ExternalLink>
              </Card>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
