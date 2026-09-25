import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Press Kit & Bio — Sheesh Mirza",
  description:
    "Press kit, short bio, long bio, profile links, and official brand description for Sheesh Mirza.",
  alternates: { canonical: "/press" },
};

export default function PressPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 sm:px-10 sm:py-24">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-muted">Press & About</p>
      <h1 className="mt-5 font-serif text-5xl leading-[0.98] tracking-[-0.04em] sm:text-7xl">Sheesh Mirza</h1>
      <p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted">Software Engineer · AI Builder · Creator</p>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        <article className="border border-border bg-surface p-7">
          <h2 className="font-serif text-2xl">Short bio</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted">
            Sheesh Mirza is a software engineer, AI builder, writer, and creator exploring the intersection of reliable software, practical AI, product building, and entrepreneurship.
          </p>
        </article>

        <article className="border border-border bg-surface p-7">
          <h2 className="font-serif text-2xl">Long bio</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted">
            Sheesh Mirza documents the process of building software, learning AI, testing products, studying engineering trade-offs, and sharing the lessons that come from real experiments. His content spans software engineering, AI engineering, system design, entrepreneurship, career, and the creator journey.
          </p>
        </article>
      </div>

      <div className="mt-8 border border-border p-7">
        <h2 className="font-serif text-2xl">Official links</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {[
            ["Website", "https://smirza.in"],
            ["LinkedIn", "https://www.linkedin.com/in/sheeshmirza"],
            ["GitHub", "https://github.com/sheeshmirza"],
            ["Medium", "https://sheeshmirza.medium.com"],
            ["YouTube", "https://www.youtube.com/@Sheesh.Unfiltered"],
            ["Instagram", "https://www.instagram.com/_mir_zey/"],
          ].map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-border px-4 py-3 text-sm font-semibold transition-colors hover:border-signal hover:text-signal">
              {label} <ArrowUpRight size={14} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
