"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface ThinkingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  words?: string[];
  intervalMs?: number;
}

const DEFAULT_WORDS = ["Thinking", "Reading", "Working it out", "Writing"];

/**
 * Firefly ThinkingIndicator: three warm grey dots that breathe in turn,
 * beside a muted word that changes every couple of seconds.
 *
 * It stays quiet on purpose: no colour and no glow, because waiting is not
 * an action. Each new word rises into place as the old one leaves. A
 * screen reader hears the first word once, not every change, and with
 * reduced motion on the dots hold still.
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
        "inline-flex items-center gap-2 text-sm text-muted-foreground",
        className,
      )}
      {...props}
    >
      <span className="sr-only">{words[0] ?? "Thinking"}</span>
      <span aria-hidden="true" className="flex items-center gap-1">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            className="size-1.5 rounded-full bg-(--control)"
            animate={
              reduceMotion
                ? { opacity: 0.7 }
                : { opacity: [0.35, 1, 0.35], scale: [0.8, 1, 0.8] }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: dot * 0.16,
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
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
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
