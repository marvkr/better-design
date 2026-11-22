import type { ReactNode } from "react"

/** The progress shapes supported by the onboarding stepper. */
export type OnboardingProgressStyle =
  | "dots"
  | "segments"
  | "numbers"
  | "rail"
  | "path"
  | "fraction"
  | "circle"
  | "vertical"
  | "underline"

/** Controls how much step copy appears beside the progress shape. */
export type OnboardingLabelMode = "none" | "current" | "all"

/** Motion values shared by the progress indicator and panel transition. */
export type OnboardingMotion = {
  offset: number
  stiffness: number
  damping: number
  mass: number
  exitDuration: number
}

/** One step in an onboarding, setup, survey, or product-tour flow. */
export type OnboardingStepperStep = {
  id: string
  label: string
  title: string
  description?: string
  content?: ReactNode
  complete?: boolean
}

/** Direction reported when the current step changes. */
export type OnboardingDirection = 1 | -1

/** Props for the shared onboarding stepper. */
export type OnboardingStepperProps = {
  steps: OnboardingStepperStep[]
  index?: number
  defaultIndex?: number
  onIndexChange?: (index: number, direction: OnboardingDirection) => void
  complete?: boolean
  completion?: ReactNode
  onComplete?: () => void
  onSkip?: () => void
  progressStyle?: OnboardingProgressStyle
  labelMode?: OnboardingLabelMode
  motionConfig?: Partial<OnboardingMotion>
  progressLabel?: string
  backLabel?: string
  nextLabel?: string
  finishLabel?: string
  skipLabel?: string
  className?: string
}

/** Default motion values for onboarding panels and indicators. */
export const DEFAULT_ONBOARDING_MOTION: OnboardingMotion = {
  offset: 18,
  stiffness: 280,
  damping: 30,
  mass: 0.8,
  exitDuration: 0.12,
}

/** Visual state for one step in the progress indicator. */
export type OnboardingStepState = "completed" | "current" | "upcoming"

/** Keeps a requested step inside the available range. */
export function clampOnboardingIndex(value: number, total: number) {
  if (total < 1) return 0
  return Math.max(0, Math.min(total - 1, Math.trunc(value)))
}

/** Returns the visual state of one step relative to the current step. */
export function getOnboardingStepState(
  stepIndex: number,
  currentIndex: number,
): OnboardingStepState {
  if (stepIndex < currentIndex) return "completed"
  if (stepIndex === currentIndex) return "current"
  return "upcoming"
}

/** Resolves label choices that do not fit a progress shape. */
export function resolveOnboardingLabelMode(
  style: OnboardingProgressStyle,
  mode: OnboardingLabelMode,
): OnboardingLabelMode {
  if (style === "vertical") return "all"
  if ((style === "circle" || style === "dots") && mode === "all") return "current"
  return mode
}

/** Reports whether one label belongs in the selected label mode. */
export function isOnboardingLabelVisible(
  mode: OnboardingLabelMode,
  current: boolean,
) {
  return mode === "all" || (mode === "current" && current)
}

/** Returns semantic text classes for completed, current, and upcoming steps. */
export function getOnboardingLabelTone(state: OnboardingStepState) {
  if (state === "current") return "font-semibold text-primary"
  if (state === "completed") return "font-medium text-foreground"
  return "text-muted-foreground"
}

/** Returns the shared Motion transition, including the reduced-motion form. */
export function getOnboardingTransition(
  reduced: boolean,
  config: OnboardingMotion,
) {
  return reduced
    ? { duration: 0 }
    : {
        type: "spring" as const,
        stiffness: config.stiffness,
        damping: config.damping,
        mass: config.mass,
      }
}

/** Props shared by every visual progress indicator. */
export type OnboardingIndicatorProps = {
  steps: OnboardingStepperStep[]
  index: number
  labelMode: OnboardingLabelMode
  transition: ReturnType<typeof getOnboardingTransition>
}
