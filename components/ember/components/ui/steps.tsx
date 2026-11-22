"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

// Amber Glass Steps: completed steps carry the amber material; the current
// step glows.

interface Step {
  title: string
  description?: string
}

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[]
  currentStep: number
  orientation?: "horizontal" | "vertical"
}

const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  ({ className, steps, currentStep, orientation = "horizontal", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex",
        orientation === "vertical" ? "flex-col gap-0" : "flex-row items-start gap-0",
        className
      )}
      {...props}
    >
      {steps.map((step, i) => {
        const complete = i < currentStep
        const active = i === currentStep
        const isLast = i === steps.length - 1

        return (
          <div
            key={i}
            className={cn(
              "flex flex-1",
              orientation === "vertical" ? "flex-row gap-3" : "flex-col gap-2"
            )}
          >
            <div
              className={cn(
                "flex items-center",
                orientation === "vertical" ? "flex-col" : "flex-row"
              )}
            >
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-base",
                  complete &&
                    "bg-[image:var(--ag-primary-grad)] text-primary-foreground shadow-[var(--shadow-primary)]",
                  active &&
                    "bg-[var(--ag-fill-hover)] text-primary border border-[color:oklch(0.69_0.195_42/0.5)] shadow-[0_0_0.75rem_oklch(0.69_0.195_42/0.25)]",
                  !complete &&
                    !active &&
                    "bg-[var(--ag-well)] text-muted-foreground border border-[color:var(--ag-border)] shadow-[var(--shadow-well)]"
                )}
                aria-current={active ? "step" : undefined}
              >
                {complete ? <Icon icon="tabler:check" className="h-3.5 w-3.5" /> : i + 1}
              </span>
              {!isLast && (
                <span
                  className={cn(
                    "bg-[var(--ag-border)]",
                    orientation === "vertical"
                      ? "my-1 h-full min-h-6 w-px"
                      : "mx-2 h-px flex-1 min-w-6",
                    complete && "bg-[oklch(0.69_0.195_42/0.5)]"
                  )}
                />
              )}
            </div>
            <div
              className={cn(
                "flex flex-col gap-0.5",
                orientation === "vertical" ? "pb-6" : "pr-4"
              )}
            >
              <span
                className={cn(
                  "text-sm font-semibold tracking-[-0.01em]",
                  active || complete ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.title}
              </span>
              {step.description && (
                <span className="text-xs text-muted-foreground">{step.description}</span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
)
Steps.displayName = "Steps"

export { Steps }
export type { StepsProps, Step }
