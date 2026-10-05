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
