"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { IconArrowRight, IconClock } from "@tabler/icons-react";

const EASE = [0.22, 1, 0.36, 1] as const;

type CategoryTone = "tournaments" | "community" | "industry";

const CATEGORY_STYLES: Record<CategoryTone, string> = {
  tournaments: "bg-primary/15 text-primary border-primary/25",
  community: "bg-foreground/[0.06] text-foreground/85 border-foreground/15",
  industry: "bg-foreground/[0.04] text-foreground/65 border-foreground/10",
};

function categoryTone(category: string): CategoryTone {
  const c = category.toLowerCase();
  if (c.includes("torneo") || c.includes("tournament")) return "tournaments";
  if (c.includes("comunidad") || c.includes("community")) return "community";
  return "industry";
}

export function NewsSection() {
  const t = useTranslations("News");
  const reduceMotion = useReducedMotion();

  const itemTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: EASE };

  return (
    <section
      id="noticias"
      className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 30%, color-mix(in oklch, var(--primary) 8%, transparent), transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="mx-auto max-w-3xl"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15%" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
          }}
        >
          <motion.span
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-foreground/80"
            variants={{
              hidden: { opacity: 0, y: 8 },
              show: { opacity: 1, y: 0 },
            }}
            transition={itemTransition}
          >
            {t("eyebrow")}
          </motion.span>

          <motion.h2
            className="mt-5 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]"
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0 },
            }}
            transition={itemTransition}
          >
            {t("title")}
          </motion.h2>

          <motion.p
            className="mt-5 max-w-2xl text-balance text-base leading-relaxed text-foreground/70 sm:text-lg lg:text-xl"
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 },
            }}
            transition={itemTransition}
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          <motion.article
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-background p-6 transition-colors hover:border-primary/40 lg:col-span-2 lg:row-span-2 lg:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.65, ease: EASE }}
            whileHover={reduceMotion ? undefined : { y: -4 }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary/10 blur-3xl transition-opacity group-hover:opacity-100"
            />

            <div className="relative flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider ${CATEGORY_STYLES[categoryTone(t("featured.category"))]}`}
              >
                {t("featured.category")}
              </span>
              <time className="text-xs text-foreground/55">
                {t("featured.date")}
              </time>
              <span className="inline-flex items-center gap-1 text-xs text-foreground/55">
                <IconClock size={12} stroke={1.75} />
                {t("featured.readTime")}
              </span>
            </div>

            <h3 className="relative mt-6 text-balance text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              {t("featured.title")}
            </h3>

            <p className="relative mt-4 max-w-2xl text-base leading-relaxed text-foreground/70 lg:text-lg">
              {t("featured.excerpt")}
            </p>

            <div className="relative mt-auto flex items-center justify-between gap-3 pt-8">
              <a
                href="#"
                className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
              >
                {t("readMore")}
                <IconArrowRight
                  size={16}
                  stroke={1.75}
                  className="transition group-hover/link:translate-x-0.5"
                />
              </a>
            </div>
          </motion.article>

          {(["one", "two"] as const).map((key, i) => (
            <motion.article
              key={key}
              className="group flex flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-background p-6 transition-colors hover:border-primary/40"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: EASE }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider ${CATEGORY_STYLES[categoryTone(t(`items.${key}.category` as const))]}`}
                >
                  {t(`items.${key}.category` as const)}
                </span>
                <time className="text-xs text-foreground/55">
                  {t(`items.${key}.date` as const)}
                </time>
              </div>

              <h3 className="mt-4 text-balance text-lg font-semibold leading-tight tracking-tight text-foreground lg:text-xl">
                {t(`items.${key}.title` as const)}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-foreground/65 lg:text-base">
                {t(`items.${key}.excerpt` as const)}
              </p>

              <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                <a
                  href="#"
                  className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/75 transition hover:text-primary"
                >
                  {t("readMore")}
                  <IconArrowRight
                    size={14}
                    stroke={1.75}
                    className="transition group-hover/link:translate-x-0.5"
                  />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
