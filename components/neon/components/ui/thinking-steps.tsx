"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

// Ported from fluid-functionalism (mickadesign): https://github.com/mickadesign/fluid-functionalism

// neon ThinkingSteps: chain-of-thought display. The motion/react
// enter/height animations from the reference are dropped (banned dep); the
// active step pulses its neon dot and completed steps show a neon check.
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
    <div
      className={cn("relative flex flex-col gap-3", className)}
      {...props}
    >
      {children}
    </div>
  )
}

interface ThinkingStepProps extends React.HTMLAttributes<HTMLDivElement> {
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
    <div
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
              status === "complete" && "bg-primary/40"
            )}
            aria-hidden
          />
        )}
      </div>
      <div className="flex flex-col gap-1 pb-3 -mt-0.5">
        <span
          className={cn(
            "text-[0.8125rem] font-medium leading-5",
            status === "pending" && "text-muted-foreground",
            status === "active" && "text-foreground",
            status === "complete" && "text-foreground"
          )}
        >
          {title}
        </span>
        {description && status !== "pending" && (
          <div className="overflow-hidden text-[0.75rem] leading-5 text-muted-foreground">
            {description}
          </div>
        )}
      </div>
    </div>
  )
}

function StatusDot({ status }: { status: StepStatus }) {
  if (status === "complete") {
    return (
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
      </span>
    )
  }

  if (status === "active") {
    return (
      <span className="relative flex h-4 w-4 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
        <span className="relative h-2 w-2 rounded-full bg-primary" />
      </span>
    )
  }

  return (
    <span className="flex h-4 w-4 items-center justify-center">
      <span className="h-2 w-2 rounded-full border border-border bg-background" />
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
      {React.Children.map(children, (child) => (
        <span className="inline-flex items-center rounded-[0.5rem] border border-border bg-background px-2 py-0.5 text-[0.6875rem] text-muted-foreground">
          {child}
        </span>
      ))}
    </div>
  )
}

export { ThinkingSteps, ThinkingStep, ThinkingStepSources }
export type { ThinkingStepsProps, ThinkingStepProps, StepStatus }
