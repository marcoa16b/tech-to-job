import type { MetadataRoute } from "next";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_LANGUAGE_MAP,
  absoluteUrl,
  localePath,
} from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const buildAlternates = () =>
    Object.fromEntries(
      LOCALES.map((l) => [
        l === DEFAULT_LOCALE ? "es-ES" : LOCALE_LANGUAGE_MAP[l],
        absoluteUrl(localePath(l)),
      ]),
    );

  return [
    {
      url: absoluteUrl(localePath(DEFAULT_LOCALE)),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: buildAlternates(),
      },
    },
    ...LOCALES.filter((locale) => locale !== DEFAULT_LOCALE).map((locale) => ({
      url: absoluteUrl(localePath(locale)),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: {
        languages: buildAlternates(),
      },
    })),
  ];
}