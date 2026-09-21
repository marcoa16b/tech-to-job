import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import { hasLocale } from "next-intl";
import "@/app/globals.css";
import { routing } from "@/i18n/routing";
import {
  getLocale,
  getMessages,
  getTranslations,
} from "next-intl/server";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { StructuredData } from "@/components/shared/structured-data";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_LANGUAGE_MAP,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  localePath,
} from "@/lib/seo";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0e10" },
  ],
  colorScheme: "light dark",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "LocaleLayout" });
  const tSeo = await getTranslations({ locale, namespace: "Seo" });

  const canonical = absoluteUrl(localePath(locale));

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title"),
      template: `%s | ${SITE_NAME}`,
    },
    description: t("description"),
    applicationName: SITE_NAME,
    keywords: tSeo.raw("keywords") as string[],
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: tSeo("category"),
    classification: tSeo("classification"),
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical,
      languages: {
        ...(Object.fromEntries(
          LOCALES.map((l) => [
            l === DEFAULT_LOCALE ? "es-ES" : LOCALE_LANGUAGE_MAP[l],
            absoluteUrl(localePath(l)),
          ]),
        ) as Record<string, string>),
        "x-default": absoluteUrl(localePath(DEFAULT_LOCALE)),
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: t("title"),
      description: t("description"),
      url: canonical,
      locale: LOCALE_LANGUAGE_MAP[locale as keyof typeof LOCALE_LANGUAGE_MAP],
      alternateLocale: LOCALES.filter((l) => l !== locale).map(
        (l) => LOCALE_LANGUAGE_MAP[l],
      ),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [{ url: absoluteUrl("/icon"), type: "image/png" }],
      apple: [{ url: absoluteUrl("/apple-icon"), type: "image/png" }],
    },
    manifest: absoluteUrl("/manifest.webmanifest"),
  };
}

export default async function LocaleLayout({
  children,
}: LayoutProps<"/[locale]">) {
  const locale = await getLocale();
  const typedLocale = locale as string;

  if (!hasLocale(routing.locales, typedLocale)) {
    notFound();
  }

  const tSeo = await getTranslations({ locale: typedLocale, namespace: "LocaleLayout" });
  const description = tSeo("description");
  const title = tSeo("title");

  const messages = await getMessages();

  return (
    <html lang={typedLocale} className={`${sora.variable} h-full antialiased`}>
      <head>
        <link
          rel="preload"
          as="image"
          href="/poster.webp"
          fetchPriority="high"
          media="(min-width: 1024px)"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <StructuredData
          name={title}
          description={description}
          locale={typedLocale}
        />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
