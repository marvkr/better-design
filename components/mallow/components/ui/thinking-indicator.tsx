"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface ThinkingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  words?: string[];
  intervalMs?: number;
}

const DEFAULT_WORDS = ["Searching the notes", "Reading", "Checking the numbers", "Writing"];

/**
 * Mallow ThinkingIndicator: a thin faint ring with one ink arc turns beside
 * a muted status word that changes every couple of seconds; a screen reader
 * hears the first word once, and the ring holds still under reduced motion.
 */
function ThinkingIndicator({ words = DEFAULT_WORDS, intervalMs = 1800, className, ...props }: ThinkingIndicatorProps) {
  const [index, setIndex] = React.useState(0);
  const reduceMotion = useReducedMotion();
  const count = words.length;

  React.useEffect(() => {
    if (count < 2) return;
    const timer = setInterval(() => setIndex((current) => (current + 1) % count), intervalMs);
    return () => clearInterval(timer);
  }, [count, intervalMs]);

  const word = words[index % Math.max(count, 1)] ?? "";

  return (
    <div
      role="status"
      data-slot="thinking-indicator"
      className={cn("inline-flex items-center gap-2.5 text-sm text-muted-foreground", className)}
      {...props}
    >
      <span className="sr-only">{words[0] ?? "Thinking"}</span>
      <motion.span
        aria-hidden="true"
        className="size-4 shrink-0 rounded-full border-2 border-foreground/15 border-t-foreground"
        animate={reduceMotion ? { rotate: 0 } : { rotate: 360 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.9, repeat: Infinity, ease: "linear" }}
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
