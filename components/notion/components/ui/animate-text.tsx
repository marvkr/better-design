"use client"

import * as React from "react"
import { motion, useReducedMotion, type Easing } from "motion/react"

import { cn } from "@/lib/utils"

// AnimateText — six text reveal variants distilled from the
// pixel-point/animate-text catalog. Per-spec durations, staggers, and
// easings are preserved verbatim.

export type AnimateTextVariant =
  | "soft-blur-in"
  | "per-character-rise"
  | "mask-reveal-up"
  | "typewriter"
  | "stagger-from-center"
  | "shared-axis-y"

type FromTo = { opacity: number; y?: number; blur?: number }

type Spec = {
  durationMs: number
  staggerMs: number
  easing: Easing | "steps"
  target: "char" | "word" | "line"
  staggerMode?: "center-out"
  lineMask?: boolean
  from: FromTo
  to: FromTo
}

const SPECS: Record<AnimateTextVariant, Spec> = {
  "soft-blur-in": {
    durationMs: 900,
    staggerMs: 25,
    easing: [0.22, 1, 0.36, 1],
    target: "char",
    from: { opacity: 0, y: 16, blur: 12 },
    to: { opacity: 1, y: 0, blur: 0 },
  },
  "per-character-rise": {
    durationMs: 700,
    staggerMs: 24,
    easing: [0.2, 0.8, 0.2, 1],
    target: "char",
    from: { opacity: 0, y: 32 },
    to: { opacity: 1, y: 0 },
  },
  "mask-reveal-up": {
    durationMs: 760,
    staggerMs: 90,
    easing: [0.22, 1, 0.36, 1],
    target: "line",
    lineMask: true,
    from: { opacity: 0, y: 30, blur: 6 },
    to: { opacity: 1, y: 0, blur: 0 },
  },
  typewriter: {
    durationMs: 240,
    staggerMs: 46,
    easing: "steps",
    target: "char",
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  "stagger-from-center": {
    durationMs: 620,
    staggerMs: 22,
    easing: [0.22, 1, 0.36, 1],
    target: "char",
    staggerMode: "center-out",
    from: { opacity: 0, y: 12, blur: 3 },
    to: { opacity: 1, y: 0, blur: 0 },
  },
  "shared-axis-y": {
    durationMs: 180,
    staggerMs: 78,
    easing: "steps",
    target: "word",
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
}

function tokenize(text: string, target: Spec["target"]): string[] {
  if (target === "line") return text.split(/\r?\n/)
  if (target === "word") return text.split(/(\s+)/)
  return Array.from(text)
}

function tokenDelayMs(index: number, total: number, spec: Spec) {
  if (spec.staggerMode === "center-out") {
    const mid = (total - 1) / 2
    return Math.abs(index - mid) * spec.staggerMs
  }
  return index * spec.staggerMs
}

function toFilter(blur: number | undefined) {
  return blur && blur > 0 ? `blur(${blur}px)` : "blur(0px)"
}

export interface AnimateTextProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  children: string
  variant?: AnimateTextVariant
  delayMs?: number
}

function AnimateText({
  children,
  variant = "soft-blur-in",
  delayMs = 0,
  className,
  ...rest
}: AnimateTextProps) {
  const spec = SPECS[variant]
  const reduceMotion = useReducedMotion()
  const tokens = React.useMemo(
    () => tokenize(children, spec.target),
    [children, spec.target],
  )

  if (reduceMotion) {
    return (
      <span className={cn("inline-block", className)} {...rest}>
        {children}
      </span>
    )
  }

  const isSteps = spec.easing === "steps"
  const durationSec = isSteps ? 0.001 : spec.durationMs / 1000
  const ease: Easing = isSteps ? "linear" : (spec.easing as Easing)

  const fromMotion = {
    opacity: spec.from.opacity,
    y: spec.from.y ?? 0,
    filter: toFilter(spec.from.blur),
  }
  const toMotion = {
    opacity: spec.to.opacity,
    y: spec.to.y ?? 0,
    filter: toFilter(spec.to.blur),
  }

  return (
    <span
      className={cn("inline-block whitespace-pre-wrap", className)}
      aria-label={children}
      {...rest}
    >
      {tokens.map((token, i) => {
        const isWhitespace = /^\s+$/.test(token)
        if (isWhitespace) {
          return (
            <span key={i} aria-hidden="true">
              {token}
            </span>
          )
        }

        const delay = (tokenDelayMs(i, tokens.length, spec) + delayMs) / 1000

        const motionSpan = (
          <motion.span
            aria-hidden="true"
            className="inline-block will-change-transform"
            initial={fromMotion}
            animate={toMotion}
            transition={{ duration: durationSec, delay, ease }}
          >
            {token === "" ? "\u00A0" : token}
          </motion.span>
        )

        if (spec.lineMask) {
          return (
            <span key={i} className="block overflow-hidden">
              {motionSpan}
            </span>
          )
        }

        return <React.Fragment key={i}>{motionSpan}</React.Fragment>
      })}
    </span>
  )
}

AnimateText.displayName = "AnimateText"

export { AnimateText }
