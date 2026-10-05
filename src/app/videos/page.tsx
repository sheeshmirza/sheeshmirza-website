import type { Metadata } from "next";
import { Videos } from "@/components/sections/Videos";
import { videos } from "@/data/videos";
import { site } from "@/data/site-config";
import { JsonLd } from "@/components/ui/JsonLd";
import { createCollectionSchema, createBreadcrumbSchema } from "@/lib/seo-schema";

export const metadata: Metadata = {
  title: "Videos & Conversations: AI, Startups & Software Engineering",
  description:
    "Video essays and unfiltered conversations by Sheesh Mirza on Artificial Intelligence, AI businesses, software engineering, startups, and human behavior.",
  alternates: { canonical: "/videos" },
  openGraph: {
    title: "Videos by Sheesh Mirza | Sheesh Unfiltered",
    description:
      "Deep-dive video essays exploring AI businesses, software architectures, startups, and making useful ideas tangible.",
    url: `${site.url}/videos`,
    type: "website",
  },
};

const jsonLd = [
  createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Videos & Conversations", path: "/videos" },
  ]),
  createCollectionSchema({
    name: "Videos & Conversations by Sheesh Mirza",
    description: metadata.description as string,
    path: "/videos",
    items: videos.map((video, idx) => ({
      "@type": "VideoObject",
      position: idx + 1,
      name: video.title,
      description: video.description,
      thumbnailUrl: [video.thumbnail || `${site.url}/og-image.png`],
      uploadDate: new Date(video.date).toISOString().split("T")[0] || video.date,
      contentUrl: video.href,
      embedUrl: `https://www.youtube.com/embed/${video.slug}`,
      author: {
        "@type": "Person",
        name: site.name,
        url: site.url,
      },
      publisher: {
        "@type": "Person",
        name: site.name,
      },
    })),
  }),
];

export default function VideosPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <Videos />
    </>
  );
}
