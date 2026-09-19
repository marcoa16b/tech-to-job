"use client";

import { motion, useReducedMotion } from "motion/react";
import { IconBrandLinkedin, IconQuote } from "@tabler/icons-react";
import type { ReactNode } from "react";

type TestimonialCardProps = {
  initials: string;
  name: string;
  role: string;
  quote: string;
  linkedinUrl?: string;
};

function gradientFor(initials: string): string {
  const palettes = [
    "from-primary to-foreground",
    "from-amber-400 to-rose-500",
    "from-sky-400 to-indigo-500",
    "from-emerald-400 to-teal-500",
    "from-fuchsia-400 to-rose-500",
    "from-orange-400 to-pink-500",
  ];
  const sum = initials.charCodeAt(0) + (initials.charCodeAt(1) || 0);
  return palettes[sum % palettes.length];
}

export function TestimonialCard({
  initials,
  name,
  role,
  quote,
  linkedinUrl,
}: TestimonialCardProps): ReactNode {
  const reduceMotion = useReducedMotion();

  const avatar = (
    <div
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br ${gradientFor(initials)} text-sm font-semibold text-background ring-2 ring-background shadow-sm`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );

  return (
    <motion.figure
      className="group relative flex w-[320px] shrink-0 flex-col gap-3 rounded-2xl border border-foreground/10 bg-background p-5 shadow-sm transition-shadow hover:shadow-md sm:w-90"
      whileHover={reduceMotion ? undefined : { y: -3 }}
    >
      <IconQuote
        size={20}
        stroke={1.75}
        className="absolute right-4 top-4 text-primary/30"
        aria-hidden="true"
      />

      <blockquote className="text-sm leading-relaxed text-foreground/85">
        “{quote}”
      </blockquote>

      <figcaption className="mt-auto flex items-center justify-between gap-3 pt-3">
        <div className="flex min-w-0 items-center gap-3">
          {avatar}
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-foreground">
              {name}
            </div>
            <div className="truncate text-xs text-foreground/55">{role}</div>
          </div>
        </div>

        {linkedinUrl && (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`LinkedIn de ${name}`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-foreground/40 transition hover:bg-primary/10 hover:text-primary"
          >
            <IconBrandLinkedin size={16} stroke={1.75} />
          </a>
        )}
      </figcaption>
    </motion.figure>
  );
}
