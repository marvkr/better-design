import { motion } from "motion/react"

import {
  getOnboardingLabelTone,
  getOnboardingStepState,
} from "./ix-onboarding-stepper-types"
import type { OnboardingIndicatorProps } from "./ix-onboarding-stepper-types"

/** Renders a vertical trail with all step labels and a connected active line. */
export function OnboardingVerticalIndicator({
  steps,
  index,
  transition,
}: OnboardingIndicatorProps) {
  const progress = steps.length > 1 ? index / (steps.length - 1) : 1

  return (
    <div data-progress-style="vertical" className="relative">
      <span className="absolute bottom-3 left-1 top-3 w-px -translate-x-1/2 bg-border" />
      <motion.span
        initial={false}
        animate={{ scaleY: progress }}
        transition={transition}
        className="absolute bottom-3 left-1 top-3 w-px origin-top -translate-x-1/2 bg-primary"
      />
      <ol className="relative grid min-h-28 list-none gap-2 py-1">
        {steps.map((step, stepIndex) => {
          const state = getOnboardingStepState(stepIndex, index)
          return (
            <li
              key={step.id}
              data-step-state={state}
              className="relative flex min-h-5 items-center gap-3 text-xs"
            >
              <span
                className={`relative z-10 rounded-full ring-card ${
                  state === "completed"
                    ? "size-2 bg-primary ring-2"
                    : state === "current"
                      ? "size-3 border-2 border-primary bg-card ring-2"
                      : "size-2 border border-muted-foreground/50 bg-muted ring-2"
                }`}
              />
              <span className={getOnboardingLabelTone(state)}>{step.label}</span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
