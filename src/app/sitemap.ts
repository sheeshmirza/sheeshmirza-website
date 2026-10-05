import type { MetadataRoute } from "next";
import { site } from "@/data/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: {
    path: string;
    priority: number;
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  }[] = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    // Priority Tier 1: Engineering, AI & Automation
    { path: "/software-engineering", priority: 0.95, changeFrequency: "weekly" },
    { path: "/system-design", priority: 0.95, changeFrequency: "weekly" },
    { path: "/ai-engineering", priority: 0.95, changeFrequency: "weekly" },
    { path: "/projects", priority: 0.95, changeFrequency: "weekly" },
    // Priority Tier 2: Entrepreneurship, Startups & Content
    { path: "/entrepreneurship", priority: 0.9, changeFrequency: "weekly" },
    { path: "/building-in-public", priority: 0.9, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.9, changeFrequency: "weekly" },
    { path: "/videos", priority: 0.9, changeFrequency: "weekly" },
    // Priority Tier 3: Human Psychology & Brand
    { path: "/psychology", priority: 0.85, changeFrequency: "weekly" },
    { path: "/sheesh-mirza", priority: 0.85, changeFrequency: "monthly" },
    { path: "/about", priority: 0.85, changeFrequency: "monthly" },
    { path: "/sheesh-unfiltered", priority: 0.85, changeFrequency: "weekly" },
    { path: "/press", priority: 0.8, changeFrequency: "monthly" },
    { path: "/media", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  ];

  const now = new Date();

  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
