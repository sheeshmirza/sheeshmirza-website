//Reviewed

import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Sheesh Mirza about software, AI, startups, collaborations, and thoughtful conversations.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Sheesh Mirza",
    description:
      "Start a conversation about software, AI, startups, collaborations, or ideas.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return <Contact />;
}