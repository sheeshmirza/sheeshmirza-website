"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { type Article } from "@/data/articles";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function FeaturedWriting() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch("/api/articles");
        const data = await response.json();
        if (data.success && data.articles) {
          setArticles(data.articles);
        }
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

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
              <a
                href={article.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col justify-between border border-border bg-surface p-7 transition-[transform,border-color] hover:-translate-y-1 hover:border-signal"
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
              </a>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
