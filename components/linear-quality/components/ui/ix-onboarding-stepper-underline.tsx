import { useId } from "react"
import { motion } from "motion/react"

import {
  getOnboardingLabelTone,
  getOnboardingStepState,
} from "./ix-onboarding-stepper-types"
import type { OnboardingIndicatorProps } from "./ix-onboarding-stepper-types"

/** Renders an underline that moves only within its own stepper instance. */
export function OnboardingUnderlineIndicator({
  steps,
  index,
  labelMode,
  transition,
}: OnboardingIndicatorProps) {
  const activeUnderlineId = useId()

  return (
    <div data-progress-style="underline" className="flex min-h-10 items-end justify-between gap-2">
      {steps.map((step, stepIndex) => {
        const current = stepIndex === index
        const state = getOnboardingStepState(stepIndex, index)
        const text = labelMode === "all" || (labelMode === "current" && current)
          ? step.label
          : stepIndex + 1
        return (
          <span
            key={step.id}
            data-step-state={state}
            className={`relative min-w-6 pb-2 text-center text-xs ${getOnboardingLabelTone(state)}`}
          >
            {text}
            {current ? (
              <motion.span
                layoutId={`${activeUnderlineId}-active`}
                transition={transition}
                className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-primary"
              />
            ) : null}
          </span>
        )
      })}
    </div>
  )
}
