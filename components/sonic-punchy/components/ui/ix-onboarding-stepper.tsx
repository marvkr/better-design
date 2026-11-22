"use client"

// OnboardingStepper: one token-driven multi-step flow with nine progress
// shapes, compatible label modes, reached-step navigation, and focus handoff.
// The stamp script publishes this source unchanged to every design system.

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { KeyboardEvent } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { Button } from "./button"
import { OnboardingStepNavigation } from "./ix-onboarding-stepper-navigation"
import { OnboardingProgressIndicator } from "./ix-onboarding-stepper-progress"
import {
  DEFAULT_ONBOARDING_MOTION,
  clampOnboardingIndex,
  getOnboardingTransition,
} from "./ix-onboarding-stepper-types"
import type {
  OnboardingDirection,
  OnboardingStepperProps,
} from "./ix-onboarding-stepper-types"

export { DEFAULT_ONBOARDING_MOTION, resolveOnboardingLabelMode } from "./ix-onboarding-stepper-types"
export type {
  OnboardingDirection,
  OnboardingLabelMode,
  OnboardingMotion,
  OnboardingProgressStyle,
  OnboardingStepperProps,
  OnboardingStepperStep,
} from "./ix-onboarding-stepper-types"

/** Renders a reusable onboarding flow using the active design-system tokens. */
export function OnboardingStepper({
  steps,
  index,
  defaultIndex = 0,
  onIndexChange,
  complete,
  completion,
  onComplete,
  onSkip,
  progressStyle = "segments",
  labelMode = "all",
  motionConfig,
  progressLabel = "Onboarding progress",
  backLabel = "Previous step",
  nextLabel = "Next step",
  finishLabel = "Finish",
  skipLabel = "Skip for now",
  className = "",
}: OnboardingStepperProps) {
  const [internalIndex, setInternalIndex] = useState(() =>
    clampOnboardingIndex(defaultIndex, steps.length),
  )
  const [internalComplete, setInternalComplete] = useState(false)
  const current = clampOnboardingIndex(index ?? internalIndex, steps.length)
  const [progress, setProgress] = useState<{
    direction: OnboardingDirection
    furthest: number
    index: number
  }>(() => ({
    direction: 1,
    furthest: current,
    index: current,
  }))
  if (progress.index !== current) {
    setProgress({
      direction: current > progress.index ? 1 : -1,
      furthest: Math.max(progress.furthest, current),
      index: current,
    })
  }
  const { direction, furthest } = progress
  const listRef = useRef<HTMLOListElement>(null)
  const panelNode = useRef<HTMLDivElement | null>(null)
  // The next panel mounts only after the last one has left, so the step change
  // asks for focus and the new panel takes it as it mounts.
  const panelFocusPending = useRef(false)
  const completionRef = useRef<HTMLDivElement>(null)
  const completionRequested = useRef(false)
  const intent = useRef<"list" | "panel" | null>(null)
  const controlled = index !== undefined
  const isComplete = complete ?? internalComplete
  const reduced = useReducedMotion() === true
  const config = { ...DEFAULT_ONBOARDING_MOTION, ...motionConfig }
  const transition = getOnboardingTransition(reduced, config)
  const step = steps[current]

  useEffect(() => {
    const move = intent.current
    intent.current = null
    if (move === "list") {
      listRef.current?.querySelector<HTMLButtonElement>('button[data-current="true"]')?.focus()
    } else if (move === "panel") {
      const panel = panelNode.current
      if (panel?.dataset.step === steps[current]?.id) panel.focus({ preventScroll: true })
      else panelFocusPending.current = true
    }
  }, [current, steps])

  const panelRef = useCallback((node: HTMLDivElement | null) => {
    panelNode.current = node
    if (node && panelFocusPending.current) {
      panelFocusPending.current = false
      node.focus({ preventScroll: true })
    }
  }, [])

  useEffect(() => {
    if (!isComplete || !completionRequested.current) return
    completionRequested.current = false
    completionRef.current?.focus({ preventScroll: true })
  }, [isComplete])

  const goTo = useCallback(
    (target: number, nextIntent: "list" | "panel") => {
      const next = clampOnboardingIndex(target, steps.length)
      if (next === current) return
      const nextDirection: OnboardingDirection = next > current ? 1 : -1
      intent.current = nextIntent
      if (!controlled) setInternalIndex(next)
      onIndexChange?.(next, nextDirection)
    },
    [controlled, current, onIndexChange, steps.length],
  )

  const moveNext = () => {
    if (current < steps.length - 1) {
      goTo(current + 1, "panel")
      return
    }
    completionRequested.current = true
    if (complete === undefined) setInternalComplete(true)
    onComplete?.()
  }

  const onStepKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    let target = current
    if (event.key === "ArrowRight" || event.key === "ArrowDown") target = current + 1
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") target = current - 1
    else if (event.key === "Home") target = 0
    else if (event.key === "End") target = furthest
    else return
    event.preventDefault()
    goTo(Math.min(clampOnboardingIndex(target, steps.length), furthest), "list")
  }

  const variants = useMemo(
    () => ({
      enter: (value: OnboardingDirection) =>
        reduced ? { opacity: 1 } : { opacity: 0, x: value * config.offset },
      center: { opacity: 1, x: 0 },
      exit: (value: OnboardingDirection) =>
        reduced
          ? { opacity: 1 }
          : {
              opacity: 0,
              x: value * -config.offset,
              transition: { duration: config.exitDuration, ease: "easeIn" as const },
            },
    }),
    [config.exitDuration, config.offset, reduced],
  )

  if (!step) return null

  return (
    <section className={`w-full overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm ${className}`}>
      <p aria-live="polite" className="sr-only">
        {isComplete ? "Onboarding complete" : `Step ${current + 1} of ${steps.length}: ${step.title}`}
      </p>

      {isComplete ? (
        <div
          ref={completionRef}
          tabIndex={-1}
          role="group"
          aria-label="Onboarding complete"
          className="p-8 text-center outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
        >
          {completion ?? (
            <>
              <h2 className="text-lg font-semibold text-foreground">Onboarding complete</h2>
              <p className="mt-2 text-sm text-muted-foreground">Your choices are ready to use.</p>
            </>
          )}
        </div>
      ) : (
        <>
          <div className="border-b border-border p-5">
            <OnboardingStepNavigation
              steps={steps}
              index={current}
              furthest={furthest}
              label={progressLabel}
              listRef={listRef}
              onKeyDown={onStepKeyDown}
              onSelect={(target) => goTo(target, "list")}
            />
            <OnboardingProgressIndicator
              style={progressStyle}
              steps={steps}
              index={current}
              labelMode={labelMode}
              transition={transition}
            />
          </div>

          <div className="p-5">
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              <motion.div
                ref={panelRef}
                key={step.id}
                data-step={step.id}
                tabIndex={-1}
                role="group"
                aria-label={step.title}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
                className="outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <h2 className="text-lg font-semibold tracking-tight text-foreground">{step.title}</h2>
                {step.description ? (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                ) : null}
                {step.content ? <div className="mt-5">{step.content}</div> : null}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3 border-t border-border p-4">
            {onSkip ? (
              <Button
                type="button"
                onClick={onSkip}
                className="min-h-11 bg-transparent px-3 text-sm font-medium text-muted-foreground shadow-none hover:bg-muted/50 hover:text-foreground"
              >
                {skipLabel}
              </Button>
            ) : null}
            {current > 0 ? (
              <Button
                type="button"
                onClick={() => goTo(current - 1, "panel")}
                className="min-h-11 border border-border bg-background px-4 text-sm font-medium text-foreground shadow-none hover:bg-muted"
              >
                {backLabel}
              </Button>
            ) : null}
            <Button
              type="button"
              disabled={step.complete === false}
              onClick={moveNext}
              className="ml-auto min-h-11 bg-primary px-4 text-sm font-medium text-primary-foreground"
            >
              {current === steps.length - 1 ? finishLabel : nextLabel}
            </Button>
          </div>
        </>
      )}
    </section>
  )
}
