"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { articles as fallbackArticles } from "@/data/articles";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { ErrorRetryBanner } from "@/components/ui/ErrorRetryBanner";
import { CardSkeletonGrid } from "@/components/ui/CardSkeletonGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { useRemoteData } from "@/hooks/useRemoteData";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { ArticlesResponseSchema, type ValidatedArticlesResponse } from "@/lib/schemas";

function ThinkingContent() {
  const [active, setActive] = useState<string>("All");

  const initialData: ValidatedArticlesResponse = useMemo(() => {
    const categories = Array.from(new Set(fallbackArticles.map((a) => a.category))).sort();
    return {
      success: true,
      articles: fallbackArticles,
      categories,
      tags: categories,
      count: fallbackArticles.length,
      fallback: true,
    };
  }, []);

  const { data, loading, error, refetch } = useRemoteData<ValidatedArticlesResponse>(
    "/api/articles",
    {
      schema: ArticlesResponseSchema,
      fallbackData: initialData,
    },
  );

  const articles = data?.articles ?? fallbackArticles;
  const categories = data?.categories ?? data?.tags ?? Array.from(new Set(articles.map((a) => a.category))).sort();

  const filtered = useMemo(
    () =>
      active === "All" ? articles : articles.filter((a) => a.category === active),
    [active, articles],
  );

  const categoryList = ["All", ...categories] as const;

  return (
    <Section id="thinking" className="border-t border-border">
      <Reveal>
        <SectionHeading
          eyebrow="Thinking"
          title="What I'm learning in public"
          subtitle="Short notes on technology, startups, psychology, and the ideas that make building clearer."
        />
      </Reveal>

      <Reveal delay={0.1} className="mt-8">
        <FilterTabs
          options={categoryList}
          active={active}
          onChange={setActive}
          ariaLabel="Filter articles by category"
        />
      </Reveal>

      {error && !articles.length && (
        <ErrorRetryBanner
          message="Failed to load articles from remote feed."
          onRetry={refetch}
        />
      )}

      {loading && !articles.length ? (
        <CardSkeletonGrid count={3} />
      ) : filtered.length === 0 ? (
        <EmptyState message={`No notes in ${active} yet. The next useful idea is still being worked out.`} />
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
                <h3 className="mt-3 font-serif text-xl font-semibold text-foreground">
                  {article.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
                  {article.description}
                </p>
                <div className="mt-6 flex items-center justify-between text-xs text-muted">
                  <span>
                    {article.date} · {article.readingTime}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-foreground transition-colors group-hover:text-signal">
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

export function Thinking() {
  return (
    <ErrorBoundary fallbackTitle="Thinking Notes Unavailable">
      <ThinkingContent />
    </ErrorBoundary>
  );
}
