import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { site, socialLinks } from "@/data/site-config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s | Sheesh Mirza",
  },
  description: site.description,
  alternates: { canonical: "/" },
  applicationName: "Sheesh Mirza",
  authors: [{ name: "Sheesh Mirza", url: site.url }],
  creator: "Sheesh Mirza",
  publisher: "Sheesh Mirza",
  keywords: [
    "Sheesh Mirza",
    "Sheesh Unfiltered",
    "software engineer",
    "software engineering",
    "AI engineer",
    "artificial intelligence",
    "AI agents",
    "LLMs",
    "system design",
    "product building",
    "entrepreneurship",
    "building in public",
  ],
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: "Sheesh Mirza",
    type: "website",
    locale: "en_IN",
    images: [{ url: site.image, width: 512, height: 512, alt: "Sheesh Mirza" }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    creator: "@SheeshUnfiltered",
    images: [site.image],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: "Sheesh Mirza",
  url: site.url,
  image: site.image,
  jobTitle: "Software Engineer, AI Builder & Creator",
  description: site.description,
  sameAs: socialLinks.map((s) => s.href),
  knowsAbout: [
    "Software Engineering",
    "Artificial Intelligence",
    "AI Engineering",
    "Large Language Models",
    "AI Agents",
    "System Design",
    "Distributed Systems",
    "Product Building",
    "Entrepreneurship",
    "Building in Public",
    "Content Creation",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: "Sheesh Mirza",
  url: site.url,
  description: site.description,
  publisher: { "@id": `${site.url}/#person` },
  inLanguage: "en-IN",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => { try { const theme = localStorage.getItem("theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); document.documentElement.classList.toggle("dark", theme === "dark"); } catch {} })();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                personJsonLd,
                websiteJsonLd,
              ],
            }),
          }}
        />
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
