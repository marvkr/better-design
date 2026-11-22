import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * Ops Sharp Steps : a precise stepper. Completed indicators wear the solid
 * graphite tile (bg-primary + --shadow-primary, the primary Button material);
 * the active step is a white tile ringed in graphite; upcoming steps sit on the
 * muted secondary surface. Completed connectors fill graphite.
 */

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
                ? "flex-col items-center flex-1"
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
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-colors",
                  isCompleted &&
                    "bg-primary text-primary-foreground [box-shadow:var(--shadow-primary)]",
                  isActive &&
                    "border border-border bg-card text-foreground ring-2 ring-ring ring-offset-2 ring-offset-background",
                  !isCompleted &&
                    !isActive &&
                    "bg-secondary text-muted-foreground"
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
                    isCompleted ? "bg-primary" : "bg-border"
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
                  isCompleted ? "bg-primary" : "bg-border"
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
