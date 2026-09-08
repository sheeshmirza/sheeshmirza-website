import { experience, education } from "@/data/experience";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function ExperienceEducation() {
  return (
    <Section className="border-t border-border">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <SectionHeading
              eyebrow="Career"
              title="Experience"
              subtitle="A record of the roles that shaped how I build and think."
            />
          </Reveal>
          {experience.length === 0 ? (
            <p className="mt-8 text-muted">Roles will be listed here.</p>
          ) : (
            <div className="mt-8 space-y-8 border-l border-border pl-6">
              {experience.map((role) => (
                <div key={`${role.company}-${role.role}`}>
                  <p className="text-xs font-semibold tracking-widest text-accent uppercase">
                    {role.dates}
                  </p>
                  <h3 className="mt-2 font-serif text-xl text-foreground">
                    {role.role} · {role.company}
                  </h3>
                  {!!role.responsibilities?.length && (
                    <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-muted">
                      {role.responsibilities.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  )}
                  {!!role.projects?.length && (
                    <p className="mt-3 text-xs text-muted">
                      <span className="font-medium text-foreground">Key initiatives:</span> {role.projects.join(" · ")}
                    </p>
                  )}
                  {!!role.technologies?.length && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {role.technologies.map((t) => (
                        <span key={t} className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <Reveal>
            <SectionHeading
              eyebrow="Academics"
              title="Education"
              subtitle="The formal foundations behind the practical work."
            />
          </Reveal>
          <div className="mt-8 space-y-8">
            {education.map((entry) => (
              <div key={entry.degree} className="border border-border bg-surface p-6">
                <h3 className="font-serif text-xl text-foreground">{entry.degree}</h3>
                <p className="mt-2 text-sm text-muted">
                  {entry.institution} · {entry.dates}
                </p>
                {entry.cgpa && <p className="mt-1 text-sm text-muted">CGPA: {entry.cgpa}</p>}
                {!!entry.coursework?.length && (
                  <p className="mt-3 text-sm text-muted">
                    Coursework: {entry.coursework.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
