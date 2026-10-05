"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { videos as fallbackVideos } from "@/data/videos";
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
import { VideosResponseSchema, type ValidatedVideosResponse } from "@/lib/schemas";

function VideosContent() {
  const [active, setActive] = useState<string>("All");

  const initialData: ValidatedVideosResponse = useMemo(() => {
    const categories = Array.from(new Set(fallbackVideos.map((v) => v.category || "Ideas"))).sort();
    return {
      success: true,
      videos: fallbackVideos,
      categories,
      count: fallbackVideos.length,
      fallback: true,
    };
  }, []);

  const { data, loading, error, refetch } = useRemoteData<ValidatedVideosResponse>(
    "/api/videos",
    {
      schema: VideosResponseSchema,
      fallbackData: initialData,
    },
  );

  const videos = data?.videos ?? fallbackVideos;
  const categories =
    data?.categories ?? Array.from(new Set(videos.map((v) => v.category || "Ideas"))).sort();

  const filtered = useMemo(
    () =>
      active === "All" ? videos : videos.filter((v) => v.category === active),
    [active, videos],
  );

  const categoryList = ["All", ...categories] as const;

  return (
    <Section id="videos" className="border-t border-border">
      <Reveal>
        <SectionHeading
          eyebrow="Sheesh Unfiltered"
          title="Thinking out loud."
          subtitle="Conversations and experiments on technology, startups, business, and the human side of building."
          level="h1"
        />
      </Reveal>

      <Reveal delay={0.1} className="mt-8">
        <FilterTabs
          options={categoryList}
          active={active}
          onChange={setActive}
          variant="signal"
          ariaLabel="Filter videos by category"
        />
      </Reveal>

      {error && !videos.length && (
        <ErrorRetryBanner
          message="Failed to load conversations from remote feed."
          onRetry={refetch}
        />
      )}

      {loading && !videos.length ? (
        <CardSkeletonGrid count={3} hasThumbnail />
      ) : filtered.length === 0 ? (
        <EmptyState message={`No conversations in ${active} yet. The next one is still being shaped.`} />
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((video, i) => (
            <Reveal key={video.slug} delay={i * 0.05}>
              <ExternalLink
                href={video.href}
                className="group flex h-full flex-col overflow-hidden border border-border bg-surface transition-[transform,border-color] hover:-translate-y-1 hover:border-signal"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-foreground">
                  {video.thumbnail ? (
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={i < 2}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Play size={32} className="text-accent" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span className="text-xs font-semibold tracking-widest text-signal uppercase">
                    {video.category}
                  </span>
                  <h3 className="mt-3 font-serif text-lg font-semibold text-foreground line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted line-clamp-2">
                    {video.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted">
                    <span>{video.date}</span>
                    <span className="flex items-center gap-1 font-semibold text-foreground transition-colors group-hover:text-signal">
                      Watch <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </ExternalLink>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}

export function Videos() {
  return (
    <ErrorBoundary fallbackTitle="Videos Feed Unavailable">
      <VideosContent />
    </ErrorBoundary>
  );
}
