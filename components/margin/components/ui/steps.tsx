import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

/** One step: a title, an optional line under it and an optional solar icon. */
export interface Step {
  title: string;
  description?: string;
  icon?: string;
}

/** Props for the stepper: the steps, the current index and the direction. */
export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[];
  currentStep: number;
  orientation?: "horizontal" | "vertical";
}

/**
 * Margin Steps: numbered marks joined by a hairline track. A finished step is
 * solid oxblood with a tick, the current step is a paper tab with an oxblood edge
 * and halo, and the steps ahead sit on the paper field. The track turns oxblood
 * behind the reader.
 */
const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  ({ className, steps, currentStep, orientation = "horizontal", ...props }, ref) => (
    <div
      ref={ref}
      data-slot="steps"
      data-orientation={orientation}
      className={cn("flex", orientation === "horizontal" ? "flex-row items-start" : "flex-col", className)}
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
            className={cn("flex gap-3", orientation === "horizontal" ? "flex-1 flex-col items-start" : "flex-row")}
          >
            <div className={cn("flex w-full items-start gap-2.5", orientation === "horizontal" ? "flex-row" : "flex-col")}>
              <div className="flex flex-col items-center self-stretch">
                <div
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full",
                    "transition-colors duration-base ease-(--ease-out)",
                    isCompleted && "bg-primary text-primary-foreground",
                    isCurrent && "bg-card text-(--primary-text) ring-2 ring-primary/70 shadow-sm",
                    !isCompleted && !isCurrent && "bg-(--field) text-muted-foreground",
                  )}
                >
                  {isCompleted ? (
                    <Icon icon="solar:check-read-linear" className="size-3.5" aria-hidden />
                  ) : step.icon ? (
                    <Icon icon={step.icon} className="size-3.5" aria-hidden />
                  ) : (
                    <span className="text-xs font-medium tabular-nums">{index + 1}</span>
                  )}
                </div>
                {orientation === "vertical" && !isLast && (
                  <div
                    aria-hidden
                    className={cn("my-1.5 min-h-5 w-0.5 flex-1 rounded-full", isCompleted ? "bg-primary" : "bg-border")}
                  />
                )}
              </div>
              <div className={cn("min-w-0 flex-1 pt-0.5", orientation === "vertical" && "pb-5")}>
                <div
                  className={cn(
                    "text-sm font-medium leading-snug",
                    isCurrent || isCompleted ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {step.title}
                </div>
                {step.description && (
                  <div className="mt-0.5 text-xs leading-snug text-muted-foreground">{step.description}</div>
                )}
              </div>
            </div>
            {orientation === "horizontal" && !isLast && (
              <div aria-hidden className="hidden w-full pe-3 sm:block">
                <div className={cn("h-0.5 w-full rounded-full", isCompleted ? "bg-primary" : "bg-border")} />
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
