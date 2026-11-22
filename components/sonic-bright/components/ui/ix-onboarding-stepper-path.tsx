import { motion } from "motion/react"

import { OnboardingStepLabels } from "./ix-onboarding-stepper-labels"
import { getOnboardingStepState } from "./ix-onboarding-stepper-types"
import type { OnboardingIndicatorProps } from "./ix-onboarding-stepper-types"

const LEVEL_PATH_HEIGHTS = [62, 24, 58, 18, 52]
const LEVEL_PATH_VIEWBOX_HEIGHT = 80

/** Renders a stable level path whose active stroke reveals from left to right. */
export function OnboardingPathIndicator({
  steps,
  index,
  labelMode,
  transition,
}: OnboardingIndicatorProps) {
  const points = steps.map((_, stepIndex) => ({
    x: steps.length > 1 ? 6 + (stepIndex * 88) / (steps.length - 1) : 50,
    y: LEVEL_PATH_HEIGHTS[stepIndex] ?? 50,
  }))
  const pointList = points.map(({ x, y }) => `${x},${y}`).join(" ")
  const progressEdge = points[index]?.x ?? 0

  return (
    <div data-progress-style="path">
      <div className="relative h-20">
        <svg viewBox="0 0 100 80" preserveAspectRatio="none" className="absolute inset-0 size-full">
          <polyline
            points={pointList}
            fill="none"
            vectorEffect="non-scaling-stroke"
            className="stroke-border"
            strokeWidth="2"
          />
        </svg>
        <motion.svg
          data-level-path-progress
          data-progress-edge={progressEdge}
          data-progress-clip={`inset(0 ${100 - progressEdge}% 0 0)`}
          viewBox="0 0 100 80"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full"
          initial={false}
          animate={{ clipPath: `inset(0 ${100 - progressEdge}% 0 0)` }}
          transition={transition}
        >
          <polyline
            points={pointList}
            fill="none"
            vectorEffect="non-scaling-stroke"
            className="stroke-primary"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
        <ol className="absolute inset-0 list-none p-0">
          {steps.map((step, stepIndex) => {
            const state = getOnboardingStepState(stepIndex, index)
            const point = points[stepIndex]
            return (
              <li
                key={step.id}
                data-step-state={state}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${point?.x ?? 50}%`,
                  top: `${((point?.y ?? 50) / LEVEL_PATH_VIEWBOX_HEIGHT) * 100}%`,
                }}
              >
                <motion.span
                  animate={{ scale: state === "current" ? 1.12 : 1 }}
                  transition={transition}
                  className={`grid size-9 place-items-center rounded-full border-4 border-card text-xs font-semibold tabular-nums ${
                    state === "upcoming"
                      ? "bg-muted text-muted-foreground"
                      : state === "current"
                        ? "bg-primary text-primary-foreground ring-4 ring-primary/15"
                        : "bg-primary text-primary-foreground"
                  }`}
                >
                  {stepIndex + 1}
                </motion.span>
              </li>
            )
          })}
        </ol>
      </div>
      <OnboardingStepLabels steps={steps} index={index} mode={labelMode} />
    </div>
  )
}
