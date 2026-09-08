"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Code } from "lucide-react";
import { projects, projectCategories, type ProjectCategory } from "@/data/projects";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { Card } from "@/components/ui/Card";

export function Projects() {
  const [active, setActive] = useState<ProjectCategory | "All">("All");

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active],
  );

  return (
    <Section id="work" className="border-t border-border">
      <Reveal>
        <SectionHeading
          eyebrow="Work"
          title="Projects and experiments"
          subtitle="Software, prototypes, and small explorations aimed at making a useful idea tangible."
        />
      </Reveal>

      <Reveal delay={0.1} className="mt-8">
        <FilterTabs
          options={["All", ...projectCategories] as const}
          active={active}
          onChange={setActive}
        />
      </Reveal>

      {filtered.length === 0 ? (
        <p className="mt-12 text-muted">
          Nothing to show in this category yet. The next experiment is underway.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <Card
              key={project.name}
              interactive
              className="flex h-full flex-col p-6"
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
            </Card>
          ))}
        </div>
      )}
    </Section>
  );
}
