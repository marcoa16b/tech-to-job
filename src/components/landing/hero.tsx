import { useTranslations } from "next-intl";
import {
  IconBrandDiscordFilled,
  IconSparkles,
  IconArrowDown,
} from "@tabler/icons-react";
import { Link } from "@/i18n/navigation";
import { HeroBackground } from "./hero-background";
import { HeroDecorator } from "./hero-decorator";

export function Hero() {
  const t = useTranslations("Hero");

  const headline = t("headline");
  const highlight = t("headlineHighlight");
  const tokens = headline.split(/(\s+)/);
  const highlightWords = highlight.toLowerCase().split(/\s+/).filter(Boolean);

  type Word = { text: string; highlight: boolean };
const words: Word[] = [];

tokens.forEach((token) => {
  const isSpace = /^\s+$/.test(token);
  if (isSpace) {
    words.push({ text: token, highlight: false });
    return;
  }
  const normalized = token.toLowerCase().replace(/[¿?¡!.,]/g, "");
  const matches = highlightWords.includes(normalized);
  words.push({ text: token, highlight: matches });
});

  return (
    <section className="hero-animate relative isolate overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-16 lg:min-h-[calc(100vh-4rem)] lg:pt-24 lg:pb-20">
      <HeroBackground />
      <HeroDecorator />

      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 lg:gap-7">
        <span className="hero-stagger-1 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-muted backdrop-blur">
          <IconSparkles size={14} stroke={1.75} className="text-primary" />
          {t("eyebrow")}
        </span>

        <h1 className="max-w-4xl text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
          {words.map((token, i) => {
            const { highlight: isHighlight } = token;
            if (/^\s+$/.test(token.text)) {
              return <span key={`s-${i}`}>{token.text}</span>;
            }
            return (
              <span key={`w-${i}`} className="inline-block">
                {isHighlight ? (
                  <span className="relative inline-block text-primary">
                    {token.text}
                    <span
                      aria-hidden="true"
                      className="hero-stagger-4 absolute -bottom-1 left-0 h-0.75 w-full origin-left rounded-full bg-primary"
                    />
                  </span>
                ) : (
                  token.text
                )}
              </span>
            );
          })}
        </h1>

        <p className="hero-stagger-2 max-w-2xl text-balance text-base leading-relaxed text-muted sm:text-lg lg:text-xl">
          {t("subtitle")}
        </p>

        <div className="hero-stagger-3 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
          <a
            href="https://discord.gg/h9FFgKdkRd"
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-foreground px-7 text-base font-semibold text-background shadow-lg shadow-foreground/10 transition hover:scale-[1.02] hover:shadow-xl hover:shadow-foreground/15 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <IconBrandDiscordFilled size={20} stroke={0} fill="currentColor" />
            {t("cta")}
          </a>

          <Link
            href="/#como-funciona"
            className="group inline-flex h-14 items-center justify-center gap-1.5 rounded-full px-5 text-sm font-medium text-muted transition hover:text-foreground"
          >
            {t("ctaSecondary")}
            <IconArrowDown
              size={16}
              stroke={1.75}
              className="transition group-hover:translate-y-0.5"
            />
          </Link>
        </div>

        <div className="hero-stagger-4 mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.2em] text-muted sm:text-sm">
          <span>{t("trust.devs")}</span>
          <span aria-hidden="true">·</span>
          <span>{t("trust.companies")}</span>
          <span aria-hidden="true">·</span>
          <span>{t("trust.lang")}</span>
        </div>
      </div>
    </section>
  );
}