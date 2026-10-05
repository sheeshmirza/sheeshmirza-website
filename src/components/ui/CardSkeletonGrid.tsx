interface CardSkeletonGridProps {
  count?: number;
  hasThumbnail?: boolean;
  className?: string;
}

/**
 * Reusable animated pulse skeleton grid for loading card lists.
 */
export function CardSkeletonGrid({
  count = 3,
  hasThumbnail = false,
  className = "mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
}: CardSkeletonGridProps) {
  return (
    <div className={className} aria-label="Loading content...">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="border border-border bg-surface p-6 animate-pulse"
        >
          {hasThumbnail && (
            <div className="-mx-6 -mt-6 mb-6 aspect-video bg-border/40" />
          )}
          <div className="h-3 w-16 rounded bg-border/60" />
          <div className="mt-4 h-6 w-3/4 rounded bg-border/60" />
          <div className="mt-4 h-14 w-full rounded bg-border/30" />
        </div>
      ))}
    </div>
  );
}
