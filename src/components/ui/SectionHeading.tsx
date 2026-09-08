import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  level = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  level?: "h1" | "h2";
}) {
  const Heading = level;

  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}>
      {eyebrow && (
        <p className="mb-4 flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted">
          <span className="h-2 w-2 bg-signal" aria-hidden />
          {eyebrow}
        </p>
      )}
      <Heading className="font-serif text-4xl leading-[1.02] tracking-[-0.03em] text-foreground sm:text-5xl md:text-6xl">
        {title}
      </Heading>
      {subtitle && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
