"use client";

import { motion, useReducedMotion } from "motion/react";
import { Decorator } from "@/components/shared/decorator";

export function HeroDecorator() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute right-[6%] top-[12%] hidden h-32 w-32 text-primary lg:block"
      initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
      animate={{
        opacity: 0.55,
        scale: 1,
        rotate: reduceMotion ? 0 : 360,
      }}
      transition={{
        opacity: { duration: 0.8, delay: 0.4 },
        scale: { duration: 0.8, delay: 0.4 },
        rotate: reduceMotion
          ? { duration: 0 }
          : { duration: 80, repeat: Infinity, ease: "linear" },
      }}
    >
      <Decorator />
    </motion.div>
  );
}
