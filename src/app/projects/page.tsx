import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects & Open Source Work",
  description:
    "Selected public repositories, experiments, AI work, and software projects associated with Sheesh Mirza.",
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
          A growing public record of things I build, study, experiment with,
          and learn from. This page links directly to public GitHub repositories
          so the work can be inspected instead of merely described.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="group flex h-full flex-col border border-border bg-surface p-7 transition-transform hover:-translate-y-1"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-signal">
              {project.category}
            </p>
            <h2 className="mt-4 font-serif text-2xl leading-snug">
              {project.name}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {project.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="border border-border px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.08em] text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
            <span className="mt-auto flex items-center gap-1 pt-8 text-sm font-semibold transition-colors group-hover:text-signal">
              View repository <ArrowUpRight size={14} />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
