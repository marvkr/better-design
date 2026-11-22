import type { KeyboardEvent, RefObject } from "react"

import { Button } from "./button"
import type { OnboardingStepperStep } from "./ix-onboarding-stepper-types"

/** Exposes reached-step navigation without crowding the visual indicator. */
export function OnboardingStepNavigation({
  steps,
  index,
  furthest,
  label,
  onSelect,
  onKeyDown,
  listRef,
}: {
  steps: OnboardingStepperStep[]
  index: number
  furthest: number
  label: string
  onSelect: (index: number) => void
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void
  listRef: RefObject<HTMLOListElement | null>
}) {
  return (
    <nav
      aria-label={label}
      className="sr-only focus-within:not-sr-only focus-within:mb-3 focus-within:block focus-within:rounded-lg focus-within:border focus-within:border-border focus-within:bg-background focus-within:p-2"
    >
      <ol ref={listRef} className="flex list-none flex-wrap gap-2 p-0">
        {steps.map((step, stepIndex) => (
          <li key={step.id}>
            {stepIndex <= furthest ? (
              <Button
                type="button"
                data-current={stepIndex === index ? "true" : undefined}
                tabIndex={stepIndex === index ? 0 : -1}
                aria-current={stepIndex === index ? "step" : undefined}
                aria-label={`Step ${stepIndex + 1} of ${steps.length}: ${step.label}`}
                onClick={() => onSelect(stepIndex)}
                onKeyDown={onKeyDown}
                className="min-h-11 bg-background px-3 text-sm text-foreground shadow-none"
              >
                {step.label}
              </Button>
            ) : (
              <span className="flex min-h-11 items-center px-3 text-sm text-muted-foreground">
                {step.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
