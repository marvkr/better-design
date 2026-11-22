"use client"

import * as React from "react"
import { motion, type HTMLMotionProps } from "motion/react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

// Ported from fluid-functionalism (mickadesign): https://github.com/mickadesign/fluid-functionalism

// Amber Glass ThinkingSteps: agent progress rail; completed nodes carry the
// amber material, the active node pulses.

type StepStatus = "complete" | "active" | "pending"

interface ThinkingStepsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function ThinkingSteps({ className, children, ...props }: ThinkingStepsProps) {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
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
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn("flex gap-3", className)}
      {...props}
    >
      <div className="flex flex-col items-center">
        <span
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.625rem] font-bold transition-all",
            status === "complete" &&
              "bg-[image:var(--ag-primary-grad)] text-primary-foreground shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.32),0_0_0.5rem_oklch(0.69_0.195_42/0.35)]",
            status === "active" &&
              "border border-[color:oklch(0.69_0.195_42/0.5)] bg-[var(--ag-fill-hover)] text-primary shadow-[0_0_0.625rem_oklch(0.69_0.195_42/0.25)]",
            status === "pending" &&
              "border border-[color:var(--ag-border)] bg-[var(--ag-well)] text-muted-foreground"
          )}
        >
          {status === "complete" ? (
            <Icon icon="tabler:check" className="h-3 w-3" />
          ) : status === "active" ? (
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          ) : (
            <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
          )}
        </span>
        {showConnector && (
          <span
            className={cn(
              "w-px flex-1 min-h-4",
              status === "complete"
                ? "bg-[oklch(0.69_0.195_42/0.5)]"
                : "bg-[var(--ag-border)]"
            )}
          />
        )}
      </div>
      <div className={cn("flex flex-col gap-0.5", showConnector && "pb-4")}>
        <span
          className={cn(
            "text-sm font-semibold tracking-[-0.01em]",
            status === "pending" ? "text-muted-foreground" : "text-foreground"
          )}
        >
          {title}
        </span>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
      </div>
    </motion.div>
  )
}

interface ThinkingStepSourcesProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function ThinkingStepSources({ className, children, ...props }: ThinkingStepSourcesProps) {
  return (
    <div
      className={cn(
        "mt-1.5 flex flex-wrap items-center gap-1.5 [&>*]:rounded-full [&>*]:bg-[var(--ag-fill)] [&>*]:border [&>*]:border-[color:var(--ag-border)] [&>*]:px-2 [&>*]:py-0.5 [&>*]:text-[0.6875rem] [&>*]:font-medium [&>*]:text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { ThinkingSteps, ThinkingStep, ThinkingStepSources }
export type { ThinkingStepsProps, ThinkingStepProps, StepStatus }
