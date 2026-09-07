type FilterTabsProps<T extends string> = {
  options: readonly T[];
  active: T;
  onChange: (option: T) => void;
  variant?: "accent" | "signal";
};

export function FilterTabs<T extends string>({
  options,
  active,
  onChange,
  variant = "accent",
}: FilterTabsProps<T>) {
  const activeClass =
    variant === "signal"
      ? "border-foreground bg-foreground text-background"
      : "border-accent bg-accent text-accent-foreground";
  const inactiveClass =
    variant === "signal"
      ? "border-border text-muted hover:border-signal hover:text-signal"
      : "border-border text-muted hover:border-accent hover:text-accent";

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
            active === option
              ? activeClass
              : inactiveClass
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}