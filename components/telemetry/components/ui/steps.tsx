import * as React from "react"

import { cn } from "@/lib/utils"

// Control Room Steps: sequence indicator.
// Square step tiles linked by hairline rails; completed steps carry the
// signal-green plate, the current step is an energized outline.

export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  currentStep?: number
}

const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  ({ className, currentStep = 0, children, ...props }, ref) => {
    const steps = React.Children.toArray(children)
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        {steps.map((_child, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <div
                className={cn(
                  "h-px flex-1",
                  index <= currentStep ? "bg-primary/60" : "bg-border"
                )}
              />
            )}
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-sm text-xs font-semibold transition-all duration-fast",
                index < currentStep &&
                  "bg-primary text-primary-foreground [box-shadow:var(--shadow-control)]",
                index === currentStep &&
                  "border border-primary/60 bg-primary/10 text-primary [box-shadow:0_0_0.625rem_oklch(0.78_0.21_148/0.25)]",
                index > currentStep &&
                  "border border-border bg-input text-muted-foreground"
              )}
            >
              {index + 1}
            </div>
          </React.Fragment>
        ))}
      </div>
    )
  }
)
Steps.displayName = "Steps"

const Step = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
))
Step.displayName = "Step"

export { Steps, Step }
