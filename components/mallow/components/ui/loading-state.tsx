"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

const chevron = Array.from({ length: 9 }, (_, i) => {
  const r = Math.floor(i / 3);
  const c = i % 3;
  return (c + Math.abs(r - 1)) * 0.09;
});

const ORBIT_ORDER = [0, 1, 2, 5, 8, 7, 6, 3];
const orbit = Array.from({ length: 9 }, (_, i) => {
  const k = ORBIT_ORDER.indexOf(i);
  return k === -1 ? null : k * 0.11;
});

const PATTERNS: { [key: string]: { delays: (number | null)[]; dur: number; round: boolean } } = {
  Drive: { delays: chevron, dur: 0.65, round: false },
  Dots: { delays: chevron, dur: 0.65, round: true },
  Orbit: { delays: orbit, dur: 0.95, round: false },
};

function useElapsed() {
  const [ds, setDs] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setDs((d) => d + 1), 100);
    return () => clearInterval(t);
  }, []);
  const total = ds / 10;
  if (total < 60) return `${total.toFixed(1)}s`;
  return `${Math.floor(total / 60)}m ${(total % 60).toFixed(1)}s`;
}

interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  variant?: "Drive" | "Dots" | "Orbit";
  /** When false, hides the elapsed counter. Default true. */
  showElapsed?: boolean;
}

/**
 * Mallow LoadingState: a small grid of light cells that pulse in a wave
 * beside a label and a tabular elapsed timer; reduced motion holds the grid
 * still while the timer keeps counting.
 */
function LoadingState({
  label = "Working",
  variant = "Drive",
  showElapsed = true,
  className,
  ...props
}: LoadingStateProps) {
  const elapsed = useElapsed();
  const reduceMotion = useReducedMotion() ?? false;
  const { delays, dur, round } = PATTERNS[variant] ?? PATTERNS.Drive;

  return (
    <div
      role="status"
      aria-live="polite"
      data-slot="loading-state"
      className={cn("flex w-fit items-center gap-3", className)}
      {...props}
    >
      <span aria-hidden="true" className="grid grid-cols-3 gap-0.5">
        {delays.map((d, i) => (
          <motion.span
            key={i}
            className={cn("size-1 bg-foreground", round ? "rounded-full" : "rounded-xs")}
            initial={{ opacity: d === null ? 0.08 : 0.18 }}
            animate={
              d === null || reduceMotion
                ? { opacity: d === null ? 0.08 : 0.18 }
                : { opacity: [0.18, 1, 0.18] }
            }
            transition={
              d === null || reduceMotion
                ? { duration: 0 }
                : { duration: dur, delay: d, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 1] }
            }
          />
        ))}
      </span>
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      {showElapsed && <span className="font-mono text-xs tabular-nums text-muted-foreground">{elapsed}</span>}
    </div>
  );
}

export { LoadingState };
