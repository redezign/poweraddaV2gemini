import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://poweradda.com";
  const siteUrl = rawSiteUrl.startsWith('http') ? rawSiteUrl : `https://${rawSiteUrl}`;

  // Base pages
  const staticPages = [
    "",
    "/about",
    "/services",
    "/services/solar",
    "/services/automotive-batteries",
    "/services/inverter-batteries",
    "/services/energy-storage",
    "/services/wind",
    "/vendor",
    "/calculator",
    "/insights",
    "/contact",
    "/request-quote",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route.startsWith("/services") ? 0.8 : route === "/insights" ? 0.7 : 0.5,
  }));

  // Dynamic Blog pages
  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${siteUrl}/insights/${post.slug}`,
    lastModified: new Date(post.publishDate),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
