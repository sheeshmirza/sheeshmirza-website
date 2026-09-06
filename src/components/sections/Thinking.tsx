"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { type Article } from "@/data/articles";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Thinking() {
  const [active, setActive] = useState<string>("All");
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch("/api/articles");
        const data = await response.json();
        if (data.success && data.articles) {
          setArticles(data.articles);
          setCategories(data.categories || data.tags || []);
        }
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

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

      <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-2">
        {categoryList.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              active === cat
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border text-muted hover:border-accent hover:text-accent"
            }`}
          >
            {cat}
          </button>
        ))}
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
              <a
                href={article.href}
                target="_blank"
                rel="noopener noreferrer"
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
              </a>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
