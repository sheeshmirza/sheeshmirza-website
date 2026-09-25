import type { MetadataRoute } from "next";
import { site } from "@/data/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/projects",
    "/blog",
    "/videos",
    "/contact",
  ];

  return routes.map((route, index) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/about" || route === "/projects"
          ? 0.9
          : 0.8,
  }));
}
