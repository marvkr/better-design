"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface ThinkingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  words?: string[];
  intervalMs?: number;
}

const DEFAULT_WORDS = ["Searching the docs", "Reading", "Checking the API", "Writing"];

/**
 * Burnished ThinkingIndicator: a small copper ring, cut from the same
 * turning gradient as the primary's ring, spins beside a muted status
 * word.
 *
 * The word fades across every couple of seconds. A screen reader hears the
 * first word once, not every change. With reduced motion on, the ring
 * holds still.
 */
function ThinkingIndicator({
  words = DEFAULT_WORDS,
  intervalMs = 1800,
  className,
  ...props
}: ThinkingIndicatorProps) {
  const [index, setIndex] = React.useState(0);
  const reduceMotion = useReducedMotion();
  const count = words.length;

  React.useEffect(() => {
    if (count < 2) return;
    const timer = setInterval(
      () => setIndex((current) => (current + 1) % count),
      intervalMs,
    );
    return () => clearInterval(timer);
  }, [count, intervalMs]);

  const word = words[index % Math.max(count, 1)] ?? "";

  return (
    <div
      role="status"
      data-slot="thinking-indicator"
      className={cn(
        "inline-flex items-center gap-2.5 text-sm tracking-[0.016em] text-muted-foreground",
        className,
      )}
      {...props}
    >
      <span className="sr-only">{words[0] ?? "Thinking"}</span>
      <motion.span
        aria-hidden="true"
        className="size-4 rounded-full bg-[conic-gradient(var(--ring-flow))] [mask:radial-gradient(farthest-side,transparent_calc(100%-0.1875rem),oklch(0_0_0)_calc(100%-0.1875rem))]"
        animate={reduceMotion ? { rotate: 0 } : { rotate: 360 }}
        transition={
          reduceMotion ? { duration: 0 } : { duration: 1.1, repeat: Infinity, ease: "linear" }
        }
      />
      <span aria-hidden="true" className="relative inline-flex h-5 items-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={word}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
            transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
            className="whitespace-nowrap"
          >
            {word}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}

export { ThinkingIndicator };
export type { ThinkingIndicatorProps };
