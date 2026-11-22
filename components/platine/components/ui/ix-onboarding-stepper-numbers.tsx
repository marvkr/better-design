import { motion } from "motion/react"

import { OnboardingStepLabels } from "./ix-onboarding-stepper-labels"
import { getOnboardingStepState } from "./ix-onboarding-stepper-types"
import type { OnboardingIndicatorProps } from "./ix-onboarding-stepper-types"

/** Renders numbered circles for each onboarding step. */
export function OnboardingNumbersIndicator({
  steps,
  index,
  labelMode,
  transition,
}: OnboardingIndicatorProps) {
  return (
    <>
      <div data-progress-style="numbers" className="flex h-12 items-center gap-2">
        {steps.map((step, stepIndex) => {
          const state = getOnboardingStepState(stepIndex, index)
          return (
            <span key={step.id} className="grid flex-1 place-items-center">
              <motion.span
                data-step-state={state}
                animate={{ scale: state === "current" ? 1.08 : 1 }}
                transition={transition}
                className={`grid size-8 place-items-center rounded-full text-xs font-semibold tabular-nums ${
                  state === "upcoming"
                    ? "bg-muted text-muted-foreground"
                    : state === "current"
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/15"
                      : "bg-primary text-primary-foreground"
                }`}
              >
                {stepIndex + 1}
              </motion.span>
            </span>
          )
        })}
      </div>
      <OnboardingStepLabels steps={steps} index={index} mode={labelMode} />
    </>
  )
}
