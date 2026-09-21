"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { IconBrandDiscordFilled, IconArrowRight } from "@tabler/icons-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ClosingSection() {
  const t = useTranslations("Closing");
  const reduceMotion = useReducedMotion();

  const title = t("title");
  const highlight = t("titleHighlight");

  const itemTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.7, ease: EASE };

  const highlightIdx = title.toLowerCase().indexOf(highlight.toLowerCase());
  const before = highlightIdx >= 0 ? title.slice(0, highlightIdx) : title;
  const after =
    highlightIdx >= 0 ? title.slice(highlightIdx + highlight.length) : "";

  return (
    <section className="relative overflow-hidden py-32 sm:py-40 lg:py-48">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, color-mix(in oklch, var(--primary) 14%, transparent), transparent 60%), radial-gradient(ellipse 60% 50% at 20% 80%, color-mix(in oklch, var(--primary) 10%, transparent), transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, color-mix(in oklch, var(--primary) 10%, transparent), transparent 60%)",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
        animate={
          reduceMotion
            ? {}
            : {
                scale: [1, 1.15, 1],
                opacity: [0.6, 1, 0.6],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          className="text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
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
          className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-muted sm:text-lg lg:text-xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ ...itemTransition, delay: 0.15 }}
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ ...itemTransition, delay: 0.3 }}
        >
          <a
            href="https://discord.gg/h9FFgKdkRd"
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-foreground px-8 text-base font-semibold text-background shadow-xl shadow-foreground/20 transition hover:scale-[1.03] hover:shadow-2xl hover:shadow-foreground/25 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <IconBrandDiscordFilled size={20} stroke={0} fill="currentColor" />
            {t("cta")}
            <IconArrowRight
              size={18}
              stroke={1.75}
              className="transition group-hover:translate-x-0.5"
            />
          </a>

          <Link
            href="/#como-funciona"
            className="inline-flex h-14 items-center justify-center gap-1.5 rounded-full px-5 text-sm font-medium text-muted transition hover:text-foreground"
          >
            {t("secondary")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
