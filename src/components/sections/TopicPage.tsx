import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type TopicPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  related: { label: string; href: string }[];
};

export function TopicPage({
  eyebrow,
  title,
  description,
  points,
  related,
}: TopicPageProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-24 lg:px-12">
      <div className="max-w-4xl">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-muted">
          {eyebrow}
        </p>
        <h1 className="mt-5 font-serif text-5xl leading-[0.98] tracking-[-0.04em] sm:text-7xl">
          {title}
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted">
          {description}
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {points.map((point) => (
          <article key={point} className="border border-border bg-surface p-7">
            <div className="h-2 w-12 bg-signal" />
            <p className="mt-6 text-base leading-relaxed text-foreground">{point}</p>
          </article>
        ))}
      </div>

      <div className="mt-14 border-t border-border pt-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Explore more from Sheesh Mirza
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {related.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center gap-2 border border-border bg-surface px-4 py-3 text-sm font-semibold transition-colors hover:border-signal hover:text-signal"
            >
              {item.label} <ArrowUpRight size={14} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
