import type { Metadata } from "next";
import { TopicPage } from "@/components/sections/TopicPage";

export const metadata: Metadata = {
  title: "Sheesh Unfiltered — YouTube by Sheesh Mirza",
  description:
    "Sheesh Unfiltered is the YouTube media property of Sheesh Mirza covering technology, AI, career, business, experiments, stories, and unfiltered conversations.",
  alternates: { canonical: "/sheesh-unfiltered" },
};

export default function SheeshUnfilteredPage() {
  return (
    <TopicPage
      eyebrow="Media Property"
      title="Sheesh Unfiltered — No Filter. Just Sheesh."
      description="Sheesh Unfiltered is the video and conversation layer of the Sheesh Mirza personal brand. It is where technology, AI, career, business, experiments, opinions, and real stories get explored without pretending everything is perfect."
      points={[
        "Technology: software engineering, AI, tools, systems, and the technology decisions worth understanding.",
        "Experiments: things I test, build, measure, keep, discard, or learn from.",
        "Career: engineering growth, interviews, skills, learning systems, and the realities between the milestones.",
        "Business: products, entrepreneurship, opportunities, mistakes, and lessons from trying to build.",
        "Unfiltered: opinions, stories, conversations, travel, creator life, and whatever is actually worth talking about.",
      ]}
      related={[
        { label: "Watch on YouTube", href: "https://www.youtube.com/@Sheesh.Unfiltered" },
        { label: "Sheesh Mirza", href: "/sheesh-mirza" },
        { label: "Projects", href: "/projects" },
        { label: "Writing", href: "/blog" },
      ]}
    />
  );
}
