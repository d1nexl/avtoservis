import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";

const siteUrl = "https://at-autoservis-cb.example";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  }));
}
