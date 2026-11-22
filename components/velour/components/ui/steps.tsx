import * as React from "react"
import { cn } from "@/lib/utils"

/*
 * Completed steps wear the champagne primary material; the current step
 * is a raised velour disc; upcoming steps stay recessed.
 */

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
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-all duration-base",
                index < currentStep &&
                  "[background-image:var(--champagne)] text-primary-foreground [box-shadow:var(--shadow-primary)]",
                index === currentStep &&
                  "[background-image:var(--velour-raised)] text-foreground [box-shadow:var(--shadow-button)]",
                index > currentStep &&
                  "bg-input text-muted-foreground [box-shadow:var(--shadow-inset)]"
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
