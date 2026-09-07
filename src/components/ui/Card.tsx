import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
};

export function Card({ children, className, interactive = false }: CardProps) {
  return (
    <div
      className={`border border-border bg-surface ${
        interactive
          ? "transition-[transform,border-color] hover:-translate-y-1 hover:border-signal"
          : ""
      } ${className ?? ""}`}
    >
      {children}
    </div>
  );
}