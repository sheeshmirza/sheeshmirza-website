import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Section className="py-24 sm:py-32 text-center">
      <div className="mx-auto max-w-md">
        <p className="text-xs font-semibold uppercase tracking-widest text-signal">
          404 Error
        </p>
        <h1 className="mt-4 font-serif text-5xl sm:text-6xl text-foreground font-semibold">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          The page you are looking for doesn&apos;t exist, was moved, or is temporarily unavailable.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-foreground px-5 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-1"
          >
            <ArrowLeft size={16} /> Return to Homepage
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-signal hover:text-signal"
          >
            Contact Sheesh
          </Link>
        </div>
      </div>
    </Section>
  );
}
