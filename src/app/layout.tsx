import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OfflineIndicator } from "@/components/ui/OfflineIndicator";
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
  icons: {
    icon: "/icon.svg",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  keywords: [
    // Priority Tier 1: Engineering, AI & Automation
    "Software Engineering & System Designing",
    "Software Engineering",
    "System Design",
    "Distributed Systems",
    "Backend Architecture",
    "API Design",
    "High Concurrency",
    "Artificial Intelligence & Machine Learning",
    "AI Engineering",
    "Large Language Models",
    "LLMs",
    "AI Agents",
    "Agentic AI",
    "Model Context Protocol",
    "MCP",
    "Automation and Intelligent Systems",
    "Intelligent Automation",
    "Autonomous Systems",
    // Priority Tier 2: Entrepreneurship, Startups & Innovation
    "Entrepreneurship",
    "Problems & Solutions",
    "Startups & Business",
    "Innovation & Growth",
    "Product Validation",
    "Building in Public",
    "Venture Building",
    // Priority Tier 3: Human Psychology & Behavior
    "Human Psychology",
    "Behavior and Habits",
    "Consumer Behavior",
    "Decision Making",
    "Cognitive Biases",
    "Mental Models",
    // Personal Brand
    "Sheesh Mirza",
    "Sheesh Unfiltered",
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
    locale: "en_US",
    images: [
      {
        url: `${site.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Sheesh Mirza — Software Engineering & System Designing, Artificial Intelligence, Startups & Psychology",
      },
      {
        url: site.avatar,
        width: 512,
        height: 512,
        alt: "Sheesh Mirza",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    creator: "@SheeshUnfiltered",
    site: "@sheeshmirza",
    images: [`${site.url}/og-image.png`],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: "Sheesh Mirza",
  givenName: "Sheesh",
  familyName: "Mirza",
  url: site.url,
  image: `${site.url}/og-image.png`,
  jobTitle: "Software Engineer & AI Systems Architect",
  description: site.description,
  worksFor: {
    "@type": "Organization",
    name: "FreeCharge",
  },
  sameAs: socialLinks.map((s) => s.href),
  knowsAbout: [
    "Software Engineering & System Designing",
    "Artificial Intelligence & Machine Learning",
    "Automation and Intelligent Systems",
    "Distributed Systems & Cloud Architecture",
    "Model Context Protocol (MCP)",
    "AI Agents & Agentic Workflows",
    "Entrepreneurship & Problem Discovery",
    "Startups & Business Innovation",
    "Growth & Distribution Strategy",
    "Human Psychology",
    "Behavior and Habits",
    "Consumer Decision Making",
  ],
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": site.url,
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: "Sheesh Mirza",
  url: site.url,
  description: site.description,
  publisher: { "@id": `${site.url}/#person` },
  inLanguage: "en-US",
  potentialAction: {
    "@type": "SearchAction",
    target: `${site.url}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-foreground focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-background focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-signal"
        >
          Skip to main content
        </a>
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
              "@graph": [personJsonLd, websiteJsonLd],
            }),
          }}
        />
        <ThemeProvider>
          <Navbar />
          <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <Footer />
          <OfflineIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
