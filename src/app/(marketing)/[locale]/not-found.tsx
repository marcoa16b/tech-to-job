import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DEFAULT_LOCALE } from "@/lib/seo";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "404",
};

export default async function NotFoundPage() {
  const locale = await getLocale();

  const t = await getTranslations("NotFound");
  const homeHref = locale === DEFAULT_LOCALE ? "/" : `/${locale}`;

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col items-start justify-center gap-6 px-6 py-16">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-muted">
        404
      </span>
      <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
        {t("title")}
      </h1>
      <p className="max-w-xl text-balance text-base leading-relaxed text-muted sm:text-lg">
        {t("description")}
      </p>
      <Link
        href={homeHref}
        className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-sm font-semibold text-background shadow-lg shadow-foreground/10 transition hover:scale-[1.02] hover:shadow-xl hover:shadow-foreground/15"
      >
        {t("cta")}
      </Link>
    </div>
  );
}