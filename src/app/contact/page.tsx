import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { site } from "@/data/site-config";
import { JsonLd } from "@/components/ui/JsonLd";
import { createContactSchema, createBreadcrumbSchema } from "@/lib/seo-schema";

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

const jsonLd = [
  createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Contact & Collaborations", path: "/contact" },
  ]),
  createContactSchema({
    description: metadata.description as string,
  }),
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <Contact />
    </>
  );
}