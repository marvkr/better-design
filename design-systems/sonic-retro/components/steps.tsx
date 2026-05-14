import * as React from "react"
import { cn } from "@/lib/utils"

// Tactile Minimal Steps: step wizard with numbered indicators

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
        {steps.map((child, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <div
                className={cn(
                  "h-px flex-1 transition-colors duration-150",
                  index <= currentStep ? "bg-primary" : "bg-border"
                )}
              />
            )}
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium",
                "transition-all duration-150",
                index < currentStep &&
                  "bg-primary text-primary-foreground",
                index === currentStep &&
                  "bg-background text-foreground border border-border ring-2 ring-primary ring-offset-2 ring-offset-background",
                index > currentStep &&
                  "bg-muted text-muted-foreground border border-border"
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
