import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// Neon Vault Steps: send-flow progress. Completed steps wear the hero magenta
// material with a check; the active step is a graphite pill lit by the magenta
// ring; upcoming steps stay quiet on the vault canvas.

interface Step {
  title: string
  description?: string
}

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[]
  currentStep: number
  orientation?: "horizontal" | "vertical"
}

function Steps({
  steps,
  currentStep,
  orientation = "horizontal",
  className,
  ...props
}: StepsProps) {
  return (
    <div
      className={cn(
        "flex",
        orientation === "horizontal"
          ? "flex-row items-start gap-0"
          : "flex-col gap-0",
        className
      )}
      {...props}
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isActive = index === currentStep
        const isLast = index === steps.length - 1

        return (
          <div
            key={index}
            className={cn(
              "flex",
              orientation === "horizontal"
                ? "flex-col items-center flex-1"
                : "flex-row gap-3"
            )}
          >
            <div
              className={cn(
                "flex",
                orientation === "horizontal"
                  ? "flex-col items-center"
                  : "flex-row items-start gap-3"
              )}
            >
              {/* Step indicator */}
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-colors",
                  isCompleted &&
                    "bg-primary [background-image:var(--gradient-primary)] text-primary-foreground [box-shadow:var(--shadow-button)]",
                  isActive &&
                    "bg-secondary text-primary-bright ring-2 ring-ring/60 ring-offset-2 ring-offset-background [box-shadow:var(--shadow-raised)]",
                  !isCompleted &&
                    !isActive &&
                    "border border-border bg-secondary text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Icon icon="ph:check-bold" className="h-4 w-4" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Connector line */}
              {orientation === "horizontal" && !isLast && (
                <div
                  className={cn(
                    "mt-4 h-px w-full flex-1",
                    isCompleted ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>

            {/* Step content */}
            <div
              className={cn(
                orientation === "horizontal" ? "mt-2 text-center" : "pb-6"
              )}
            >
              <p
                className={cn(
                  "text-sm font-medium",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.title}
              </p>
              {step.description && (
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {step.description}
                </p>
              )}
            </div>

            {/* Vertical connector */}
            {orientation === "vertical" && !isLast && (
              <div
                className={cn(
                  "ml-4 h-6 w-px",
                  isCompleted ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export { Steps }
export type { StepsProps, Step }
