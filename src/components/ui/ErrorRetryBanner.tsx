import { RefreshCw } from "lucide-react";

interface ErrorRetryBannerProps {
  message?: string;
  onRetry: () => void;
  className?: string;
}

/**
 * Reusable banner displaying error state with a retry action button.
 */
export function ErrorRetryBanner({
  message = "Failed to load data from remote feed.",
  onRetry,
  className = "mt-12",
}: ErrorRetryBannerProps) {
  return (
    <div className={`border border-border bg-surface p-6 ${className}`}>
      <p className="text-sm text-signal">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-3 inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foreground hover:border-signal"
      >
        <RefreshCw size={13} /> Retry Loading
      </button>
    </div>
  );
}
