"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState, type ReactNode } from "react";

type InfiniteMarqueeProps = {
  children: ReactNode;
  direction?: "left" | "right";
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
};

export function InfiniteMarquee({
  children,
  direction = "left",
  speed = 30,
  pauseOnHover = true,
  className = "",
}: InfiniteMarqueeProps) {
  const reduceMotion = useReducedMotion();
  const [hovering, setHovering] = useState(false);

  if (reduceMotion) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <div className="flex w-max gap-4">{children}</div>
      </div>
    );
  }

  const duration = pauseOnHover && hovering ? speed * 4 : speed;
  // For "left" direction (content moves left visually):
  //   start at 0, animate to -33.333% (shift the whole strip one-third to the left)
  // For "right" direction (content moves right visually):
  //   start at -33.333% (already shifted left), animate to 0
  // Both end states look identical to the start state because the strip is
  // 3x duplicated, so the loop is seamless.
  const fromX = direction === "left" ? "0%" : "-33.3333%";
  const toX = direction === "left" ? "-33.3333%" : "0%";

  return (
    <div
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
      }}
    >
      <motion.div
        className="flex w-max gap-4"
        initial={{ x: fromX }}
        animate={{ x: toX }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
}
