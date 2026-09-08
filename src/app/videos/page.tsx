//Reviewed

import type { Metadata } from "next";
import { Videos } from "@/components/sections/Videos";

export const metadata: Metadata = {
  title: "Videos on Technology, Startups, and Human Behavior",
  description:
    "Watch Sheesh Mirza explore technology, AI, startups, business, and the human side of building.",
  alternates: { canonical: "/videos" },
  openGraph: {
    title: "Videos by Sheesh Mirza",
    description:
      "Conversations and experiments on technology, startups, business, and the human side of building.",
    url: "/videos",
    type: "website",
  },
};

export default function VideosPage() {
  return <Videos />;
}
