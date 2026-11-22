import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

// Talentboard Steps: completed markers wear the raised orange material.

interface Step {
  title: string;
  description?: string;
}

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[];
  currentStep: number;
  orientation?: "horizontal" | "vertical";
}

function Steps({ steps, currentStep, orientation = "horizontal", className, ...props }: StepsProps) {
  return (
    <div
      className={cn(
        "flex",
        orientation === "horizontal" ? "flex-row items-start" : "flex-col",
        className
      )}
      {...props}
    >
      {steps.map((step, index) => {
        const isComplete = index < currentStep;
        const isCurrent = index === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div
            key={index}
            className={cn(
              "flex",
              orientation === "horizontal" ? "flex-1 flex-col" : "flex-row gap-3"
            )}
          >
            <div
              className={cn(
                "flex items-center",
                orientation === "vertical" && "flex-col"
              )}
            >
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  "transition-all duration-fast",
                  isComplete &&
                    "bg-[image:var(--tb-primary-gradient)] text-primary-foreground shadow-[var(--tb-shadow-primary-sm)]",
                  isCurrent &&
                    "border border-ring/60 bg-secondary text-foreground shadow-[var(--tb-shadow-raise)]",
                  !isComplete && !isCurrent &&
                    "border border-border/70 bg-input/60 text-muted-foreground shadow-[var(--tb-shadow-inset)]"
                )}
              >
                {isComplete ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : index + 1}
              </span>
              {!isLast && (
                <span
                  className={cn(
                    "bg-border/70",
                    orientation === "horizontal" ? "mx-2 h-px flex-1" : "my-2 h-8 w-px",
                    isComplete && "bg-primary/50"
                  )}
                />
              )}
            </div>
            <div
              className={cn(
                orientation === "horizontal" ? "mt-2 pr-4" : "pb-6",
                isLast && orientation === "vertical" && "pb-0"
              )}
            >
              <div
                className={cn(
                  "text-sm font-medium",
                  isCurrent || isComplete ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.title}
              </div>
              {step.description && (
                <div className="mt-0.5 text-xs text-muted-foreground">{step.description}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { Steps };
export type { StepsProps, Step };
