"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * Interior ThinkingIndicator — a spinner arc beside a rotating word. The arc
 * is the one allowed loop (unknown duration, honestly reported) and it wears
 * the accent because the system is responding right now. The word swap is an
 * event, so it moves; nothing idles, morphs, or pulses. The widest word
 * reserves the width so the chip never changes size mid-thought.
 */

const DEFAULT_WORDS = ["Thinking", "Planning", "Refining", "Generating"];

interface ThinkingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  words?: string[];
  intervalMs?: number;
}

function ThinkingIndicator({
  words = DEFAULT_WORDS,
  intervalMs = 4000,
  className,
  ...props
}: ThinkingIndicatorProps) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(
      () => setIndex((current) => (current + 1) % words.length),
      intervalMs,
    );
    return () => clearInterval(id);
  }, [words.length, intervalMs]);

  const widest = React.useMemo(
    () => words.reduce((a, b) => (a.length >= b.length ? a : b), ""),
    [words],
  );

  return (
    <div
      role="status"
      className={cn(
        "inline-flex items-center gap-2 rounded-[0.5rem] bg-card px-3 py-1.5",
        "shadow-[var(--shadow-lift)]",
        className,
      )}
      {...props}
    >
      <Loader2
        aria-hidden
        strokeWidth={1.5}
        className="size-3.5 shrink-0 animate-spin text-ring"
      />
      <span className="inline-grid overflow-hidden text-[0.7813rem] font-medium text-muted-foreground">
        <span aria-hidden className="invisible col-start-1 row-start-1">
          {widest}
        </span>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={words[index]}
            className="col-start-1 row-start-1"
            initial={{ y: "80%", opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 0.24, ease: [0.4, 0, 0.2, 1] },
            }}
            exit={{
              y: "-80%",
              opacity: 0,
              transition: { duration: 0.16, ease: [0.4, 0, 0.2, 1] },
            }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}

export { ThinkingIndicator };
export type { ThinkingIndicatorProps };
