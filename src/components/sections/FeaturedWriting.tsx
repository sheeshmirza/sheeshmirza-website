"use client";

import { useMemo } from "react";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import { articles as fallbackArticles } from "@/data/articles";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { useRemoteData } from "@/hooks/useRemoteData";
import { Card } from "@/components/ui/Card";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { ArticlesResponseSchema, type ValidatedArticlesResponse } from "@/lib/schemas";

function FeaturedWritingContent() {
  const initialData: ValidatedArticlesResponse = useMemo(
    () => ({
      success: true,
      articles: fallbackArticles,
      count: fallbackArticles.length,
      fallback: true,
    }),
    [],
  );

  const { data, loading, error, refetch } = useRemoteData<ValidatedArticlesResponse>(
    "/api/articles",
    {
      schema: ArticlesResponseSchema,
      fallbackData: initialData,
    },
  );

  const articles = data?.articles ?? fallbackArticles;
  const featured = articles.filter((a) => a.featured);

  return (
    <Section id="writing" className="border-t border-border bg-surface/40">
      <Reveal>
        <SectionHeading
          eyebrow="Featured Writing"
          title="Notes from the work of building."
          subtitle="Essays on technology, business, psychology, and the decisions that make useful products easier to build and trust."
          level="h1"
        />
      </Reveal>

      {error && !articles.length && (
        <div className="mt-12 border border-border bg-surface p-6">
          <p className="text-sm text-signal">Failed to load articles from remote feed.</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-3 inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foreground hover:border-signal"
          >
            <RefreshCw size={13} /> Retry Loading
          </button>
        </div>
      )}

      {loading && !articles.length ? (
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-72 border border-border bg-surface p-7 animate-pulse">
              <div className="h-3 w-16 bg-border/60 rounded" />
              <div className="mt-4 h-6 w-3/4 bg-border/60 rounded" />
              <div className="mt-4 h-16 w-full bg-border/30 rounded" />
            </div>
          ))}
        </div>
      ) : featured.length === 0 ? (
        <p className="mt-12 border border-border bg-surface p-6 text-sm text-muted">
          New essays are in progress. In the meantime, explore notes directly on Medium.
        </p>
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
                    <h3 className="mt-4 font-serif text-2xl font-semibold leading-snug text-foreground">
                      {article.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted line-clamp-4">
                      {article.description}
                    </p>
                  </div>
                  <span className="mt-8 flex items-center gap-1 text-sm font-semibold text-foreground transition-colors group-hover:text-signal">
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

export function FeaturedWriting() {
  return (
    <ErrorBoundary fallbackTitle="Featured Writing Unavailable">
      <FeaturedWritingContent />
    </ErrorBoundary>
  );
}
