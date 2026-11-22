import { motion } from "motion/react"

import { OnboardingStepLabels } from "./ix-onboarding-stepper-labels"
import { getOnboardingStepState } from "./ix-onboarding-stepper-types"
import type { OnboardingIndicatorProps } from "./ix-onboarding-stepper-types"

/** Renders a segmented bar with distinct completed, current, and upcoming states. */
export function OnboardingSegmentsIndicator({
  steps,
  index,
  labelMode,
  transition,
}: OnboardingIndicatorProps) {
  return (
    <>
      <div data-progress-style="segments" className="flex h-8 items-center gap-1.5">
        {steps.map((step, stepIndex) => {
          const state = getOnboardingStepState(stepIndex, index)
          return (
            <span
              key={step.id}
              data-step-state={state}
              className={`h-2 flex-1 overflow-hidden rounded-full ${
                state === "current"
                  ? "bg-muted ring-2 ring-primary/20 ring-offset-2 ring-offset-card"
                  : "bg-muted"
              }`}
            >
              <motion.span
                initial={false}
                animate={{ scaleX: state === "upcoming" ? 0 : 1 }}
                transition={transition}
                className={`block h-full origin-left rounded-full ${
                  state === "completed" ? "bg-primary/65" : "bg-primary"
                }`}
              />
            </span>
          )
        })}
      </div>
      <OnboardingStepLabels steps={steps} index={index} mode={labelMode} />
    </>
  )
}
