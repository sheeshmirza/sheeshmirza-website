"use client";

import { useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import { articles as fallbackArticles } from "@/data/articles";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Card } from "@/components/ui/Card";
import { ErrorRetryBanner } from "@/components/ui/ErrorRetryBanner";
import { CardSkeletonGrid } from "@/components/ui/CardSkeletonGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { useRemoteData } from "@/hooks/useRemoteData";
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
        <ErrorRetryBanner
          message="Failed to load articles from remote feed."
          onRetry={refetch}
        />
      )}

      {loading && !articles.length ? (
        <CardSkeletonGrid count={3} />
      ) : featured.length === 0 ? (
        <EmptyState
          message="New essays are in progress. In the meantime, explore notes directly on Medium."
          className="mt-12 border border-border bg-surface p-6 text-sm text-muted"
        />
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
