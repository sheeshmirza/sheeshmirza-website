import { site, socialLinks } from "@/data/site-config";

export interface BreadcrumbItem {
  name: string;
  path?: string;
}

/**
 * Generates Schema.org BreadcrumbList structured data.
 */
export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path ? `${site.url}${item.path.startsWith("/") ? item.path : `/${item.path}`}` : site.url,
    })),
  };
}

export interface TechArticleParams {
  headline: string;
  description: string;
  path: string;
}

/**
 * Generates Schema.org TechArticle structured data.
 */
export function createTechArticleSchema({ headline, description, path }: TechArticleParams) {
  const url = `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline,
    description,
    author: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Person",
      name: site.name,
    },
    url,
    inLanguage: "en-US",
  };
}

export interface ProfileSchemaParams {
  name?: string;
  alternateName?: string | string[];
  description?: string;
  path?: string;
  jobTitle?: string;
  company?: string;
  sameAs?: string[];
}

/**
 * Generates Schema.org ProfilePage structured data.
 */
export function createProfileSchema({
  name = site.name,
  alternateName = "Sheesh",
  description = site.description,
  path = "",
  jobTitle = "Software Development Engineer",
  company = "Freecharge Payment Technologies",
  sameAs = socialLinks.map((s) => s.href),
}: ProfileSchemaParams = {}) {
  const url = `${site.url}${path ? (path.startsWith("/") ? path : `/${path}`) : ""}`;
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${name} — Official Profile`,
    url,
    mainEntity: {
      "@type": "Person",
      name,
      alternateName,
      jobTitle,
      worksFor: {
        "@type": "Organization",
        name: company,
      },
      url: site.url,
      sameAs,
      description,
    },
  };
}

export interface SeriesSchemaParams {
  name: string;
  description: string;
  url: string;
}

/**
 * Generates Schema.org CreativeWorkSeries structured data.
 */
export function createSeriesSchema({ name, description, url }: SeriesSchemaParams) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWorkSeries",
    name,
    description,
    author: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
    url,
  };
}

export interface CollectionSchemaParams {
  name: string;
  description: string;
  path: string;
  items: unknown[];
}

/**
 * Generates Schema.org CollectionPage structured data with an ItemList.
 */
export function createCollectionSchema({
  name,
  description,
  path,
  items,
}: CollectionSchemaParams) {
  const url = `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items,
    },
  };
}

export interface ContactSchemaParams {
  name?: string;
  description?: string;
  path?: string;
  email?: string;
}

/**
 * Generates Schema.org ContactPage structured data.
 */
export function createContactSchema({
  name = `Contact ${site.name}`,
  description = "Get in touch with Sheesh Mirza.",
  path = "/contact",
  email = "sheesh@smirza.in",
}: ContactSchemaParams = {}) {
  const url = `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name,
    description,
    url,
    mainEntity: {
      "@type": "Person",
      name: site.name,
      url: site.url,
      email,
    },
  };
}

export interface WebPageSchemaParams {
  name: string;
  description: string;
  path?: string;
  about?: string[];
  parts?: { name: string; path: string }[];
}

/**
 * Generates Schema.org WebPage structured data with topics and page components.
 */
export function createWebPageSchema({
  name,
  description,
  path = "",
  about = [],
  parts = [],
}: WebPageSchemaParams) {
  const url = `${site.url}${path ? (path.startsWith("/") ? path : `/${path}`) : ""}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    url,
    name,
    description,
    about: about.map((topic) => ({ "@type": "Thing", name: topic })),
    hasPart: parts.map((part) => ({
      "@type": "WebPage",
      name: part.name,
      url: `${site.url}${part.path.startsWith("/") ? part.path : `/${part.path}`}`,
    })),
  };
}


