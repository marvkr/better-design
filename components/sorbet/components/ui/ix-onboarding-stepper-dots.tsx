import { motion } from "motion/react"

import { OnboardingStepLabels } from "./ix-onboarding-stepper-labels"
import { getOnboardingStepState } from "./ix-onboarding-stepper-types"
import type { OnboardingIndicatorProps } from "./ix-onboarding-stepper-types"

/** Renders compact dots whose current step morphs into a short bar. */
export function OnboardingDotsIndicator({
  steps,
  index,
  labelMode,
  transition,
}: OnboardingIndicatorProps) {
  return (
    <>
      <div data-progress-style="dots" className="flex h-8 items-center justify-center gap-1">
        {steps.map((step, stepIndex) => {
          const state = getOnboardingStepState(stepIndex, index)
          return (
            <motion.span
              key={step.id}
              data-progress-step={stepIndex}
              data-step-state={state}
              layout="size"
              transition={transition}
              className={`block h-2 rounded-full ${
                state === "current"
                  ? "w-6 bg-primary"
                  : state === "completed"
                    ? "w-2 bg-primary"
                    : "w-2 bg-muted"
              }`}
            />
          )
        })}
      </div>
      <OnboardingStepLabels steps={steps} index={index} mode={labelMode} />
    </>
  )
}
