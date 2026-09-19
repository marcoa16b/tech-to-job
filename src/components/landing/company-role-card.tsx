"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import {
  IconStack2,
  IconShieldCheck,
  IconBolt,
  IconCircleDot,
  IconTrendingUp,
} from "@tabler/icons-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const STACK = ["TypeScript", "Node.js", "PostgreSQL", "AWS", "Redis"];

const CANDIDATES = [
  { initials: "MV", color: "from-amber-400 to-rose-500" },
  { initials: "LC", color: "from-sky-400 to-indigo-500" },
  { initials: "JG", color: "from-emerald-400 to-teal-500" },
  { initials: "+5", color: "from-foreground/60 to-foreground/40" },
] as const;

const FLOATING_BADGES = [
  { key: "context", icon: IconShieldCheck, offsetX: "-8%", offsetY: "10%" },
  { key: "noATS", icon: IconBolt, offsetX: "76%", offsetY: "30%" },
  { key: "free", icon: IconCircleDot, offsetX: "-6%", offsetY: "60%" },
] as const;

export function CompanyRoleCard() {
  const t = useTranslations("Companies.card");
  const reduceMotion = useReducedMotion();

  const floatTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 7, repeat: Infinity, ease: "easeInOut" as const };

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
              animate={reduceMotion ? {} : { y: [0, -6, 0] }}
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
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="flex items-center gap-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.08, delayChildren: 0.25 },
            },
          }}
        >
          <motion.div
            className="relative shrink-0"
            variants={{
              hidden: { opacity: 0, scale: 0.85 },
              show: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <motion.div
              className="absolute -inset-1 rounded-2xl bg-linear-to-br from-primary via-primary/40 to-foreground/20 opacity-70 blur-md"
              animate={
                reduceMotion
                  ? {}
                  : {
                      opacity: [0.5, 0.85, 0.5],
                    }
              }
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-foreground to-foreground/70 text-base font-bold text-background ring-2 ring-background">
              NX
            </div>
          </motion.div>

          <motion.div
            className="min-w-0 flex-1"
            variants={{
              hidden: { opacity: 0, x: -8 },
              show: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <div className="flex items-center gap-1.5">
              <span className="truncate text-sm font-semibold text-foreground">
                {t("company")}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                <IconCircleDot size={10} stroke={2} />
                {t("verified")}
              </span>
            </div>
            <p className="text-xs text-foreground/55">{t("type")}</p>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-5"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.5, ease: EASE }}
        >
          <h3 className="text-2xl font-semibold tracking-tight text-foreground lg:text-[1.7rem]">
            {t("role")}
          </h3>
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-foreground/5 px-2.5 py-1 text-sm font-medium text-foreground/80">
            <IconTrendingUp size={14} stroke={1.75} className="text-primary" />
            {t("compensation")}
          </div>
        </motion.div>

        <motion.div
          className="mt-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <div className="mb-2.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-foreground/50">
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
                className="rounded-full border border-foreground/15 bg-foreground/3 px-2.5 py-1 text-xs font-medium text-foreground/85 transition hover:border-primary/40 hover:bg-primary/10"
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
          className="mt-6 border-t border-foreground/8 pt-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.9 } },
          }}
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-foreground/50">
              {t("candidates")}
            </span>
            <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-semibold text-primary">
              12
            </span>
          </div>

          <div className="flex items-center -space-x-2">
            {CANDIDATES.map((c, i) => (
              <motion.div
                key={i}
                className={`flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br ${c.color} text-xs font-semibold text-background ring-2 ring-background`}
                variants={{
                  hidden: { opacity: 0, scale: 0.5, x: -10 },
                  show: { opacity: 1, scale: 1, x: 0 },
                }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                {c.initials}
              </motion.div>
            ))}
          </div>

          <motion.ul
            className="mt-4 space-y-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.1, delayChildren: 1.1 },
              },
            }}
          >
            {(["one", "two", "three"] as const).map((key) => (
              <motion.li
                key={key}
                className="flex items-center gap-2 text-xs text-foreground/70"
                variants={{
                  hidden: { opacity: 0, x: -8 },
                  show: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <IconCircleDot size={10} stroke={2} />
                </span>
                {t(`candidatesList.${key}` as const)}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute -inset-x-8 -bottom-8 -z-10 h-40 rounded-[3rem] bg-linear-to-t from-primary/15 via-primary/5 to-transparent blur-2xl"
      />
    </motion.div>
  );
}
