"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface ThinkingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  words?: string[];
  intervalMs?: number;
}

const DEFAULT_WORDS = ["Reading your notes", "Finding related pages", "Drafting a summary", "Checking dates"];

/**
 * Margin ThinkingIndicator: three small oxblood dots that rise in turn beside a
 * muted status line, the way a notes app shows its assistant at work.
 *
 * The line changes every couple of seconds. A screen reader hears the first
 * word once, not every change. With reduced motion on, the dots hold still.
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
        "inline-flex h-7 items-center gap-2 rounded-lg bg-card ps-2.5 pe-3 text-sm text-muted-foreground shadow-sm",
        className,
      )}
      {...props}
    >
      <span className="sr-only">{words[0] ?? "Thinking"}</span>
      <span aria-hidden="true" className="flex items-center gap-0.5">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            className="size-1.5 rounded-full bg-primary"
            animate={
              reduceMotion
                ? { opacity: 0.7, y: "0rem" }
                : { opacity: [0.35, 1, 0.35], y: ["0rem", "-0.125rem", "0rem"] }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.9, repeat: Infinity, delay: dot * 0.15, ease: "easeInOut" }
            }
          />
        ))}
      </span>
      <span aria-hidden="true" className="relative inline-flex h-5 items-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={word}
            initial={{ opacity: 0, y: reduceMotion ? "0rem" : "0.25rem" }}
            animate={{ opacity: 1, y: "0rem" }}
            exit={{ opacity: 0, y: reduceMotion ? "0rem" : "-0.25rem" }}
            transition={{ duration: reduceMotion ? 0 : 0.16, ease: "easeOut" }}
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
