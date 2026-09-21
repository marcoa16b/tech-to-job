"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";
import { IconMail, IconArrowRight, IconCheck } from "@tabler/icons-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function NewsletterSection() {
  const t = useTranslations("Newsletter");
  const reduceMotion = useReducedMotion();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubmitted(true);
  }

  const itemTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: EASE };

  return (
    <section
      id="newsletter"
      className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, color-mix(in oklch, var(--primary) 10%, transparent), transparent 65%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-15%" }}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.1, delayChildren: 0.05 },
              },
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
              <IconMail size={12} stroke={1.75} />
              {t("eyebrow")}
            </motion.span>

            <motion.h2
              className="mt-5 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]"
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0 },
              }}
              transition={itemTransition}
            >
              {t("title").split(new RegExp(`(${t("titleHighlight")})`, "i"))[0]}
              <span className="relative inline-block text-primary">
                {t("titleHighlight")}
                <motion.span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-0.75 w-full origin-left rounded-full bg-primary"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
                />
              </span>
              {t("title").split(
                new RegExp(`(${t("titleHighlight")})`, "i"),
              )[2] ?? ""}
            </motion.h2>

            <motion.p
              className="mt-5 max-w-xl text-balance text-base leading-relaxed text-muted sm:text-lg lg:text-xl"
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 },
              }}
              transition={itemTransition}
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              className="mt-8"
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0 },
              }}
              transition={itemTransition}
            >
              <AnimatePresence mode="wait" initial={false}>
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-700">
                      <IconCheck size={16} stroke={2} />
                    </span>
                    <span className="text-sm text-muted">
                      Listo. Te escribimos el próximo lunes.
                    </span>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="flex flex-col gap-3 sm:flex-row"
                  >
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("form.placeholder")}
                      className="h-14 flex-1 rounded-full border border-foreground/15 bg-background px-5 text-base text-foreground placeholder:text-muted focus-visible:border-primary focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary"
                    />
                    <button
                      type="submit"
                      className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-base font-semibold text-background shadow-lg shadow-foreground/10 transition hover:scale-[1.02] hover:shadow-xl hover:shadow-foreground/15 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {t("form.submit")}
                      <IconArrowRight
                        size={16}
                        stroke={1.75}
                        className="transition group-hover:translate-x-0.5"
                      />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              <p className="mt-3 max-w-md text-xs text-muted">
                {t("form.consent")}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30, rotate: -1 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-background/80 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted backdrop-blur">
              {t("preview.label")}
            </div>

            <motion.div
              className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-background p-6 shadow-xl shadow-foreground/4 lg:p-7"
              animate={
                reduceMotion
                  ? {}
                  : {
                      y: [0, -4, 0],
                    }
              }
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
              />

              <div className="relative flex items-center gap-2 border-b border-foreground/8 pb-3">
                <div className="flex h-2 w-2 rounded-full bg-red-400/70" />
                <div className="flex h-2 w-2 rounded-full bg-amber-400/70" />
                <div className="flex h-2 w-2 rounded-full bg-emerald-400/70" />
                <span className="ml-2 truncate text-xs text-muted">
                  techtojob.com/correo
                </span>
              </div>

              <div className="relative mt-5">
                <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                  Asunto
                </div>
                <div className="mt-1 text-sm font-semibold text-foreground">
                  {t("preview.subject")}
                </div>
              </div>

              <div className="relative mt-5 space-y-3 text-sm leading-relaxed text-muted">
                <p>{t("preview.greeting")}</p>
                <p>{t("preview.body")}</p>
                <p className="text-xs text-muted">
                  {t("preview.footer")}
                </p>
              </div>

              <div className="relative mt-5 flex items-center justify-between border-t border-foreground/8 pt-3">
                <span className="inline-flex items-center gap-1 text-xs text-muted">
                  <IconMail size={12} stroke={1.75} />
                  TechToJob
                </span>
                <span className="text-xs text-muted">
                  Lunes · semanal
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
