import type { Metadata } from "next";
import { ArrowUpRight, Code, GitFork, Star } from "lucide-react";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects & Open Source Work",
  description:
    "Selected public repositories, experiments, AI work, and software projects fetched live from GitHub by Sheesh Mirza.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects by Sheesh Mirza",
    description:
      "Selected public repositories, experiments, AI work, and software projects.",
    url: "/projects",
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-24 lg:px-12">
      <div className="max-w-3xl">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-muted">
          Projects & Open Source
        </p>
        <h1 className="mt-5 font-serif text-5xl leading-[0.98] tracking-[-0.04em] sm:text-7xl">
          Work you can inspect.
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">
          A growing public record of software I build, study, and maintain.
          Every project links directly to its source code on GitHub so the
          architecture, models, and code can be inspected instead of merely described.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full flex-col border border-border bg-surface p-7 transition-all duration-200 hover:-translate-y-1 hover:border-signal"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-signal">
                {project.category}
              </p>
              {project.stars !== undefined && project.stars > 0 && (
                <span className="inline-flex items-center gap-1 text-xs text-muted">
                  <Star size={12} className="fill-accent text-accent" />
                  {project.stars}
                </span>
              )}
            </div>
            <h2 className="mt-4 font-serif text-2xl leading-snug">
              {project.name}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted line-clamp-4">
              {project.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 6).map((tech) => (
                <span
                  key={tech}
                  className="border border-border bg-surface/80 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.08em] text-muted"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 6 && (
                <span className="border border-border bg-surface/80 px-2 py-1 text-[0.68rem] uppercase tracking-[0.08em] text-muted">
                  +{project.technologies.length - 6}
                </span>
              )}
            </div>
            <div className="mt-auto flex items-center justify-between pt-8 border-t border-border/40 text-sm">
              <span className="flex items-center gap-1 font-semibold transition-colors group-hover:text-signal">
                <Code size={14} /> View repository <ArrowUpRight size={14} />
              </span>
              {project.forks !== undefined && project.forks > 0 && (
                <span className="inline-flex items-center gap-1 text-xs text-muted">
                  <GitFork size={12} />
                  {project.forks}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
