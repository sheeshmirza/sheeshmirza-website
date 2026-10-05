import type { Metadata } from "next";
import { ArrowUpRight, Play, Code, Briefcase, BookOpen, Camera, Calendar } from "lucide-react";
import { site, calendlyUrl } from "@/data/site-config";
import { ExternalLink } from "@/components/ui/ExternalLink";

export const metadata: Metadata = {
  title: "Media & Official Profiles",
  description:
    "Official channels, social media profiles, and creator outlets for Sheesh Mirza across YouTube, GitHub, LinkedIn, Medium, and Instagram.",
  alternates: { canonical: "/media" },
  openGraph: {
    title: "Media & Official Profiles | Sheesh Mirza",
    description:
      "Connect with Sheesh Mirza on YouTube (@Sheesh.Unfiltered), GitHub, LinkedIn, Medium, and Instagram.",
    url: `${site.url}/media`,
    type: "profile",
  },
};

const channels = [
  {
    name: "YouTube — Sheesh Unfiltered",
    handle: "@Sheesh.Unfiltered",
    href: "https://www.youtube.com/@Sheesh.Unfiltered",
    icon: Play,
    category: "Video & Podcasts",
    description:
      "Deep, unfiltered conversations on software engineering, AI engineering, system architecture, startup experiments, and personal lessons from building in public.",
  },
  {
    name: "Medium",
    handle: "@sheeshmirza",
    href: "https://sheeshmirza.medium.com",
    icon: BookOpen,
    category: "Technical Writing",
    description:
      "Long-form essays breaking down complex tech into plain English: Model Context Protocol (MCP), distributed messaging, cognitive psychology, and backend design.",
  },
  {
    name: "GitHub",
    handle: "sheeshmirza",
    href: "https://github.com/sheeshmirza",
    icon: Code,
    category: "Code & Repositories",
    description:
      "Open-source code repositories, AI agent prototypes, system design templates, automation scripts, and full-stack software projects.",
  },
  {
    name: "LinkedIn",
    handle: "sheeshmirza",
    href: "https://www.linkedin.com/in/sheeshmirza",
    icon: Briefcase,
    category: "Professional Network",
    description:
      "Regular insights on engineering trade-offs, financial backend architecture, career development, and real-world system design lessons.",
  },
  {
    name: "Instagram",
    handle: "_mir_zey",
    href: "https://www.instagram.com/_mir_zey/",
    icon: Camera,
    category: "Behind The Scenes",
    description:
      "The visual side of the journey: daily building habits, reading notes, creative experiments, and behind-the-scenes glimpses into tech life.",
  },
  {
    name: "Calendly — 30-Min Consultation",
    handle: "sheesh-mirza",
    href: calendlyUrl,
    icon: Calendar,
    category: "Direct Mentorship",
    description:
      "Schedule a focused 1-on-1 discussion about software architecture, career transitions into tech, AI engineering, or startup problem discovery.",
  },
];

export default function MediaPage() {
  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "Media & Official Profiles of Sheesh Mirza",
    url: `${site.url}/media`,
    mainEntity: {
      "@type": "Person",
      name: "Sheesh Mirza",
      url: site.url,
      sameAs: [
        "https://www.youtube.com/@Sheesh.Unfiltered",
        "https://sheeshmirza.medium.com",
        "https://github.com/sheeshmirza",
        "https://www.linkedin.com/in/sheeshmirza",
        "https://www.instagram.com/_mir_zey/",
      ],
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: site.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Media & Profiles",
        item: `${site.url}/media`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([profileJsonLd, breadcrumbJsonLd]),
        }}
      />

      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
        <header className="max-w-3xl">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-muted">
            Official Channels & Social Presence
          </p>
          <h1 className="mt-5 font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-foreground sm:text-7xl">
            Find Sheesh Mirza across the web.
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-muted">
            All official public channels and content outlets verified and gathered in one place.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Whether you prefer long-form technical essays, video discussions, open-source code, or direct conversations, here is where you can find my work.
          </p>
        </header>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel) => {
            const IconComponent = channel.icon;
            return (
              <ExternalLink
                key={channel.name}
                href={channel.href}
                className="group flex flex-col justify-between border border-border bg-surface p-7 transition-[transform,border-color] hover:-translate-y-1 hover:border-signal"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center border border-border bg-background text-foreground transition-colors group-hover:border-signal group-hover:text-signal">
                      <IconComponent size={20} />
                    </span>
                    <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-accent">
                      {channel.category}
                    </span>
                  </div>

                  <h2 className="mt-5 font-serif text-xl font-semibold text-foreground">
                    {channel.name}
                  </h2>
                  <p className="mt-1 text-xs font-mono text-muted">{channel.handle}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {channel.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1.5 border-t border-border pt-4 text-xs font-semibold text-foreground transition-colors group-hover:text-signal">
                  <span>Visit Channel</span>
                  <ArrowUpRight size={14} />
                </div>
              </ExternalLink>
            );
          })}
        </div>
      </section>
    </>
  );
}
