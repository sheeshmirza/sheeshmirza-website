import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { site } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Contact & Collaborations — Sheesh Mirza",
  description:
    "Get in touch with Sheesh Mirza regarding software engineering, system design architectures, AI systems, startup collaborations, or speaking engagements.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Sheesh Mirza | Engineering & Collaborations",
    description:
      "Direct communication channel for engineering discussions, AI systems, and startup collaborations.",
    url: `${site.url}/contact`,
    type: "website",
  },
};

export default function ContactPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Sheesh Mirza",
    description: metadata.description,
    url: `${site.url}/contact`,
    mainEntity: {
      "@type": "Person",
      name: "Sheesh Mirza",
      url: site.url,
      email: "sheesh@smirza.in",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactJsonLd),
        }}
      />
      <Contact />
    </>
  );
}