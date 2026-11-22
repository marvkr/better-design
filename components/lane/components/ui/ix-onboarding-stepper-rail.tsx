import { motion } from "motion/react"

import { OnboardingStepLabels } from "./ix-onboarding-stepper-labels"
import { getOnboardingStepState } from "./ix-onboarding-stepper-types"
import type { OnboardingIndicatorProps } from "./ix-onboarding-stepper-types"

/** Renders a connected horizontal rail with nodes for every step. */
export function OnboardingRailIndicator({
  steps,
  index,
  labelMode,
  transition,
}: OnboardingIndicatorProps) {
  const progress = steps.length > 1 ? index / (steps.length - 1) : 1

  return (
    <>
      <div data-progress-style="rail" className="relative flex h-12 items-center justify-between px-2">
        <span className="absolute inset-x-2 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-muted">
          <motion.span
            initial={false}
            animate={{ scaleX: progress }}
            transition={transition}
            className="block h-full origin-left rounded-full bg-primary"
          />
        </span>
        {steps.map((step, stepIndex) => {
          const state = getOnboardingStepState(stepIndex, index)
          return (
            <span
              key={step.id}
              data-step-state={state}
              className={`relative z-10 rounded-full border-2 border-card ${
                state === "current"
                  ? "size-4 bg-primary ring-4 ring-primary/15"
                  : state === "completed"
                    ? "size-3 bg-primary"
                    : "size-3 bg-muted"
              }`}
            />
          )
        })}
      </div>
      <OnboardingStepLabels steps={steps} index={index} mode={labelMode} />
    </>
  )
}
