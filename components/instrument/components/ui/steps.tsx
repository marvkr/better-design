import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

// Gauge Dark Steps: completed steps wear the machined gold control; the
// active step rims itself in gold over a recessed face; upcoming steps stay
// as quiet raised plates.

interface Step {
  title: string;
  description?: string;
}

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[];
  currentStep: number;
  orientation?: "horizontal" | "vertical";
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
        "flex",
        orientation === "horizontal"
          ? "flex-row items-start gap-0"
          : "flex-col gap-0",
        className
      )}
      {...props}
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div
            key={index}
            className={cn(
              "flex",
              orientation === "horizontal"
                ? "flex-1 flex-col items-center"
                : "flex-row gap-3"
            )}
          >
            <div
              className={cn(
                "flex",
                orientation === "horizontal"
                  ? "flex-col items-center"
                  : "flex-row items-start gap-3"
              )}
            >
              {/* Step indicator */}
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-all duration-fast",
                  isCompleted &&
                    "border border-[var(--gauge-rim)] bg-[linear-gradient(to_bottom,var(--gauge-grad-top),var(--gauge-grad-bottom))] text-primary-foreground shadow-[var(--shadow-primary)]",
                  isActive &&
                    "border border-[var(--gauge-rim)] bg-input text-primary shadow-[var(--shadow-well),var(--shadow-focus)]",
                  !isCompleted &&
                    !isActive &&
                    "border border-border bg-secondary text-muted-foreground shadow-[var(--shadow-raised)]"
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Connector line */}
              {orientation === "horizontal" && !isLast && (
                <div
                  className={cn(
                    "mt-4 h-px w-full flex-1",
                    isCompleted ? "bg-[var(--gauge-line)]" : "bg-border"
                  )}
                />
              )}
            </div>

            {/* Step content */}
            <div
              className={cn(
                orientation === "horizontal" ? "mt-2 text-center" : "pb-6"
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

            {/* Vertical connector */}
            {orientation === "vertical" && !isLast && (
              <div
                className={cn(
                  "ml-4 h-6 w-px",
                  isCompleted ? "bg-[var(--gauge-line)]" : "bg-border"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export { Steps };
export type { StepsProps, Step };
