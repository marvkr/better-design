import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

// Dark Neon AI Steps / Stepper component.
// Completed / active: neon-gradient indicator with the soft neon glow.
// Upcoming: quiet bg-muted well with a hairline border.

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
        orientation === "horizontal" ? "flex-row items-start gap-0" : "flex-col gap-0",
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
                orientation === "horizontal" ? "flex-col items-center" : "flex-row items-start gap-3"
              )}
            >
              {/* Step indicator */}
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-[background,box-shadow,color]",
                  isCompleted &&
                    "[background:var(--neon-gradient)] text-primary-foreground [box-shadow:var(--shadow-neon)]",
                  isActive &&
                    "[background:var(--neon-gradient)] text-primary-foreground [box-shadow:var(--shadow-neon)]",
                  !isCompleted && !isActive && "border border-border bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
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
