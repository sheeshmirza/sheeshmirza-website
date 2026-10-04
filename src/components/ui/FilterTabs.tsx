"use client";

import type { KeyboardEvent } from "react";

type FilterTabsProps<T extends string> = {
  options: readonly T[];
  active: T;
  onChange: (option: T) => void;
  variant?: "accent" | "signal";
  ariaLabel?: string;
};

export function FilterTabs<T extends string>({
  options,
  active,
  onChange,
  variant = "accent",
  ariaLabel = "Filter content",
}: FilterTabsProps<T>) {
  const activeClass =
    variant === "signal"
      ? "border-foreground bg-foreground text-background font-medium"
      : "border-accent bg-accent text-accent-foreground font-medium";
  const inactiveClass =
    variant === "signal"
      ? "border-border text-muted hover:border-signal hover:text-signal"
      : "border-border text-muted hover:border-accent hover:text-accent";

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (index + 1) % options.length;
      onChange(options[nextIndex]);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (index - 1 + options.length) % options.length;
      onChange(options[prevIndex]);
    } else if (e.key === "Home") {
      e.preventDefault();
      onChange(options[0]);
    } else if (e.key === "End") {
      e.preventDefault();
      onChange(options[options.length - 1]);
    }
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="flex flex-wrap gap-2"
    >
      {options.map((option, index) => {
        const isSelected = active === option;
        return (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={isSelected}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onChange(option)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 ${
              isSelected ? activeClass : inactiveClass
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}