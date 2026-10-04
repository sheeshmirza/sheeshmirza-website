"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-[#f3f1e9] p-6 text-[#18221d]">
        <div className="max-w-md border border-[#d0d4c6] bg-[#fbfaf6] p-8 text-center shadow-lg">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#be3b1f]/15 text-[#be3b1f]">
            <AlertCircle size={24} />
          </div>
          <h1 className="mt-5 text-2xl font-bold">Critical Application Error</h1>
          <p className="mt-3 text-sm text-[#4f5851]">
            A critical system fault occurred at the root layout level.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center gap-2 bg-[#18221d] px-5 py-2.5 text-sm font-semibold text-[#f3f1e9]"
            >
              <RefreshCw size={15} /> Reload Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
