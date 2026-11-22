import { motion } from "motion/react"

import { OnboardingStepLabels } from "./ix-onboarding-stepper-labels"
import type { OnboardingIndicatorProps } from "./ix-onboarding-stepper-types"

/** Renders a numeric fraction with a continuous progress bar. */
export function OnboardingFractionIndicator({
  steps,
  index,
  labelMode,
  transition,
}: OnboardingIndicatorProps) {
  const progress = (index + 1) / steps.length

  return (
    <div data-progress-style="fraction" className="grid gap-3 py-2">
      <div className="flex items-baseline justify-between tabular-nums">
        <span className="text-2xl font-semibold text-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-xs text-muted-foreground">
          of {String(steps.length).padStart(2, "0")}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <motion.span
          initial={false}
          animate={{ scaleX: progress }}
          transition={transition}
          className="block h-full origin-left rounded-full bg-primary"
        />
      </div>
      <OnboardingStepLabels steps={steps} index={index} mode={labelMode} />
    </div>
  )
}
