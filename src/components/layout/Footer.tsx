import Link from "next/link";
import { site, socialLinks, topicLinks } from "@/data/site-config";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { SocialIcon } from "@/components/ui/SocialIcon";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/50 py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 font-serif text-xl font-bold tracking-tight text-foreground"
            >
              <span
                aria-hidden="true"
                className="flex h-7 w-7 items-center justify-center bg-foreground text-xs text-background"
              >
                S
              </span>
              <span>{site.name}</span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              Software Development Engineer at Freecharge, MCA candidate at Chandigarh University, writer, and creator. Exploring software engineering, system design, practical AI, startups, and human behavior.
            </p>
            <p className="text-xs text-muted">
              Built with Next.js, TypeScript, Tailwind CSS. Zero dummy data. Powered by live data sync.
            </p>
          </div>

          {/* Priority Pillars */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Core Topics
            </p>
            <ul className="space-y-2 text-sm text-muted">
              {topicLinks.slice(0, 5).map((t) => (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    className="transition-colors hover:text-signal"
                  >
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Explore
            </p>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="/about" className="transition-colors hover:text-signal">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/projects" className="transition-colors hover:text-signal">
                  GitHub Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-signal">
                  Articles & Essays
                </Link>
              </li>
              <li>
                <Link href="/videos" className="transition-colors hover:text-signal">
                  YouTube Videos
                </Link>
              </li>
              <li>
                <Link href="/press" className="transition-colors hover:text-signal">
                  Press Kit & Bio
                </Link>
              </li>
              <li>
                <Link href="/media" className="transition-colors hover:text-signal">
                  Media Profiles
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-signal">
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Profiles */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Connect
            </p>
            <ul className="space-y-2 text-sm text-muted">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <ExternalLink
                    href={s.href}
                    className="inline-flex items-center gap-2 transition-colors hover:text-signal"
                  >
                    <SocialIcon platform={s.label} size={14} />
                    <span>{s.label}</span>
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted sm:flex-row">
          <p>© {currentYear} {site.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/robots.txt" className="hover:text-foreground">
              Robots.txt
            </Link>
            <Link href="/sitemap.xml" className="hover:text-foreground">
              Sitemap
            </Link>
            <Link href="/llms.txt" className="hover:text-foreground">
              LLMs.txt
            </Link>
            <Link href="/press" className="hover:text-foreground">
              Press
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
