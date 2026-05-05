import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Step {
  id: string | number
  title: string
  description?: string
}

export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
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
        orientation === "horizontal"
          ? "flex items-start gap-0"
          : "flex flex-col gap-0",
        className
      )}
      {...props}
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isActive = index === currentStep
        const isUpcoming = index > currentStep
        const isLast = index === steps.length - 1

        return (
          <div
            key={step.id}
            className={cn(
              orientation === "horizontal"
                ? "flex flex-1 flex-col items-center"
                : "flex gap-4"
            )}
          >
            <div
              className={cn(
                orientation === "horizontal"
                  ? "flex w-full items-center"
                  : "flex flex-col items-center"
              )}
            >
              {/* Circle */}
              <div
                className={cn(
                  "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-all duration-200",
                  isCompleted && "bg-primary text-primary-foreground",
                  isActive && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                  isUpcoming && "bg-secondary text-muted-foreground border border-border"
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Connector */}
              {!isLast && (
                <div
                  className={cn(
                    "transition-all duration-200",
                    orientation === "horizontal"
                      ? "h-px flex-1 mx-2"
                      : "w-px flex-1 my-2 mx-auto",
                    isCompleted ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>

            {/* Label */}
            <div
              className={cn(
                orientation === "horizontal"
                  ? "mt-2 text-center px-1"
                  : "pb-6"
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
          </div>
        )
      })}
    </div>
  )
}

export { Steps }
