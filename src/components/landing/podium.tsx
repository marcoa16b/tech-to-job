"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { IconCrown, IconStarFilled } from "@tabler/icons-react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Finalist = {
  initials: string;
  name: string;
  role: string;
  project: string;
  height: number;
};

const FINALISTS: Finalist[] = [
  {
    initials: "LC",
    name: "Lucía Castillo",
    role: "Mid Frontend",
    project: "Landing con Next 16",
    height: 220,
  },
  {
    initials: "MR",
    name: "Mateo Reyes",
    role: "Junior Full-stack",
    project: "API de torneos",
    height: 160,
  },
  {
    initials: "SO",
    name: "Sara Ortega",
    role: "Senior Backend",
    project: "Dashboard de stats",
    height: 130,
  },
];

function FinalistColumn({
  finalist,
  position,
  delay,
}: {
  finalist: Finalist;
  position: "left" | "center" | "right";
  delay: number;
}) {
  const t = useTranslations("Tournaments.podium");
  const reduceMotion = useReducedMotion();

  const positionLabel =
    position === "center"
      ? t("first")
      : position === "left"
        ? t("second")
        : t("third");

const orderStyles =
    position === "center"
      ? {
          bar: "bg-gradient-to-b from-primary via-primary to-primary/70",
          ring: "ring-primary",
          text: "text-foreground",
          accent: "border-primary/40 bg-primary/[0.04]",
          size: "h-20 w-20 lg:h-24 lg:w-24",
          textSize: "text-lg lg:text-xl",
          lift: -16,
          crown: true,
        }
      : position === "left"
        ? {
            bar: "bg-gradient-to-b from-foreground/25 to-foreground/10",
            ring: "ring-foreground/20",
            text: "text-background",
            accent: "border-foreground/15 bg-foreground/[0.02]",
            size: "h-16 w-16 lg:h-20 lg:w-20",
            textSize: "text-base lg:text-lg",
            lift: -10,
            crown: false,
          }
        : {
            bar: "bg-gradient-to-b from-foreground/20 to-foreground/[0.07]",
            ring: "ring-foreground/15",
            text: "text-background",
            accent: "border-foreground/15 bg-foreground/[0.02]",
            size: "h-16 w-16 lg:h-20 lg:w-20",
            textSize: "text-base lg:text-lg",
            lift: -10,
            crown: false,
          };

  return (
    <div className="flex flex-1 flex-col items-center justify-end">
      <motion.div
        className={`group relative mb-3 flex flex-col items-center rounded-2xl border ${orderStyles.accent} bg-background px-3 py-3 shadow-sm backdrop-blur transition-shadow hover:shadow-md lg:mb-4 lg:px-4 lg:py-4`}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.55, delay: delay + 0.35, ease: EASE }}
        whileHover={reduceMotion ? undefined : { y: orderStyles.lift }}
      >
        {orderStyles.crown && (
          <motion.div
            className="absolute -top-7 left-1/2 -translate-x-1/2 text-primary lg:-top-8"
            initial={{ opacity: 0, y: 10, rotate: -20 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: delay + 0.6,
              ease: EASE,
            }}
            aria-hidden="true"
          >
            <motion.div
              animate={
                reduceMotion
                  ? {}
                  : {
                      y: [0, -3, 0],
                      rotate: [-2, 2, -2],
                    }
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <IconCrown
                size={32}
                stroke={1.5}
                fill="currentColor"
                className="drop-shadow-md"
              />
            </motion.div>
          </motion.div>
        )}

        <div
          className={`relative flex items-center justify-center rounded-full ring-2 ring-offset-2 ring-offset-background ${orderStyles.size} ${orderStyles.ring} ${
            position === "center"
              ? "bg-primary"
              : "bg-foreground"
          } ${orderStyles.text} text-base font-semibold lg:text-lg`}
        >
          <span className="drop-shadow-sm">{finalist.initials}</span>
          {position === "center" && (
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 rounded-full bg-primary/40 blur-md"
            />
          )}
        </div>

        <div className="mt-2.5 text-center lg:mt-3">
          <div className="text-xs font-medium text-foreground lg:text-sm">
            {finalist.name}
          </div>
          <div className="mt-0.5 text-[10px] text-muted lg:text-xs">
            {finalist.role}
          </div>
        </div>

        <div
          className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
            position === "center"
              ? "bg-primary/15 text-primary"
              : "bg-foreground/5 text-muted"
          } lg:text-xs`}
        >
          {position === "center" && (
            <IconStarFilled size={10} stroke={0} className="text-primary" />
          )}
          {positionLabel}
        </div>

        <div className="mt-2 hidden text-center text-[10px] text-muted lg:block lg:text-xs">
          {finalist.project}
        </div>
      </motion.div>

      <div
        className="relative flex w-full items-end justify-center"
        style={{
          height: position === "center" ? 220 : position === "left" ? 170 : 140,
        }}
      >
        <motion.div
          className={`relative w-full overflow-hidden rounded-t-2xl ${orderStyles.bar}`}
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{
            duration: 1.1,
            delay,
            ease: EASE,
          }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-background/40 to-transparent"
          />
          <motion.div
            className="absolute inset-0 opacity-30"
            initial={{ x: "-100%" }}
            animate={reduceMotion ? {} : { x: "100%" }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay + 1.2,
            }}
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
            }}
          />
          {position === "center" && (
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center">
              <span className="text-5xl font-bold text-background lg:text-6xl">
                1
              </span>
            </div>
          )}
          {position === "left" && (
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center">
              <span className="text-3xl font-bold text-background lg:text-4xl">
                2
              </span>
            </div>
          )}
          {position === "right" && (
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center">
              <span className="text-3xl font-bold text-background lg:text-4xl">
                3
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export function Podium() {
  const t = useTranslations("Tournaments");

  return (
    <div className="relative">
      <motion.div
        className="mb-6 text-center"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-background/80 px-3 py-1 text-xs font-medium tracking-wide text-muted backdrop-blur">
          <span className="flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          {t("lastEdition")}
        </span>
      </motion.div>

      <div className="flex items-end justify-center gap-2 sm:gap-4 lg:gap-6">
        <FinalistColumn finalist={FINALISTS[1]} position="left" delay={0.15} />
        <FinalistColumn finalist={FINALISTS[0]} position="center" delay={0} />
        <FinalistColumn finalist={FINALISTS[2]} position="right" delay={0.3} />
      </div>

      <motion.div
        className="mt-10 grid grid-cols-3 gap-3 lg:mt-14 lg:gap-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15%" }}
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.12, delayChildren: 0.7 },
          },
        }}
      >
        {[
          { value: "47", label: t("stats.participants") },
          { value: "31", label: t("stats.submissions") },
          { value: "7", label: t("stats.days") },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            className="rounded-2xl border border-foreground/10 bg-background px-4 py-4 text-center lg:px-6 lg:py-5"
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="text-2xl font-bold tabular-nums text-foreground lg:text-3xl">
              {stat.value}
            </div>
            <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted lg:text-xs">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
