// ProgressBar: determinate and indeterminate progress with a crossfading readout. Restyled onto the
// catalog's semantic tokens so every design system themes it.
"use client";

import type { AriaAttributes } from "react";
import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";

const FILL = { type: "spring", stiffness: 210, damping: 34, mass: 0.9 } as const;
const CROSSFADE = { type: "spring", stiffness: 260, damping: 34, mass: 0.8 } as const;
const INSTANT = { duration: 0 } as const;

export type ProgressBarProps = {
  value: number | null;
  max?: number;
  label?: string;
  pendingLabel?: string;
  completeLabel?: string;
  className?: string;
};

export function ProgressBar({
  value,
  max = 100,
  label = "Progress",
  pendingLabel = "Working",
  completeLabel = "Complete",
  className = "",
}: ProgressBarProps) {
  const reduced = useReducedMotion();
  const labelId = useId();

  const indeterminate = value === null;
  const fraction =
    value === null || max <= 0 ? 0 : Math.min(1, Math.max(0, value / max));
  const percent = Math.round(fraction * 100);
  const complete = !indeterminate && fraction >= 1;

  const measured: AriaAttributes = indeterminate
    ? {}
    : {
        "aria-valuenow": Math.round(fraction * max * 100) / 100,
        "aria-valuetext": `${percent}%`,
      };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-baseline justify-between gap-3">
        <span
          id={labelId}
          className="truncate text-[0.8125rem] font-medium text-foreground"
        >
          {label}
        </span>

        <span
          aria-hidden
          className="grid shrink-0 justify-items-end text-muted-foreground"
        >
          <motion.span
            className="col-start-1 row-start-1 whitespace-nowrap text-[0.75rem] font-medium leading-5"
            initial={false}
            animate={{ opacity: indeterminate ? 1 : 0 }}
            transition={reduced ? INSTANT : CROSSFADE}
          >
            {pendingLabel}
          </motion.span>

          <motion.span
            className="col-start-1 row-start-1 whitespace-nowrap font-mono text-[0.75rem] font-medium leading-5 tabular-nums"
            initial={false}
            animate={{ opacity: indeterminate ? 0 : 1 }}
            transition={reduced ? INSTANT : CROSSFADE}
          >
            {percent}%
          </motion.span>
        </span>
      </div>

      <div
        role="progressbar"
        aria-labelledby={labelId}
        aria-valuemin={0}
        aria-valuemax={max}
        {...measured}
        className="mt-2 rounded-sm bg-muted p-[0.125rem] shadow-inner"
      >
        <div className="relative h-[0.5rem] overflow-hidden rounded-[calc(0.125rem*var(--corner-factor,1))]">
          <motion.span
            aria-hidden
            className="absolute inset-0 block origin-left rounded-[calc(0.125rem*var(--corner-factor,1))] bg-[var(--ring)]"
            initial={false}
            animate={{ scaleX: indeterminate ? 0 : fraction }}
            transition={reduced ? INSTANT : FILL}
          />

          {indeterminate && !reduced ? (
            <motion.span
              aria-hidden
              className="absolute inset-y-0 left-0 block w-2/5 rounded-[calc(0.125rem*var(--corner-factor,1))] bg-[var(--ring)]"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "250%", opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                x: { duration: 1.25, ease: "easeInOut", repeat: Infinity },
                opacity: { duration: 0.18 },
              }}
            />
          ) : null}
        </div>
      </div>

      <span aria-live="polite" className="sr-only">
        {complete ? completeLabel : indeterminate ? pendingLabel : ""}
      </span>
    </div>
  );
}
