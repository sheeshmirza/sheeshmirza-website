import type { MetadataRoute } from "next";
import { site } from "@/data/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/sheesh-mirza",
    "/about",
    "/projects",
    "/ai-engineering",
    "/software-engineering",
    "/system-design",
    "/entrepreneurship",
    "/building-in-public",
    "/media",
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
        : ["/sheesh-mirza", "/about", "/projects"].includes(route)
          ? 0.9
          : 0.8,
  }));
}
