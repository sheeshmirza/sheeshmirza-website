import type { CSSProperties, ReactNode } from "react";

type TopicPillProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function TopicPill({ children, className, style }: TopicPillProps) {
  return (
    <span
      style={style}
      className={`inline-block rounded-full border border-border bg-surface px-5 py-2 text-sm text-foreground transition-colors hover:border-accent hover:text-accent ${className ?? ""}`}
    >
      {children}
    </span>
  );
}