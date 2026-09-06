"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { type Video } from "@/data/videos";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Videos() {
  const [active, setActive] = useState<string>("All");
  const [videos, setVideos] = useState<Video[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch("/api/videos");
        const data = await response.json();
        if (data.success && data.videos) {
          setVideos(data.videos);
          setCategories(data.categories || []);
        }
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

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
        />
      </Reveal>

      <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-2">
        {categoryList.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              active === cat
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted hover:border-signal hover:text-signal"
            }`}
          >
            {cat}
          </button>
        ))}
      </Reveal>

      {loading ? (
        <p className="mt-12 border-l-2 border-signal pl-4 text-sm text-muted">Finding the latest conversations...</p>
      ) : filtered.length === 0 ? (
        <p className="mt-12 text-muted">
          New conversations on {active} are on the way.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((video, i) => (
            <Reveal key={video.slug} delay={i * 0.05}>
              <a
                href={video.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden border border-border bg-surface transition-[transform,border-color] hover:-translate-y-1 hover:border-signal"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-foreground">
                  {video.thumbnail ? (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
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
              </a>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
