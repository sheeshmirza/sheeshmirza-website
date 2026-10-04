"use client";

import { useState } from "react";
import { calendlyUrl, socialLinks } from "@/data/site-config";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { ContactFormSchema, type ContactFormData } from "@/lib/schemas";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const lastSubmitTime = useState<{ current: number }>({ current: 0 })[0];

  const linkedIn = socialLinks.find((link) => link.label === "LinkedIn");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setErrorMessage("");

    // Bot honeypot trap
    if (honeypot) {
      setStatus("sent");
      return;
    }

    // Client-side rate limiting (4 seconds between submissions)
    const now = Date.now();
    if (now - lastSubmitTime.current < 4000) {
      setErrorMessage("Please wait a few seconds before submitting again.");
      return;
    }
    lastSubmitTime.current = now;

    // 1. Client-side Zod validation
    const validation = ContactFormSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of validation.error.issues) {
        const field = issue.path[0] as string;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });

      if (res.ok) {
        setStatus("sent");
      } else {
        // Fallback for static exports where server POST handler is unavailable
        const mailtoUrl = `mailto:sheesh@smirza.in?subject=${encodeURIComponent(
          validation.data.subject,
        )}&body=${encodeURIComponent(
          `Name: ${validation.data.name}\nEmail: ${validation.data.email}\n\n${validation.data.message}`,
        )}`;
        window.location.href = mailtoUrl;
        setStatus("sent");
      }
    } catch {
      // In case of offline or static hosting without API routes, open mailto directly
      const mailtoUrl = `mailto:sheesh@smirza.in?subject=${encodeURIComponent(
        validation.data.subject,
      )}&body=${encodeURIComponent(
        `Name: ${validation.data.name}\nEmail: ${validation.data.email}\n\n${validation.data.message}`,
      )}`;
      window.location.href = mailtoUrl;
      setStatus("sent");
    }
  }

  return (
    <Section id="contact" className="border-t border-border">
      <Reveal>
        <SectionHeading
          eyebrow="Contact"
          title="Let's talk before the answer is obvious."
          subtitle="Building something interesting, exploring AI, or thinking through a startup? Send a question, an idea, or simply a note to start the conversation."
          level="h1"
        />
      </Reveal>

      <Reveal delay={0.1} className="mt-10 grid max-w-5xl gap-10 lg:grid-cols-[1fr_0.42fr]">
        {status === "sent" ? (
          <div className="border border-border bg-surface p-8 text-foreground">
            <div className="flex items-center gap-3 text-signal">
              <CheckCircle2 size={24} />
              <h3 className="font-serif text-xl font-semibold">Message Dispatched</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Thank you for reaching out, {formData.name || "friend"}. Your message has been prepared and queued. I&apos;ll get back to you promptly.
            </p>
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setFormData({ name: "", email: "", subject: "", message: "" });
              }}
              className="mt-6 inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foreground hover:border-signal"
            >
              Send another note
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Hidden Bot Honeypot */}
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              aria-hidden="true"
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="sr-only hidden"
            />

            {errorMessage && (
              <div className="flex items-center gap-2 border border-signal/30 bg-signal/10 p-3 text-xs text-signal">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
                  Your Name <span className="text-signal">*</span>
                </label>
                <input
                  id="contact-name"
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Ada Lovelace"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`w-full border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-signal ${
                    errors.name ? "border-signal" : "border-border"
                  }`}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-xs text-signal">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
                  Email Address <span className="text-signal">*</span>
                </label>
                <input
                  id="contact-email"
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`w-full border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-signal ${
                    errors.email ? "border-signal" : "border-border"
                  }`}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-signal">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="contact-subject" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
                Subject <span className="text-signal">*</span>
              </label>
              <input
                id="contact-subject"
                required
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Topic or idea you'd like to discuss"
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                className={`w-full border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-signal ${
                  errors.subject ? "border-signal" : "border-border"
                }`}
              />
              {errors.subject && (
                <p id="subject-error" className="mt-1 text-xs text-signal">
                  {errors.subject}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
                Message <span className="text-signal">*</span>
              </label>
              <textarea
                id="contact-message"
                required
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Share your question, proposal, or feedback..."
                rows={5}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`w-full border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-signal ${
                  errors.message ? "border-signal" : "border-border"
                }`}
              />
              {errors.message && (
                <p id="message-error" className="mt-1 text-xs text-signal">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center gap-2 bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
              <ExternalLink
                href={linkedIn?.href}
                className="border-b-2 border-signal px-1 py-3 text-sm font-semibold text-foreground hover:text-signal"
              >
                Connect on LinkedIn
              </ExternalLink>
              <ExternalLink
                href={calendlyUrl}
                className="border-b-2 border-accent px-1 py-3 text-sm font-semibold text-foreground hover:text-accent"
              >
                Book a 30-minute call
              </ExternalLink>
            </div>
          </form>
        )}

        <aside className="border-l-2 border-signal pl-5 text-sm leading-relaxed text-muted lg:pt-2">
          <p className="font-semibold uppercase tracking-[0.18em] text-foreground">Open door</p>
          <p className="mt-4">Ideas, collaborations, thoughtful disagreement, and practical questions are all welcome.</p>
          <div className="mt-6 border-t border-border pt-4 text-xs text-muted">
            <p>Direct communication: <span className="font-mono text-foreground">sheesh@smirza.in</span></p>
          </div>
        </aside>
      </Reveal>
    </Section>
  );
}
