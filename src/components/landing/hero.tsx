"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import {
  IconBrandDiscordFilled,
  IconSparkles,
  IconArrowDown,
} from "@tabler/icons-react";
import { Link } from "@/i18n/navigation";
import { HeroBackground } from "./hero-background";
import { HeroDecorator } from "./hero-decorator";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const t = useTranslations("Hero");
  const reduceMotion = useReducedMotion();

  const headline = t("headline");
  const highlight = t("headlineHighlight");
  const tokens = headline.split(/(\s+)/);
  const highlightWords = highlight.toLowerCase().split(/\s+/).filter(Boolean);

  const words = tokens.reduce<
    { text: string; highlight: boolean; cursor: number }[]
  >((acc, token) => {
    const lastCursor = acc.length > 0 ? acc[acc.length - 1].cursor : 0;
    const isSpace = /^\s+$/.test(token);
    if (isSpace) {
      acc.push({ text: token, highlight: false, cursor: lastCursor });
      return acc;
    }
    const normalized = token.toLowerCase().replace(/[¿?¡!.,]/g, "");
    const matches =
      lastCursor < highlightWords.length &&
      highlightWords[lastCursor] === normalized;
    acc.push({
      text: token,
      highlight: matches,
      cursor: matches ? lastCursor + 1 : lastCursor,
    });
    return acc;
  }, []);

  const wordTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.55, ease: EASE };

  const fadeUp = (delay: number) =>
    reduceMotion ? { duration: 0 } : { duration: 0.6, delay, ease: EASE };

  return (
    <section className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-28 lg:min-h-[calc(100vh-4rem)] lg:pt-40 lg:pb-32">
      <HeroBackground />
      <HeroDecorator />

      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fadeUp(0)}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-foreground/80 backdrop-blur">
            <IconSparkles size={14} stroke={1.75} className="text-primary" />
            {t("eyebrow")}
          </span>
        </motion.div>

        <h1 className="max-w-4xl text-balance text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
          {words.map((token, i) => {
            const { highlight: isHighlight } = token;
            if (/^\s+$/.test(token.text)) {
              return <span key={`s-${i}`}>{token.text}</span>;
            }
            return (
              <motion.span
                key={`w-${i}`}
                className="inline-block"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  ...wordTransition,
                  delay: reduceMotion ? 0 : 0.15 + i * 0.04,
                }}
              >
                {isHighlight ? (
                  <span className="relative inline-block text-primary">
                    {token.text}
                    <motion.span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-primary"
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { duration: 0.5, delay: 0.15 + i * 0.04 + 0.3 }
                      }
                    />
                  </span>
                ) : (
                  token.text
                )}
              </motion.span>
            );
          })}
        </h1>

        <motion.p
          className="max-w-2xl text-balance text-lg leading-relaxed text-foreground/70 sm:text-xl lg:text-2xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fadeUp(0.6)}
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fadeUp(0.8)}
        >
          <a
            href="https://discord.gg/h9FFgKdkRd"
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-foreground px-7 text-base font-semibold text-background shadow-lg shadow-foreground/10 transition hover:scale-[1.02] hover:shadow-xl hover:shadow-foreground/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <IconBrandDiscordFilled size={20} stroke={0} fill="currentColor" />
            {t("cta")}
          </a>

          <Link
            href="/#como-funciona"
            className="group inline-flex h-14 items-center justify-center gap-1.5 rounded-full px-5 text-sm font-medium text-foreground/70 transition hover:text-foreground"
          >
            {t("ctaSecondary")}
            <IconArrowDown
              size={16}
              stroke={1.75}
              className="transition group-hover:translate-y-0.5"
            />
          </Link>
        </motion.div>

        <motion.div
          className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.2em] text-foreground/45 sm:text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={fadeUp(1)}
        >
          <span>{t("trust.devs")}</span>
          <span aria-hidden="true">·</span>
          <span>{t("trust.companies")}</span>
          <span aria-hidden="true">·</span>
          <span>{t("trust.lang")}</span>
        </motion.div>
      </div>
    </section>
  );
}
