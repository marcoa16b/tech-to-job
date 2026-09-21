"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { IconArrowRight } from "@tabler/icons-react";
import { Podium } from "./podium";

const EASE = [0.22, 1, 0.36, 1] as const;

export function TournamentsSection() {
  const t = useTranslations("Tournaments");
  const reduceMotion = useReducedMotion();

  const title = t("title");
  const highlight = t("titleHighlight");

  const itemTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: EASE };

  const highlightIdx = title.toLowerCase().indexOf(highlight.toLowerCase());
  const before = highlightIdx >= 0 ? title.slice(0, highlightIdx) : title;
  const after =
    highlightIdx >= 0 ? title.slice(highlightIdx + highlight.length) : "";

  return (
    <section
      id="torneos"
      className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 30% 20%, color-mix(in oklch, var(--primary) 8%, transparent), transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, color-mix(in oklch, var(--primary) 10%, transparent), transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15%" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
          }}
        >
          <motion.span
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-muted"
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
            {before}
            <span className="relative inline-block text-primary">
              {highlight}
              <motion.span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-0.75 w-full origin-left rounded-full bg-primary"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
              />
            </span>
            {after}
          </motion.h2>

          <motion.p
            className="mx-auto mt-5 max-w-2xl text-balance text-base leading-relaxed text-muted sm:text-lg lg:text-xl"
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 },
            }}
            transition={itemTransition}
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-14 lg:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
        >
          <Podium />
        </motion.div>

        <motion.div
          className="mt-12 flex justify-center lg:mt-16"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
        >
          <Link
            href="https://discord.gg/h9FFgKdkRd"
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-foreground px-7 text-base font-semibold text-background shadow-lg shadow-foreground/10 transition hover:scale-[1.02] hover:shadow-xl hover:shadow-foreground/15 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {t("cta")}
            <IconArrowRight
              size={18}
              stroke={1.75}
              className="transition group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
