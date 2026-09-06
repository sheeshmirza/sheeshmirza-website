"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Code } from "lucide-react";
import { projects, projectCategories, type ProjectCategory } from "@/data/projects";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Projects() {
  const [active, setActive] = useState<ProjectCategory | "All">("All");

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active],
  );

  return (
    <Section id="work" className="border-t border-border">
      <Reveal>
        <SectionHeading eyebrow="Work" title="Things I've Built" />
      </Reveal>

      <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-2">
        {(["All", ...projectCategories] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              active === cat
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border text-muted hover:border-accent hover:text-accent"
            }`}
          >
            {cat}
          </button>
        ))}
      </Reveal>

      {filtered.length === 0 ? (
        <p className="mt-12 text-muted">
          Projects are being added here as they&apos;re built — check back soon.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <div
              key={project.name}
              className="flex h-full flex-col border border-border bg-surface p-6 transition-transform hover:-translate-y-1"
            >
              <span className="text-xs font-semibold tracking-widest text-accent uppercase">
                {project.category}
              </span>
              <h3 className="mt-3 font-serif text-xl text-foreground">
                {project.name}
              </h3>
              <p className="mt-3 text-sm text-muted">{project.description}</p>
              <p className="mt-3 text-xs text-muted">{project.problemSolved}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technology.map((t) => (
                  <span key={t} className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex gap-4 text-sm">
                {project.github && (
                  <a href={project.github} className="flex items-center gap-1 text-foreground hover:text-accent">
                    <Code size={14} /> Code
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} className="flex items-center gap-1 text-foreground hover:text-accent">
                    <ArrowUpRight size={14} /> Live
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
