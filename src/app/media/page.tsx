import type { Metadata } from "next";
import { TopicPage } from "@/components/sections/TopicPage";

export const metadata: Metadata = {
  title: "Media & Profiles — Sheesh Mirza",
  description:
    "Official links and profiles for Sheesh Mirza across LinkedIn, GitHub, Medium, Instagram, and YouTube.",
  alternates: { canonical: "/media" },
};

export default function MediaPage() {
  return (
    <TopicPage
      eyebrow="Official Profiles"
      title="Find Sheesh Mirza across the web."
      description="These are the main public profiles and media properties used to publish Sheesh Mirza's work, ideas, projects, writing, and creator content."
      points={[
        "LinkedIn: professional writing and ideas on AI, software engineering, product building, and engineering judgment.",
        "GitHub: public repositories, experiments, learning projects, and open-source work.",
        "Medium: longer technical and business writing.",
        "YouTube: Sheesh Unfiltered — conversations, experiments, technology, career, business, and stories.",
        "Instagram: the more visual, personal, and creator-oriented side of the journey."
      ]}
      related={[
        { label: "LinkedIn", href: "https://www.linkedin.com/in/sheeshmirza" },
        { label: "GitHub", href: "https://github.com/sheeshmirza" },
        { label: "Medium", href: "https://sheeshmirza.medium.com" },
        { label: "YouTube", href: "https://www.youtube.com/@Sheesh.Unfiltered" },
      ]}
    />
  );
}
