"use client";

import { useState } from "react";
import { calendlyUrl, socialLinks } from "@/data/site-config";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const linkedIn = socialLinks.find((link) => link.label === "LinkedIn");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire this up to a real form endpoint (e.g. an API route or email service).
    setStatus("sent");
  }

  return (
    <Section id="contact" className="border-t border-border">
      <Reveal>
        <SectionHeading
          eyebrow="Contact"
          title="Bring a good question."
          subtitle="Building something interesting, exploring AI, or thinking about a startup? The best conversations usually begin before the answer is obvious."
        />
      </Reveal>

      <Reveal delay={0.1} className="mt-10 grid max-w-5xl gap-10 lg:grid-cols-[1fr_0.42fr]">
        {status === "sent" ? (
          <p className="border border-border bg-surface p-6 text-foreground">
            Thanks for reaching out. I&apos;ll get back to you soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                required
                name="name"
                placeholder="Name"
                className="border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-signal"
              />
              <input
                required
                type="email"
                name="email"
                placeholder="Email"
                className="border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-signal"
              />
            </div>
            <input
              required
              name="subject"
              placeholder="Subject"
              className="w-full border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-signal"
            />
            <textarea
              required
              name="message"
              placeholder="Message"
              rows={5}
              className="w-full border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-signal"
            />
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                type="submit"
                className="bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-1"
              >
                Send Message
              </button>
              <a
                href={linkedIn?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b-2 border-signal px-1 py-3 text-sm font-semibold text-foreground hover:text-signal"
              >
                Connect on LinkedIn
              </a>
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b-2 border-accent px-1 py-3 text-sm font-semibold text-foreground hover:text-accent"
              >
                Book a 30-minute call
              </a>
            </div>
          </form>
        )}
        <aside className="border-l-2 border-signal pl-5 text-sm leading-relaxed text-muted lg:pt-2">
          <p className="font-semibold uppercase tracking-[0.18em] text-foreground">Open door</p>
          <p className="mt-4">Ideas, collaborations, thoughtful disagreement, and practical questions are all welcome.</p>
        </aside>
      </Reveal>
    </Section>
  );
}
