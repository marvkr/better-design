"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";

import { cn } from "@/lib/utils";

// Ported from fluid-functionalism (mickadesign): https://github.com/mickadesign/fluid-functionalism

// ThinkingIndicator: cycling status words with a soft cyan shimmer.

interface ThinkingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  words?: string[];
  intervalMs?: number;
}

function ThinkingIndicator({
  words = ["Thinking", "Reasoning", "Computing", "Analyzing"],
  intervalMs = 1800,
  className,
  ...props
}: ThinkingIndicatorProps) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [words.length, intervalMs]);

  return (
    <div className={cn("inline-flex items-center gap-2", className)} {...props}>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary shadow-[0_0_0.375rem_oklch(0.79_0.125_200/0.6)]" />
      </span>
      <span className="relative inline-flex h-5 items-center overflow-hidden text-sm text-muted-foreground">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={words[index]}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
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
