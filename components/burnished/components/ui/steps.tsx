import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { creamBevel, wellInset } from "./_shared";

/**
 * Burnished Steps: numbered studs joined by a recessed groove. A finished
 * step is a cream bevel with a check, the current step is a graphite bevel
 * with a glow halo, and the steps ahead sit pressed into the page. The
 * groove fills with cream as the reader moves forward.
 */
export interface Step {
  title: string;
  description?: string;
  icon?: string;
}

export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[];
  currentStep: number;
  orientation?: "horizontal" | "vertical";
}

const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  ({ className, steps, currentStep, orientation = "horizontal", ...props }, ref) => (
    <div
      ref={ref}
      data-slot="steps"
      data-orientation={orientation}
      className={cn(
        "flex",
        orientation === "horizontal" ? "flex-row items-start" : "flex-col",
        className,
      )}
      {...props}
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div
            key={index}
            data-state={isCompleted ? "complete" : isCurrent ? "current" : "upcoming"}
            aria-current={isCurrent ? "step" : undefined}
            className={cn(
              "flex gap-3",
              orientation === "horizontal" ? "flex-1 flex-col items-start" : "flex-row",
            )}
          >
            <div
              className={cn(
                "flex w-full items-start gap-3",
                orientation === "horizontal" ? "flex-row" : "flex-col",
              )}
            >
              <div className="flex flex-col items-center self-stretch">
                <div
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full",
                    "transition-[background-image,box-shadow,color] duration-base ease-(--ease-out)",
                    isCompleted && creamBevel,
                    isCurrent &&
                      "bg-(image:--fill-raised) text-primary-text shadow-(--bevel-raised-focus) ring-3 ring-ring",
                    !isCompleted && !isCurrent && cn(wellInset, "text-muted-foreground"),
                  )}
                >
                  {isCompleted ? (
                    <Icon icon="ph:check-bold" className="size-4" />
                  ) : step.icon ? (
                    <Icon icon={step.icon} className="size-4" />
                  ) : (
                    <span className="text-xs font-semibold tabular-nums">{index + 1}</span>
                  )}
                </div>
                {orientation === "vertical" && !isLast && (
                  <div
                    className={cn(
                      "my-1.5 min-h-6 w-1 flex-1 rounded-full",
                      isCompleted ? creamBevel : wellInset,
                    )}
                  />
                )}
              </div>
              <div className={cn("min-w-0 flex-1", orientation === "vertical" && "pb-6")}>
                <div
                  className={cn(
                    "text-sm font-semibold leading-snug",
                    isCurrent || isCompleted ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {step.title}
                </div>
                {step.description && (
                  <div className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {step.description}
                  </div>
                )}
              </div>
            </div>
            {orientation === "horizontal" && !isLast && (
              <div className="hidden w-full pr-3 sm:block">
                <div
                  className={cn("h-1 w-full rounded-full", isCompleted ? creamBevel : wellInset)}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  ),
);
Steps.displayName = "Steps";

export { Steps };
