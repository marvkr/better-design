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
 * Cream editorial ThinkingIndicator: a small terracotta asterisk that turns
 * slowly beside a word in the serif, set in italic, that changes every
 * couple of seconds.
 *
 * Waiting is a pause in the reading, not an action, so the word stays in
 * muted ink. Each new word fades up into place. A screen reader hears the
 * first word once, not every change, and with reduced motion the mark
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
        "inline-flex items-center gap-2 text-sm text-muted-foreground",
        className,
      )}
      {...props}
    >
      <span className="sr-only">{words[0] ?? "Thinking"}</span>
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        fill="none"
        className="size-3.5 shrink-0 text-(--primary-text)"
        animate={reduceMotion ? { rotate: 0 } : { rotate: 360, opacity: [0.6, 1, 0.6] }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                rotate: { duration: 6, repeat: Infinity, ease: "linear" },
                opacity: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
              }
        }
      >
        <path
          d="M8 1.5v13M1.5 8h13M3.4 3.4l9.2 9.2M12.6 3.4l-9.2 9.2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </motion.svg>
      <span
        aria-hidden="true"
        className="relative inline-flex h-5 items-center overflow-hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={word}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: "0.375rem" }}
            animate={{ opacity: 1, y: "0rem" }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: "-0.375rem" }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="whitespace-nowrap font-serif text-[0.9375rem] italic"
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
