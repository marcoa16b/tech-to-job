"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import {
  IconBrandDiscordFilled,
  IconMessageCircle,
  IconUserCircle,
  IconBuilding,
  IconBriefcase,
  IconCircleCheck,
} from "@tabler/icons-react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type StepKey = "one" | "two" | "threeA" | "threeB" | "four";

type CardProps = {
  stepKey: StepKey;
  icon: ReactNode;
  className?: string;
  tone?: "default" | "accent";
  size?: "sm" | "md" | "lg";
};

function StepCard({
  stepKey,
  icon,
  className = "",
  tone = "default",
  size = "md",
}: CardProps) {
  const t = useTranslations("HowItWorks.steps");
  const label = t(`${stepKey}.label` as const);
  const title = t(`${stepKey}.title` as const);
  const description = t(`${stepKey}.description` as const);

  const sizeStyles =
    size === "lg" ? "p-8 lg:p-10" : size === "sm" ? "p-5" : "p-6 lg:p-7";

  const titleSize =
    size === "lg"
      ? "text-2xl lg:text-3xl"
      : size === "sm"
        ? "text-lg"
        : "text-xl lg:text-2xl";

  const descriptionSize =
    size === "lg" ? "text-base lg:text-lg" : "text-sm lg:text-base";

  const toneStyles =
    tone === "accent"
      ? "bg-foreground text-background border-foreground"
      : "bg-background text-foreground border-foreground/10 hover:border-primary/40";

  return (
    <article
      className={`group relative flex flex-col gap-3 overflow-hidden rounded-3xl border transition-colors ${sizeStyles} ${toneStyles} ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wider uppercase ${
            tone === "accent"
              ? "bg-background/10 text-background"
              : "bg-foreground/5 text-muted"
          }`}
        >
          {label}
        </span>
        <span
          aria-hidden="true"
          className={`shrink-0 ${tone === "accent" ? "text-background" : "text-primary"}`}
        >
          {icon}
        </span>
      </div>

      <h3
        className={`font-semibold tracking-tight ${titleSize} ${
          tone === "accent" ? "text-background" : "text-foreground"
        }`}
      >
        {title}
      </h3>

      <p
        className={`leading-relaxed ${descriptionSize} ${
          tone === "accent" ? "text-background" : "text-muted"
        }`}
      >
        {description}
      </p>
    </article>
  );
}

export function HowItWorks() {
  const t = useTranslations("HowItWorks");
  const reduceMotion = useReducedMotion();

  const containerTransition = reduceMotion
    ? { duration: 0 }
    : { staggerChildren: 0.08, delayChildren: 0.05 };

  const itemTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.55, ease: EASE };

  return (
    <section
      id="como-funciona"
      className="relative scroll-mt-24 py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={itemTransition}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-muted">
            {t("eyebrow")}
          </span>
          <h2 className="mt-5 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-base leading-relaxed text-muted sm:text-lg lg:text-xl">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-6 lg:grid-rows-[auto_auto_auto] lg:gap-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          variants={{
            hidden: {},
            show: { transition: containerTransition },
          }}
        >
          <motion.div
            className="lg:col-span-3 lg:row-span-2"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            transition={itemTransition}
          >
            <StepCard
              stepKey="one"
              icon={
                <IconBrandDiscordFilled
                  size={36}
                  stroke={0}
                  fill="currentColor"
                />
              }
              tone="accent"
              size="lg"
              className="h-full"
            />
          </motion.div>

          <motion.div
            className="lg:col-span-3"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            transition={itemTransition}
          >
            <StepCard
              stepKey="two"
              icon={<IconMessageCircle size={28} stroke={1.5} />}
              className="h-full"
            />
          </motion.div>

          <motion.div
            className="lg:col-span-3"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            transition={itemTransition}
          >
            <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
              <StepCard
                stepKey="threeA"
                icon={<IconUserCircle size={24} stroke={1.5} />}
                size="sm"
                className="h-full"
              />
              <StepCard
                stepKey="threeB"
                icon={<IconBuilding size={24} stroke={1.5} />}
                size="sm"
                className="h-full"
              />
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-3"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            transition={itemTransition}
          >
            <StepCard
              stepKey="four"
              icon={<IconBriefcase size={28} stroke={1.5} />}
              className="h-full"
            />
          </motion.div>

          <motion.aside
            className="lg:col-span-3"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            transition={itemTransition}
          >
            <div className="flex h-full items-center gap-4 rounded-3xl border border-primary/20 bg-primary/5 p-6 lg:p-7">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <IconCircleCheck size={24} stroke={1.75} />
              </span>
              <div className="flex flex-col">
                <span className="font-semibold text-foreground">
                  {t("highlight.title")}
                </span>
                <span className="text-sm leading-relaxed text-muted">
                  {t("highlight.description")}
                </span>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      </div>
    </section>
  );
}
