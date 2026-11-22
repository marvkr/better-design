"use client"

import * as React from "react"
import { motion, AnimatePresence, type HTMLMotionProps } from "motion/react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

/*
 * Bevel ThinkingSteps.
 *
 * A run of steps down one thread of the track token, the same pixel a divider
 * uses. A finished step reads as "on", so its dot takes the primary button's
 * gradient and rim; the running step pulses a ring in the accent, and a step
 * still waiting is a plain dot in the track.
 */

type StepStatus = "complete" | "active" | "pending"

/** Props for `ThinkingSteps`, the column that holds each `ThinkingStep`. */
interface ThinkingStepsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function ThinkingSteps({ children, className, ...props }: ThinkingStepsProps) {
  return (
    <div className={cn("relative flex flex-col gap-3", className)} {...props}>
      {children}
    </div>
  )
}

/** Props for `ThinkingStep`; `status` drives the dot and the connector. */
interface ThinkingStepProps extends HTMLMotionProps<"div"> {
  status?: StepStatus
  title: string
  description?: React.ReactNode
  /** When false, hides the vertical connector below this step. */
  showConnector?: boolean
}

function ThinkingStep({
  status = "pending",
  title,
  description,
  showConnector = true,
  className,
  ...props
}: ThinkingStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
      className={cn("relative flex gap-3", className)}
      data-status={status}
      {...props}
    >
      <div className="relative flex flex-col items-center">
        <StatusDot status={status} />
        {showConnector && (
          <span
            className={cn(
              "mt-1 w-px flex-1 rounded-full bg-[var(--track)]",
              status === "complete" && "bg-primary/40",
            )}
            aria-hidden
          />
        )}
      </div>
      <div className="-mt-0.5 flex flex-col gap-1 pb-3">
        <span
          className={cn(
            "text-[0.9063rem] leading-[1.125rem] font-semibold tracking-[-0.0125rem]",
            status === "pending" ? "text-muted-foreground" : "text-foreground",
          )}
        >
          {title}
        </span>
        <AnimatePresence initial={false}>
          {description && status !== "pending" && (
            <motion.div
              key="desc"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.16, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden text-[0.7813rem] leading-[1.0625rem] tracking-[0.0188rem] text-muted-foreground"
            >
              {description}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function StatusDot({ status }: { status: StepStatus }) {
  if (status === "complete") {
    return (
      <span
        className={cn(
          "flex size-[1.125rem] items-center justify-center rounded-full",
          "text-primary-foreground",
          "bg-[linear-gradient(180deg,var(--primary-from)_0%,var(--primary-to)_100%)]",
          "[box-shadow:var(--shadow-primary)]",
        )}
      >
        <Icon icon="solar:check-read-linear" className="size-3" aria-hidden />
      </span>
    )
  }

  if (status === "active") {
    return (
      <span className="relative flex size-[1.125rem] items-center justify-center">
        <motion.span
          className="absolute inset-0 rounded-full bg-primary/25"
          animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <span
          className={cn(
            "relative size-2.5 rounded-full",
            "bg-[linear-gradient(180deg,var(--primary-from)_0%,var(--primary-to)_100%)]",
            "[box-shadow:var(--shadow-primary)]",
          )}
        />
      </span>
    )
  }

  return (
    <span className="flex size-[1.125rem] items-center justify-center">
      <span className="size-2.5 rounded-full bg-[var(--track)] [box-shadow:var(--shadow-inset)]" />
    </span>
  )
}

/** Props for `ThinkingStepSources`, the chip row under a step. */
interface ThinkingStepSourcesProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function ThinkingStepSources({
  children,
  className,
  ...props
}: ThinkingStepSourcesProps) {
  return (
    <div className={cn("flex flex-wrap gap-1.5 pt-1", className)} {...props}>
      {React.Children.map(children, (child, i) => (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.16,
            delay: i * 0.04,
            ease: [0.4, 0, 0.2, 1],
          }}
          className={cn(
            "inline-flex items-center rounded-[0.5rem] px-2 py-0.5",
            "bg-[var(--inner)] [box-shadow:var(--shadow-inset)]",
            "text-[0.7813rem] leading-4 tracking-[0.0188rem] text-muted-foreground",
          )}
        >
          {child}
        </motion.span>
      ))}
    </div>
  )
}

export { ThinkingSteps, ThinkingStep, ThinkingStepSources }
export type { ThinkingStepsProps, ThinkingStepProps, StepStatus }
