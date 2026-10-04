"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Section } from "@/components/ui/Section";

import { captureClientError } from "@/lib/telemetry";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    captureClientError(error, { digest: error.digest });
  }, [error]);

  return (
    <Section className="py-24 sm:py-32 text-center">
      <div className="mx-auto max-w-lg border border-border bg-surface p-8 sm:p-12">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-signal/15 text-signal">
          <AlertCircle size={24} />
        </div>
        <h2 className="mt-5 font-serif text-3xl font-semibold text-foreground">
          Something went wrong
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          An unexpected error occurred while rendering this page. You can attempt to reload the component or return to safety.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
          >
            <RefreshCw size={15} /> Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-signal hover:text-signal"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </Section>
  );
}
