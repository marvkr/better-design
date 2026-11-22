"use client"

import * as React from "react"
import { motion, AnimatePresence, type HTMLMotionProps } from "motion/react"

import { cn } from "@/lib/utils"

// Ported from fluid-functionalism (mickadesign): https://github.com/mickadesign/fluid-functionalism

// Leather Luxe ThinkingSteps: chain-of-thought rows; completed dots fill
// with the cognac leather material.
//
// Usage:
//   <ThinkingSteps>
//     <ThinkingStep status="complete" title="Reading project spec" />
//     <ThinkingStep status="active" title="Generating component" />
//     <ThinkingStep status="pending" title="Saving result" />
//   </ThinkingSteps>

type StepStatus = "complete" | "active" | "pending"

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
              "mt-1 w-px flex-1 bg-border",
              status === "complete" && "bg-primary/50"
            )}
            aria-hidden
          />
        )}
      </div>
      <div className="-mt-0.5 flex flex-col gap-1 pb-3">
        <span
          className={cn(
            "text-sm font-medium leading-5",
            status === "pending" && "text-muted-foreground",
            status === "active" && "text-foreground",
            status === "complete" && "text-foreground"
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
              className="overflow-hidden text-xs leading-5 text-muted-foreground"
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
          "flex h-4 w-4 items-center justify-center rounded-full",
          "[background-image:var(--gradient-leather)] text-primary-foreground",
          "border border-[oklch(0.68_0.115_58/0.55)]",
          "[box-shadow:var(--shadow-leather-sm)]"
        )}
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M2.5 6.5 L5 9 L9.5 3.5" />
        </svg>
      </span>
    )
  }

  if (status === "active") {
    return (
      <span className="relative flex h-4 w-4 items-center justify-center">
        <motion.span
          className="absolute inset-0 rounded-full bg-primary/25"
          animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="relative h-2 w-2 rounded-full bg-primary" />
      </span>
    )
  }

  return (
    <span className="flex h-4 w-4 items-center justify-center">
      <span className="h-2 w-2 rounded-full border border-border bg-well" />
    </span>
  )
}

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
            "inline-flex items-center rounded-full px-2 py-0.5 text-[0.6875rem]",
            "[background-image:var(--gradient-raised)] border border-highlight",
            "[box-shadow:var(--shadow-raised-sm)]",
            "text-muted-foreground"
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
