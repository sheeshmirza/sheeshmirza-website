import type { Metadata } from "next";
import { FeaturedWriting } from "@/components/sections/FeaturedWriting";
import { Thinking } from "@/components/sections/Thinking";

export const metadata: Metadata = {
  title: "Writing on Technology, Business, and Psychology",
  description:
    "Essays and field notes by Sheesh Mirza on technology, startups, psychology, business, and making useful things.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Writing by Sheesh Mirza",
    description:
      "Essays and field notes on technology, startups, psychology, and the work of making useful things.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <>
      <FeaturedWriting />
      <Thinking />
    </>
  );
}
