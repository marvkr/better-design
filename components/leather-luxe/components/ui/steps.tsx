import * as React from "react"

import { cn } from "@/lib/utils"

// Leather Luxe Steps: completed steps are cognac leather coins; the current
// step is a raised charcoal coin; the connecting thread warms as it fills.

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
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium",
                "transition-[background,box-shadow,color] duration-base",
                index < currentStep &&
                  "[background-image:var(--gradient-leather)] text-primary-foreground border border-[oklch(0.68_0.115_58/0.55)] [box-shadow:var(--shadow-leather-sm)]",
                index === currentStep &&
                  "[background-image:var(--gradient-raised)] text-foreground border border-highlight [box-shadow:var(--shadow-raised-sm)]",
                index > currentStep &&
                  "bg-well text-muted-foreground border border-border [box-shadow:var(--shadow-well)]"
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
