import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { socialLinks } from "@/data/site-config";
import { SocialIcon } from "@/components/ui/SocialIcon";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-70" />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-16 sm:px-10 sm:pb-24 sm:pt-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-20 lg:px-12 lg:pt-28">
        <p className="hero-enter hero-enter-1 col-span-full flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-muted">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-signal shadow-[0_0_0_5px_color-mix(in_srgb,var(--signal)_15%,transparent)]" />
          Sheesh Mirza · Software Engineer · AI Builder · Creator
        </p>

        <h1 className="hero-enter hero-enter-2 max-w-4xl font-serif text-[3.25rem] leading-[0.98] tracking-[-0.04em] text-foreground sm:text-7xl lg:text-[6.6rem]">
          Sheesh Mirza.
          <br />
          Building <em className="text-signal">useful</em> things.
        </h1>

        <p className="hero-enter hero-enter-3 max-w-md self-end text-base leading-relaxed text-muted sm:text-lg lg:pb-2">
          Software engineer focused on <strong className="font-semibold text-foreground">Software Engineering &amp; System Designing</strong>, <strong className="font-semibold text-foreground">Artificial Intelligence</strong>, and intelligent automation. Exploring startups, problem discovery, and human psychology.
        </p>

        <div className="hero-enter hero-enter-4 flex flex-wrap items-center gap-3">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 bg-foreground px-5 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-1"
          >
            About & Experience <ArrowUpRight size={15} />
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-signal hover:text-signal"
          >
            Explore Projects <ArrowUpRight size={15} />
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 border-b-2 border-signal px-1 py-3 text-sm font-semibold text-foreground transition-colors hover:text-signal"
          >
            Read the work <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="hero-enter hero-enter-5 flex flex-wrap items-center gap-3 border-t border-border pt-5 lg:col-start-1">
          <span className="mr-2 text-xs uppercase tracking-[0.18em] text-muted">Find me in</span>
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="flex h-9 w-9 items-center justify-center border border-border bg-surface/60 text-muted transition-colors hover:border-signal hover:text-signal"
            >
              <SocialIcon platform={s.label} size={16} />
            </a>
          ))}
        </div>

        <aside className="hero-enter hero-enter-4 relative overflow-hidden border border-foreground bg-foreground p-6 text-background shadow-[12px_12px_0_var(--signal)] sm:p-8 lg:mb-2">
          <div className="flex items-center justify-between text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-background/60">
            <span>Build → Test → Learn → Share</span>
            <ArrowDownRight size={16} className="text-accent" />
          </div>
          <div className="paper-rule mt-7 h-1 w-full" />
          <p className="mt-7 max-w-sm font-serif text-3xl leading-tight sm:text-4xl">
            The goal is not to look like an expert. It is to build useful evidence.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-5 border-t border-background/20 pt-5 text-xs text-background/60">
            <div>
              <p className="text-background font-semibold">01 / Systems &amp; AI</p>
              <p className="mt-1">Software engineering, distributed systems &amp; intelligent automation</p>
            </div>
            <div>
              <p className="text-background font-semibold">02 / Startups &amp; Mindset</p>
              <p className="mt-1">Problem discovery, business innovation &amp; human psychology</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
