import { motion } from "motion/react"

import type { OnboardingIndicatorProps } from "./ix-onboarding-stepper-types"

/** Renders a circular count aligned to the left of its current label. */
export function OnboardingCircleIndicator({
  steps,
  index,
  labelMode,
  transition,
}: OnboardingIndicatorProps) {
  const progress = (index + 1) / steps.length

  return (
    <div data-progress-style="circle" className="flex items-center gap-3 py-2">
      <div className="relative size-14 shrink-0">
        <svg viewBox="0 0 56 56" className="size-14 -rotate-90 text-primary">
          <circle
            cx="28"
            cy="28"
            r="23"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.12"
            strokeWidth="5"
          />
          <motion.circle
            cx="28"
            cy="28"
            r="23"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            pathLength={1}
            initial={false}
            animate={{ pathLength: progress }}
            transition={transition}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-xs font-semibold tabular-nums text-foreground">
          {index + 1}/{steps.length}
        </span>
      </div>
      {labelMode === "none" ? null : (
        <span className="text-sm font-semibold text-foreground">{steps[index]?.label}</span>
      )}
    </div>
  )
}
