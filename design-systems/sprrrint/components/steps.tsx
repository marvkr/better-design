import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Step {
  title: string
  description?: string
}

export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[]
  currentStep?: number
  orientation?: "horizontal" | "vertical"
}

const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  ({ steps, currentStep = 0, orientation = "horizontal", className, ...props }, ref) => {
    const isVertical = orientation === "vertical"

    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          isVertical ? "flex-col gap-0" : "flex-row items-center gap-0",
          className
        )}
        {...props}
      >
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isActive    = index === currentStep
          const isLast      = index === steps.length - 1

          return (
            <div
              key={index}
              className={cn(
                "flex",
                isVertical ? "flex-col" : "flex-row items-center",
                !isLast && (isVertical ? "pb-0" : "flex-1"),
              )}
            >
              <div className={cn("flex", isVertical ? "flex-row items-start gap-3" : "flex-col items-center")}>
                {/* Circle */}
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                    isCompleted && "bg-primary text-primary-foreground",
                    isActive    && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                    !isCompleted && !isActive && "bg-secondary text-muted-foreground border border-border",
                  )}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : <span>{index + 1}</span>}
                </div>

                {/* Label */}
                <div className={cn("text-center", isVertical && "text-left flex-1 pb-6")}>
                  <p className={cn("text-sm font-semibold leading-tight mt-1.5",
                    isActive || isCompleted ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                  )}
                </div>
              </div>

              {/* Connector */}
              {!isLast && (
                isVertical ? (
                  <div
                    className={cn(
                      "ml-4 w-0.5 flex-1 min-h-[1.5rem] -mt-4",
                      isCompleted ? "bg-primary" : "bg-border",
                    )}
                  />
                ) : (
                  <div
                    className={cn(
                      "flex-1 h-0.5 mx-3 -mt-6",
                      isCompleted ? "bg-primary" : "bg-border",
                    )}
                  />
                )
              )}
            </div>
          )
        })}
      </div>
    )
  }
)
Steps.displayName = "Steps"

export { Steps }
