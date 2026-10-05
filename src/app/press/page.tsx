import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail, Calendar } from "lucide-react";
import { site, socialLinks, calendlyUrl } from "@/data/site-config";
import { ExternalLink } from "@/components/ui/ExternalLink";

import { JsonLd } from "@/components/ui/JsonLd";
import { createBreadcrumbSchema, createProfileSchema } from "@/lib/seo-schema";

export const metadata: Metadata = {
  title: "Press Kit & Official Bio",
  description:
    "Official press kit, short and long bios, headshots, speaking topics, and media assets for Sheesh Mirza.",
  alternates: { canonical: "/press" },
  openGraph: {
    title: "Press Kit & Official Bio | Sheesh Mirza",
    description:
      "Official bio, speaking topics, profile links, and high-resolution media resources for Sheesh Mirza.",
    url: `${site.url}/press`,
    type: "profile",
  },
};

const jsonLd = [
  createProfileSchema({
    path: "/press",
    description: "Official press kit, speaking topics, approved photos, and media guidelines for Sheesh Mirza.",
  }),
  createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Press Kit & Bio", path: "/press" },
  ]),
];

export default function PressPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      <section className="mx-auto max-w-5xl px-6 py-16 sm:px-10 sm:py-24">
        <header className="max-w-3xl">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-muted">
            Official Press Kit & Media Information
          </p>
          <h1 className="mt-5 font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-foreground sm:text-7xl">
            Sheesh Mirza
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-muted">
            Software Development Engineer · AI & Automation Builder · Writer & Creator
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            This press kit contains official biographies, approved photos, core speaking topics, and brand guidelines for event organizers, podcast hosts, and publications.
          </p>
        </header>

        {/* Quick Facts */}
        <div className="mt-12 grid grid-cols-2 gap-4 border border-border bg-surface p-6 sm:grid-cols-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">Current Role</p>
            <p className="mt-1 font-medium text-foreground">SDE at Freecharge</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">Education</p>
            <p className="mt-1 font-medium text-foreground">MCA at Chandigarh Univ.</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">Location</p>
            <p className="mt-1 font-medium text-foreground">Gurugram / India</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">Channel</p>
            <p className="mt-1 font-medium text-foreground">Sheesh Unfiltered</p>
          </div>
        </div>

        {/* Biographies in Multiple Formats */}
        <div className="mt-14 space-y-8">
          <article className="border border-border bg-surface p-7 sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                One-Sentence Elevator Pitch
              </h2>
              <span className="text-xs text-muted">~25 words</span>
            </div>
            <p className="mt-4 text-base leading-relaxed text-foreground">
              Sheesh Mirza is a software engineer at Freecharge and writer exploring reliable software, AI automation, practical entrepreneurship, and how human psychology shapes product adoption.
            </p>
          </article>

          <article className="border border-border bg-surface p-7 sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                Short Bio (Introductions & Panels)
              </h2>
              <span className="text-xs text-muted">~70 words</span>
            </div>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Sheesh Mirza is a Software Development Engineer at Freecharge Payment Technologies, where he works on high-throughput backend services and transaction reliability. He is pursuing his Master of Computer Applications at Chandigarh University with a focus on machine learning and natural language processing. Outside production engineering, he writes on Medium and hosts <strong className="text-foreground font-semibold">Sheesh Unfiltered</strong>, breaking down practical AI, startups, and human behavior in plain English.
            </p>
          </article>

          <article className="border border-border bg-surface p-7 sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                Comprehensive Bio (Keynotes, Press & Features)
              </h2>
              <span className="text-xs text-muted">~160 words</span>
            </div>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-muted">
              <p>
                Sheesh Mirza is a software engineer, AI builder, and writer who focuses on the overlap between reliable backend engineering, modern AI automation, and human decision-making. At Freecharge Payment Technologies, he builds financial infrastructure designed for high transaction volume, idempotency, and predictable uptime.
              </p>
              <p>
                He holds a Bachelor of Computer Applications from Bareilly College and is completing his Master of Computer Applications at Chandigarh University, specializing in algorithms, machine learning, and scalable systems.
              </p>
              <p>
                As a creator and educator, Sheesh documents real experiments on his channel, <strong className="text-foreground font-semibold">Sheesh Unfiltered</strong>, and writes technical deep-dives on Medium. His work bridges the gap between complex engineering concepts and the human habits that turn software into sustainable businesses.
              </p>
            </div>
          </article>
        </div>

        {/* Speaking & Writing Topics */}
        <div className="mt-14 border border-border bg-surface p-7 sm:p-8">
          <h2 className="font-serif text-2xl font-semibold text-foreground">
            Speaking & Discussion Topics
          </h2>
          <p className="mt-2 text-sm text-muted">
            Sheesh speaks on podcasts, tech conferences, panels, and developer meetups on these core themes:
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="border border-border/80 bg-background/60 p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                Priority 1
              </span>
              <h3 className="mt-2 font-serif text-lg font-semibold text-foreground">
                Software Engineering & System Design
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Designing resilient distributed systems, idempotency in payments, message queues, debugging from evidence, and making systems fail safely.
              </p>
            </div>

            <div className="border border-border/80 bg-background/60 p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                Priority 1
              </span>
              <h3 className="mt-2 font-serif text-lg font-semibold text-foreground">
                Practical AI, Agents & Automation
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Building useful AI systems beyond the hype: Model Context Protocol (MCP), LLM evaluation benchmarks, autonomous tool calling, and self-healing pipelines.
              </p>
            </div>

            <div className="border border-border/80 bg-background/60 p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                Priority 2
              </span>
              <h3 className="mt-2 font-serif text-lg font-semibold text-foreground">
                Entrepreneurship & Problem Discovery
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Discovering painful problems before writing code, validating product-market fit, building distribution loops, and building products in public.
              </p>
            </div>

            <div className="border border-border/80 bg-background/60 p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                Priority 3
              </span>
              <h3 className="mt-2 font-serif text-lg font-semibold text-foreground">
                Human Psychology, Habits & Decisions
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Why customers choose, buy, and stick with products: the 10 core human desires, cognitive biases, and habit loops that drive technology adoption.
              </p>
            </div>
          </div>
        </div>

        {/* Media & Headshots */}
        <div className="mt-14 border border-border bg-surface p-7 sm:p-8">
          <h2 className="font-serif text-2xl font-semibold text-foreground">
            Approved Photos & Headshots
          </h2>
          <p className="mt-2 text-sm text-muted">
            You may use the following approved profile photo for conference badges, podcast thumbnails, and articles:
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://github.com/sheeshmirza.png"
              alt="Sheesh Mirza official headshot"
              className="h-28 w-28 rounded-full border-2 border-border object-cover shadow-sm"
              width={112}
              height={112}
              loading="lazy"
            />
            <div>
              <p className="font-medium text-foreground">High-Resolution Avatar (500x500)</p>
              <p className="text-xs text-muted">Suitable for print, web, and social banners</p>
              <div className="mt-3 flex flex-wrap gap-3">
                <ExternalLink
                  href="https://github.com/sheeshmirza.png"
                  className="inline-flex items-center gap-1 border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:border-signal"
                >
                  View Headshot <ArrowUpRight size={12} />
                </ExternalLink>
                <ExternalLink
                  href={`${site.url}/og-image.png`}
                  className="inline-flex items-center gap-1 border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:border-signal"
                >
                  Brand Card (1200x630) <ArrowUpRight size={12} />
                </ExternalLink>
              </div>
            </div>
          </div>
        </div>

        {/* Official Channels & Contact */}
        <div className="mt-14 border border-border p-7 sm:p-8">
          <h2 className="font-serif text-2xl font-semibold text-foreground">
            Official Channels & Inquiries
          </h2>
          <p className="mt-2 text-sm text-muted">
            Direct links to Sheesh&apos;s verified profiles and calendar for speaking bookings:
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              ["Website", site.url],
              ...socialLinks.map((s) => [s.label, s.href]),
            ].map(([label, href]) => (
              <ExternalLink
                key={label}
                href={href}
                className="inline-flex items-center gap-2 border border-border bg-surface px-4 py-3 text-sm font-semibold transition-colors hover:border-signal hover:text-signal"
              >
                {label} <ArrowUpRight size={14} />
              </ExternalLink>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-border pt-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-border bg-foreground px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
            >
              <Mail size={16} /> Send a Message
            </Link>
            <ExternalLink
              href={calendlyUrl}
              className="inline-flex items-center gap-2 border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-signal"
            >
              <Calendar size={16} /> Schedule 30-Min Call
            </ExternalLink>
          </div>
        </div>
      </section>
    </>
  );
}
