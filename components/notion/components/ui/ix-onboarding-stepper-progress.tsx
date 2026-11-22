import { OnboardingCircleIndicator } from "./ix-onboarding-stepper-circle"
import { OnboardingDotsIndicator } from "./ix-onboarding-stepper-dots"
import { OnboardingFractionIndicator } from "./ix-onboarding-stepper-fraction"
import { OnboardingNumbersIndicator } from "./ix-onboarding-stepper-numbers"
import { OnboardingPathIndicator } from "./ix-onboarding-stepper-path"
import { OnboardingRailIndicator } from "./ix-onboarding-stepper-rail"
import { OnboardingSegmentsIndicator } from "./ix-onboarding-stepper-segments"
import { OnboardingUnderlineIndicator } from "./ix-onboarding-stepper-underline"
import { OnboardingVerticalIndicator } from "./ix-onboarding-stepper-vertical"
import { resolveOnboardingLabelMode } from "./ix-onboarding-stepper-types"
import type {
  OnboardingIndicatorProps,
  OnboardingProgressStyle,
} from "./ix-onboarding-stepper-types"

/** Selects one of the supported progress shapes for an onboarding flow. */
export function OnboardingProgressIndicator({
  style,
  ...props
}: OnboardingIndicatorProps & { style: OnboardingProgressStyle }) {
  const labels = resolveOnboardingLabelMode(style, props.labelMode)
  const indicatorProps = { ...props, labelMode: labels }

  return (
    <div data-testid="onboarding-progress" data-label-mode={labels}>
      <p className="mb-2 text-xs font-medium tabular-nums text-muted-foreground">
        Step {props.index + 1} of {props.steps.length}
      </p>
      <div aria-hidden="true">
        {style === "dots" ? <OnboardingDotsIndicator {...indicatorProps} /> : null}
        {style === "segments" ? <OnboardingSegmentsIndicator {...indicatorProps} /> : null}
        {style === "numbers" ? <OnboardingNumbersIndicator {...indicatorProps} /> : null}
        {style === "rail" ? <OnboardingRailIndicator {...indicatorProps} /> : null}
        {style === "path" ? <OnboardingPathIndicator {...indicatorProps} /> : null}
        {style === "fraction" ? <OnboardingFractionIndicator {...indicatorProps} /> : null}
        {style === "circle" ? <OnboardingCircleIndicator {...indicatorProps} /> : null}
        {style === "vertical" ? <OnboardingVerticalIndicator {...indicatorProps} /> : null}
        {style === "underline" ? <OnboardingUnderlineIndicator {...indicatorProps} /> : null}
      </div>
    </div>
  )
}
