"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import {
  IconCircleDot,
  IconMapPin,
  IconStack2,
  IconBriefcase,
  IconWifi,
  IconShieldCheck,
  IconBolt,
} from "@tabler/icons-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const STACK = ["TypeScript", "React", "Next.js", "Node", "Postgres"];

const FLOATING_BADGES = [
  { key: "noATS", icon: IconShieldCheck, offsetX: "-10%", offsetY: "8%" },
  { key: "humanReview", icon: IconBolt, offsetX: "78%", offsetY: "32%" },
  { key: "free", icon: IconCircleDot, offsetX: "-8%", offsetY: "62%" },
] as const;

export function TalentProfileCard() {
  const t = useTranslations("Talent.card");
  const reduceMotion = useReducedMotion();

  const containerTransition = reduceMotion
    ? { duration: 0 }
    : { staggerChildren: 0.07, delayChildren: 0.25 };

  const itemTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.55, ease: EASE };

  const floatTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 6, repeat: Infinity, ease: "easeInOut" as const };

  return (
    <motion.div
      className="relative mx-auto w-full max-w-md"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: EASE }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
    >
      {FLOATING_BADGES.map((badge) => {
        const Icon = badge.icon;
        return (
          <motion.div
            key={badge.key}
            className="absolute z-20 hidden lg:flex"
            style={{ left: badge.offsetX, top: badge.offsetY }}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6, ease: EASE }}
          >
            <motion.div
              animate={
                reduceMotion
                  ? {}
                  : {
                      y: [0, -6, 0],
                    }
              }
              transition={floatTransition}
            >
              <div className="flex items-center gap-1.5 rounded-full border border-foreground/10 bg-background/95 px-3 py-1.5 text-xs font-medium text-foreground shadow-lg shadow-foreground/5 backdrop-blur">
                <Icon size={14} stroke={1.75} className="text-primary" />
                {t(`badges.${badge.key}` as const)}
              </div>
            </motion.div>
          </motion.div>
        );
      })}

      <motion.div
        className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-background p-6 shadow-xl shadow-foreground/4 lg:p-7"
        animate={
          reduceMotion
            ? {}
            : {
                boxShadow: [
                  "0 20px 60px -20px rgba(47,52,54,0.08)",
                  "0 25px 70px -20px rgba(132,192,191,0.18)",
                  "0 20px 60px -20px rgba(47,52,54,0.08)",
                ],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="flex items-start gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: containerTransition },
          }}
        >
          <motion.div
            className="relative shrink-0"
            variants={{
              hidden: { opacity: 0, scale: 0.85 },
              show: { opacity: 1, scale: 1 },
            }}
            transition={itemTransition}
          >
            <div className="absolute -inset-1 rounded-full bg-linear-to-br from-primary via-primary/40 to-foreground/20 opacity-70 blur-md" />
            <motion.div
              className="absolute -inset-1 rounded-full bg-linear-to-tr from-primary/0 via-primary/30 to-foreground/30"
              animate={reduceMotion ? {} : { rotate: 360 }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ padding: 2 }}
            />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-primary to-foreground text-xl font-semibold text-background ring-2 ring-background">
              AR
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-background">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-background" />
              </span>
            </span>
          </motion.div>

          <motion.div
            className="flex min-w-0 flex-1 flex-col"
            variants={{
              hidden: { opacity: 0, x: -8 },
              show: { opacity: 1, x: 0 },
            }}
            transition={itemTransition}
          >
            <div className="flex items-center gap-2">
              <h3 className="truncate text-lg font-semibold text-foreground">
                Ana Ramírez
              </h3>
            </div>
            <p className="text-sm text-muted">{t("role")}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
              <span className="inline-flex items-center gap-1">
                <IconBriefcase size={12} stroke={1.75} />
                {t("level")} · {t("experience")}
              </span>
              <span className="inline-flex items-center gap-1">
                <IconWifi size={12} stroke={1.75} />
                {t("mode")}
              </span>
              <span className="inline-flex items-center gap-1">
                <IconMapPin size={12} stroke={1.75} />
                {t("location")}
              </span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-2"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
        >
          <span className="flex h-2 w-2">
            <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-medium text-emerald-700">
            {t("statusOpen")}
          </span>
        </motion.div>

        <motion.div
          className="mt-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <div className="mb-2.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted">
            <IconStack2 size={14} stroke={1.75} />
            {t("stack")}
          </div>
          <motion.div
            className="flex flex-wrap gap-1.5"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.04, delayChildren: 0.75 },
              },
            }}
          >
            {STACK.map((tech) => (
              <motion.span
                key={tech}
                className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs font-medium text-muted transition hover:border-primary/50 hover:bg-primary/15"
                variants={{
                  hidden: { opacity: 0, y: 8, scale: 0.9 },
                  show: { opacity: 1, y: 0, scale: 1 },
                }}
                whileHover={reduceMotion ? undefined : { y: -2 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-6 grid grid-cols-3 gap-2 border-t border-foreground/8 pt-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1, delayChildren: 0.85 } },
          }}
        >
          {[
            { value: 47, label: t("stats.views") },
            { value: 6, label: t("stats.messages") },
            { value: "4.9", label: t("stats.rating") },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center"
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="text-xl font-semibold tabular-nums text-foreground lg:text-2xl">
                {stat.value}
              </div>
              <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted sm:text-xs">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute -inset-x-8 -bottom-8 -z-10 h-40 rounded-[3rem] bg-linear-to-t from-primary/15 via-primary/5 to-transparent blur-2xl"
      />
    </motion.div>
  );
}
