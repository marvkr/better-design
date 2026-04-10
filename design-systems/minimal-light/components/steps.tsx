import * as React from "react"
import { cn } from "@/lib/utils"

// Luxe Steps: horizontal/vertical stepper
// Active = white circle with black number; completed = white ring with check; upcoming = muted

export interface Step {
  label: string
  description?: string
}

export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[]
  current: number
  orientation?: "horizontal" | "vertical"
}

function Steps({
  steps,
  current,
  orientation = "horizontal",
  className,
  ...props
}: StepsProps) {
  const isVertical = orientation === "vertical"

  return (
    <div
      className={cn(
        isVertical ? "flex flex-col gap-0" : "flex items-start gap-0",
        className
      )}
      {...props}
    >
      {steps.map((step, index) => {
        const isCompleted = index < current
        const isActive = index === current
        const isUpcoming = index > current
        const isLast = index === steps.length - 1

        return (
          <div
            key={index}
            className={cn(
              isVertical ? "flex gap-4" : "flex flex-col items-center",
              !isLast && (isVertical ? "pb-8" : "flex-1")
            )}
          >
            {/* Step indicator + connector */}
            <div className={cn(isVertical ? "flex flex-col items-center" : "flex items-center w-full")}>
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium tracking-wide transition-colors duration-200",
                  isCompleted && "bg-primary text-primary-foreground",
                  isActive && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                  isUpcoming && "bg-secondary text-muted-foreground border border-border"
                )}
              >
                {isCompleted ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "transition-colors duration-200",
                    isVertical
                      ? "mt-1 ml-0 w-px flex-1 min-h-[2rem] bg-border"
                      : "h-px flex-1 mx-2 bg-border"
                  )}
                />
              )}
            </div>
            {/* Label */}
            <div className={cn(isVertical ? "pt-1 pb-6" : "mt-2 text-center")}>
              <p
                className={cn(
                  "text-sm font-medium tracking-wide",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </p>
              {step.description && (
                <p className="mt-0.5 text-xs text-muted-foreground/70">
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
