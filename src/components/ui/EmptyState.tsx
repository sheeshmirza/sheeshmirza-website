interface EmptyStateProps {
  message?: string;
  className?: string;
}

/**
 * Reusable component for displaying zero-result or placeholder messages.
 */
export function EmptyState({
  message = "No items available at this time.",
  className = "mt-12 text-sm text-muted",
}: EmptyStateProps) {
  return <p className={className}>{message}</p>;
}
