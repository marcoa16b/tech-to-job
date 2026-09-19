"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { IconBrandDiscordFilled, IconHash } from "@tabler/icons-react";

const EASE = [0.22, 1, 0.36, 1] as const;

type ChannelKey =
  | "frontend"
  | "backend"
  | "devops"
  | "data"
  | "mobile"
  | "qa"
  | "ai"
  | "startups";

export function NetworkingSection() {
  const t = useTranslations("Networking");
  const reduceMotion = useReducedMotion();

  const channels: ChannelKey[] = [
    "frontend",
    "backend",
    "devops",
    "data",
    "mobile",
    "qa",
    "ai",
    "startups",
  ];

  const itemTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: EASE };

  const title = t("title");
  const highlight = t("titleHighlight");

  const highlightIdx = title.toLowerCase().indexOf(highlight.toLowerCase());
  const before = highlightIdx >= 0 ? title.slice(0, highlightIdx) : title;
  const after =
    highlightIdx >= 0 ? title.slice(highlightIdx + highlight.length) : "";

  return (
    <section
      id="networking"
      className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 70% 30%, color-mix(in oklch, var(--primary) 10%, transparent), transparent 60%), radial-gradient(ellipse 50% 50% at 20% 80%, color-mix(in oklch, var(--primary) 8%, transparent), transparent 60%)",
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
            className="mx-auto mt-5 max-w-2xl text-balance text-base leading-relaxed text-foreground/70 sm:text-lg lg:text-xl"
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
          className="mt-12 lg:mt-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
          }}
        >
          <div className="mb-4 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-wider text-foreground/55">
            <IconHash size={14} stroke={1.75} />
            {t("channels.label")}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {channels.map((channel) => (
              <motion.span
                key={channel}
                className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-background/80 px-3 py-1.5 text-sm font-medium text-foreground/85 backdrop-blur transition hover:border-primary/40 hover:bg-primary/5"
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: EASE }}
                whileHover={reduceMotion ? undefined : { y: -2 }}
              >
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {t(`channels.${channel}` as const)}
              </motion.span>
            ))}
          </div>
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
            className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-foreground px-7 text-base font-semibold text-background shadow-lg shadow-foreground/10 transition hover:scale-[1.02] hover:shadow-xl hover:shadow-foreground/15 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <IconBrandDiscordFilled size={20} stroke={0} fill="currentColor" />
            {t("cta")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
