"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

/** Props for ThinkingIndicator: the words it cycles through and how fast. */
interface ThinkingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  words?: string[];
  intervalMs?: number;
}

const DEFAULT_WORDS = ["Thinking", "Reading", "Working it out", "Writing"];

/** One marker colour per hopping block: orange, then blue, then purple. */
const BLOCK_TONES = ["bg-primary", "bg-(--info)", "bg-(--note)"] as const;

/**
 * Playful console ThinkingIndicator: three small marker blocks that hop in
 * turn, beside a bold word that changes every couple of seconds.
 *
 * The blocks borrow the orange, blue and purple highlights so the wait feels
 * friendly rather than grey. Each new word drops into place as the old one
 * leaves. A screen reader hears the first word once, not every change, and
 * with reduced motion on the blocks hold still.
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
        "inline-flex items-center gap-2.5 text-sm font-semibold text-(--foreground-secondary)",
        className,
      )}
      {...props}
    >
      <span className="sr-only">{words[0] ?? "Thinking"}</span>
      <span aria-hidden="true" className="flex h-4 items-end gap-1">
        {BLOCK_TONES.map((tone, dot) => (
          <motion.span
            key={tone}
            className={cn("size-2 rounded-[0.125rem]", tone)}
            animate={reduceMotion ? { y: 0 } : { y: [0, -5, 0] }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: 0.9,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: dot * 0.15,
                  }
            }
          />
        ))}
      </span>
      <span
        aria-hidden="true"
        className="relative inline-flex h-5 items-center overflow-hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={word}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
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
