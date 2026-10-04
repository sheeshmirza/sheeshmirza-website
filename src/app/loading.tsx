export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-12 animate-pulse">
      <div className="h-4 w-28 bg-border/60 rounded" />
      <div className="mt-6 h-12 w-3/4 max-w-2xl bg-border/60 rounded" />
      <div className="mt-4 h-6 w-1/2 max-w-xl bg-border/40 rounded" />
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 border border-border bg-surface/50 p-6 rounded" />
        ))}
      </div>
    </div>
  );
}
