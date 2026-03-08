import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/config";
import { getAllSlugs } from "@/lib/series";

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllSlugs();

  const seriesEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${siteUrl}/series/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    ...seriesEntries,
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
