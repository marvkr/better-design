import * as React from "react"
import { cn } from "@/lib/utils"

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
                  "h-px flex-1",
                  index <= currentStep ? "bg-primary/50" : "bg-white/10"
                )}
              />
            )}
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-all duration-200",
                index < currentStep &&
                  "bg-primary/80 text-white shadow-[0_0_12px_oklch(0.65_0.19_250/0.3)]",
                index === currentStep &&
                  "backdrop-blur-xl bg-white/[0.1] text-white shadow-[inset_0_0_8px_rgba(255,255,255,0.15),0_0_12px_oklch(0.65_0.19_250/0.2)]",
                index > currentStep &&
                  "bg-white/[0.04] text-muted-foreground"
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
