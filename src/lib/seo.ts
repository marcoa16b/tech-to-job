import { routing } from "@/i18n/routing";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://tech-to-job.vercel.app";

export const SITE_NAME = "TechToJob";

export const SOCIALS = {
  discord: "https://discord.gg/h9FFgKdkRd",
  linkedin: "https://www.linkedin.com/company/techtojob/",
  x: "https://x.com/techtojob",
  instagram: "https://www.instagram.com/techtojob",
} as const;

export const LOCALES = routing.locales;
export const LOCALE_LANGUAGE_MAP = {
  es: "es-ES",
  en: "en-ES",
} as const;

export const DEFAULT_LOCALE = routing.defaultLocale;

export function localePath(locale: string, path = ""): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized}`;
}

export function absoluteUrl(path = ""): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}