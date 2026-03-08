import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/config";
import { getAllSlugs } from "@/lib/series";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllSlugs();

  return locales.flatMap((locale) => [
    {
      url: `${siteUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    ...slugs.map((slug) => ({
      url: `${siteUrl}/${locale}/series/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${siteUrl}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
  ]);
}
