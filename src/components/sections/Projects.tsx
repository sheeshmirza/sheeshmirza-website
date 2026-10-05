"use client";

import { useMemo, useState } from "react";
import { Code, Star } from "lucide-react";
import { projects as fallbackProjects, projectCategories as fallbackCategories } from "@/data/projects";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { Card } from "@/components/ui/Card";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { ErrorRetryBanner } from "@/components/ui/ErrorRetryBanner";
import { CardSkeletonGrid } from "@/components/ui/CardSkeletonGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { useRemoteData } from "@/hooks/useRemoteData";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { ProjectsResponseSchema, type ValidatedProjectsResponse } from "@/lib/schemas";

function ProjectsContent() {
  const [active, setActive] = useState<string>("All");

  const initialData: ValidatedProjectsResponse = useMemo(
    () => ({
      success: true,
      projects: fallbackProjects,
      categories: fallbackCategories,
      count: fallbackProjects.length,
      fallback: true,
    }),
    [],
  );

  const { data, loading, error, refetch } = useRemoteData<ValidatedProjectsResponse>(
    "/api/projects",
    {
      schema: ProjectsResponseSchema,
      fallbackData: initialData,
    },
  );

  const projects = data?.projects ?? fallbackProjects;
  const categories = data?.categories ?? fallbackCategories;

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active, projects],
  );

  const categoryOptions = ["All", ...categories] as const;

  return (
    <Section id="work" className="border-t border-border">
      <Reveal>
        <SectionHeading
          eyebrow="Work"
          title="Projects and experiments"
          subtitle="Software, prototypes, and open source repositories fetched live from GitHub."
        />
      </Reveal>

      <Reveal delay={0.1} className="mt-8">
        <FilterTabs
          options={categoryOptions}
          active={active}
          onChange={setActive}
          ariaLabel="Filter projects by category"
        />
      </Reveal>

      {error && !projects.length && (
        <ErrorRetryBanner
          message="Failed to load projects from GitHub."
          onRetry={refetch}
        />
      )}

      {loading && !projects.length ? (
        <CardSkeletonGrid count={3} />
      ) : filtered.length === 0 ? (
        <EmptyState message={`Nothing to show in ${active} yet. The next experiment is underway.`} />
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.04}>
              <Card interactive className="flex h-full flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold tracking-widest text-accent uppercase">
                      {project.category}
                    </span>
                    {project.stars !== undefined && project.stars > 0 && (
                      <span className="inline-flex items-center gap-1 text-xs text-muted">
                        <Star size={12} className="fill-accent text-accent" />
                        {project.stars}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 font-serif text-xl font-semibold text-foreground">
                    {project.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 5).map((technology) => (
                      <span
                        key={technology}
                        className="rounded border border-border bg-surface/80 px-2 py-0.5 text-[0.7rem] text-muted"
                      >
                        {technology}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="rounded border border-border bg-surface/80 px-2 py-0.5 text-[0.7rem] text-muted">
                        +{project.technologies.length - 5}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/50 text-sm">
                  {project.href && (
                    <ExternalLink
                      href={project.href}
                      className="flex items-center gap-1.5 font-medium text-foreground transition-colors hover:text-signal"
                    >
                      <Code size={14} /> View on GitHub
                    </ExternalLink>
                  )}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}

export function Projects() {
  return (
    <ErrorBoundary fallbackTitle="Projects Feed Unavailable">
      <ProjectsContent />
    </ErrorBoundary>
  );
}
