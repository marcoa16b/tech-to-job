"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { InfiniteMarquee } from "./infinite-marquee";
import { TestimonialCard } from "./testimonial-card";

const EASE = [0.22, 1, 0.36, 1] as const;

type TestimonialKey =
  "one" | "two" | "three" | "four" | "five" | "six" | "seven" | "eight";

const TESTIMONIALS: { key: TestimonialKey; initials: string }[] = [
  { key: "one", initials: "AM" },
  { key: "two", initials: "DH" },
  { key: "three", initials: "PR" },
  { key: "four", initials: "SO" },
  { key: "five", initials: "LC" },
  { key: "six", initials: "CV" },
  { key: "seven", initials: "IS" },
  { key: "eight", initials: "MG" },
];

export function TestimonialsSection() {
  const t = useTranslations("Testimonials");
  const reduceMotion = useReducedMotion();

  const itemTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: EASE };

  const rowOneKeys = TESTIMONIALS.filter((_, i) => i % 2 === 0);
  const rowTwoKeys = TESTIMONIALS.filter((_, i) => i % 2 === 1);

  return (
    <section
      id="testimonials"
      className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, color-mix(in oklch, var(--primary) 8%, transparent), transparent 60%)",
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
            {t("title")}
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
      </div>

      <motion.div
        className="mt-14 lg:mt-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.8 }}
      >
        <InfiniteMarquee direction="left" speed={45} className="py-2">
          {rowOneKeys.map(({ key, initials }) => (
            <TestimonialCard
              key={`r1-${key}`}
              initials={initials}
              name={t(`items.${key}.name` as const)}
              role={t(`items.${key}.role` as const)}
              quote={t(`items.${key}.quote` as const)}
            />
          ))}
        </InfiniteMarquee>

        <div className="h-3" />

        <InfiniteMarquee direction="right" speed={55} className="py-2">
          {rowTwoKeys.map(({ key, initials }) => (
            <TestimonialCard
              key={`r2-${key}`}
              initials={initials}
              name={t(`items.${key}.name` as const)}
              role={t(`items.${key}.role` as const)}
              quote={t(`items.${key}.quote` as const)}
            />
          ))}
        </InfiniteMarquee>
      </motion.div>
    </section>
  );
}
