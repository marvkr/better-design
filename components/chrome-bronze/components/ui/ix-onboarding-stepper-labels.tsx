import {
  getOnboardingLabelTone,
  getOnboardingStepState,
  isOnboardingLabelVisible,
} from "./ix-onboarding-stepper-types"
import type {
  OnboardingLabelMode,
  OnboardingStepperStep,
} from "./ix-onboarding-stepper-types"

/** Renders labels beneath a horizontal progress indicator. */
export function OnboardingStepLabels({
  steps,
  index,
  mode,
}: {
  steps: OnboardingStepperStep[]
  index: number
  mode: OnboardingLabelMode
}) {
  if (mode === "none") return null

  if (mode === "current") {
    return (
      <p className="mt-2 text-center text-sm font-semibold text-primary">
        {steps[index]?.label}
      </p>
    )
  }

  return (
    <ol
      className="mt-2 grid list-none gap-2 p-0"
      style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
    >
      {steps.map((step, stepIndex) => {
        const current = stepIndex === index
        const state = getOnboardingStepState(stepIndex, index)
        if (!isOnboardingLabelVisible(mode, current)) return null

        return (
          <li
            key={step.id}
            data-step-state={state}
            className={`min-w-0 text-center text-xs ${getOnboardingLabelTone(state)}`}
          >
            <span className="block truncate">{step.label}</span>
          </li>
        )
      })}
    </ol>
  )
}
