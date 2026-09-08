"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { type Video } from "@/data/videos";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { ExternalLink } from "@/components/ui/ExternalLink";

import { useRemoteData } from "@/hooks/useRemoteData";

type VideosResponse = { videos: Video[]; categories?: string[] };

export function Videos() {
  const [active, setActive] = useState<string>("All");
  const { data, loading } = useRemoteData<VideosResponse>("/api/videos");
  const videos = data?.videos ?? [];
  const categories = data?.categories ?? [];

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
        />
      </Reveal>

      {loading ? (
        <p className="mt-12 border-l-2 border-signal pl-4 text-sm text-muted">Loading the latest conversations...</p>
      ) : filtered.length === 0 ? (
        <p className="mt-12 text-muted">
          No conversations in {active} yet. The next one is still being shaped.
        </p>
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
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      loading="lazy"
                      decoding="async"
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
                  <h3 className="mt-3 font-serif text-lg text-foreground line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted line-clamp-2">
                    {video.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted">
                    <span>{video.date}</span>
                    <span className="flex items-center gap-1 text-foreground transition-colors group-hover:text-accent">
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
