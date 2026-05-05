import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

// Dynamic Steps: horizontal stepper with primary active, card completed

interface Step {
  label: string
  description?: string
}

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[]
  current: number
  orientation?: "horizontal" | "vertical"
}

function Steps({ steps, current, orientation = "horizontal", className, ...props }: StepsProps) {
  return (
    <div
      className={cn(
        orientation === "horizontal" ? "flex items-start" : "flex flex-col",
        className
      )}
      {...props}
    >
      {steps.map((step, index) => {
        const status = index < current ? "completed" : index === current ? "active" : "upcoming"
        const isLast = index === steps.length - 1

        return (
          <div
            key={index}
            className={cn(
              "flex",
              orientation === "horizontal" ? "flex-1 flex-col items-center" : "gap-3",
              orientation === "vertical" && !isLast && "pb-6"
            )}
          >
            <div className={cn("flex items-center", orientation === "horizontal" ? "w-full" : "flex-col")}>
              {/* Connector before */}
              {orientation === "horizontal" && index > 0 && (
                <div className={cn("h-px flex-1 transition-colors", status !== "upcoming" ? "bg-primary" : "bg-border")} />
              )}
              {orientation === "vertical" && index > 0 && (
                <div className={cn("w-px flex-1 transition-colors", status !== "upcoming" ? "bg-primary" : "bg-border")} />
              )}

              {/* Circle */}
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-all",
                  "ring-2 ring-offset-2 ring-offset-background",
                  status === "completed" && "bg-primary text-primary-foreground ring-primary",
                  status === "active" && "bg-primary text-primary-foreground ring-primary shadow-[0_4px_14px_0_hsl(212_100%_47%/0.4)]",
                  status === "upcoming" && "bg-secondary text-muted-foreground ring-transparent"
                )}
              >
                {status === "completed" ? <Check className="h-4 w-4" /> : index + 1}
              </div>

              {/* Connector after */}
              {orientation === "horizontal" && !isLast && (
                <div className={cn("h-px flex-1 transition-colors", status === "completed" ? "bg-primary" : "bg-border")} />
              )}
            </div>

            {/* Label */}
            <div className={cn("mt-2 text-center", orientation === "vertical" && "mt-0 ml-3")}>
              <p className={cn("text-sm font-medium", status === "upcoming" ? "text-muted-foreground" : "text-foreground")}>
                {step.label}
              </p>
              {step.description && (
                <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export { Steps }
export type { StepsProps }
