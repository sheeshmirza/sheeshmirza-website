//Reviewed

import { FeaturedWriting } from "@/components/sections/FeaturedWriting";

export default function BlogPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 pb-2 pt-16 sm:px-10 lg:px-12 lg:pt-24">
        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          Essays and field notes on technology, startups, psychology, and the
          work of making useful things.
        </p>
      </div>
      <FeaturedWriting />
    </>
  );
}
