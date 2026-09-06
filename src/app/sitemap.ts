import type { MetadataRoute } from "next";
import { site } from "@/data/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/blog", "/videos", "/contact"];

  return routes.map((route, index) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: index === 0 ? 1 : 0.8,
  }));
}
