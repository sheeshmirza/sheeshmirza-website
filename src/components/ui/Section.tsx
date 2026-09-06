export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 py-16 sm:py-24 lg:py-28 ${className ?? ""}`}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">{children}</div>
    </section>
  );
}
