import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { primaryFace, raisedSurface, wellInset } from "./_shared";

/** One step: a title, an optional description and an optional icon name. */
export interface Step {
  title: string;
  description?: string;
  icon?: string;
}

/** Props for a numbered row or column of steps. */
export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[];
  currentStep: number;
  orientation?: "horizontal" | "vertical";
}

/**
 * Paddock Steps: round markers joined by a thin grey track. A finished step
 * is the teal fill with a check, the current step is a raised white circle
 * with a teal ring, and the steps ahead sit in a flat grey well. The track
 * turns teal as the reader moves forward.
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
            <div
              className={cn("flex w-full items-start gap-3", orientation === "horizontal" ? "flex-row" : "flex-col")}
            >
              <div className="flex flex-col items-center self-stretch">
                <div
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full",
                    "transition-[background-color,box-shadow,color] duration-base ease-out",
                    isCompleted && primaryFace,
                    isCurrent && cn(raisedSurface, "text-foreground ring-2 ring-primary"),
                    !isCompleted && !isCurrent && cn(wellInset, "text-muted-foreground"),
                  )}
                >
                  {isCompleted ? (
                    <Icon icon="mingcute:check-line" aria-hidden="true" className="size-3.5" />
                  ) : step.icon ? (
                    <Icon icon={step.icon} aria-hidden="true" className="size-3.5" />
                  ) : (
                    <span className="text-xs font-semibold tabular-nums">{index + 1}</span>
                  )}
                </div>
                {orientation === "vertical" && !isLast && (
                  <div
                    aria-hidden="true"
                    className={cn("my-1.5 min-h-5 w-0.5 flex-1 rounded-xs", isCompleted ? "bg-primary" : "bg-(--track)")}
                  />
                )}
              </div>
              <div className={cn("min-w-0 flex-1 pt-1", orientation === "vertical" && "pb-5")}>
                <div
                  className={cn(
                    "text-sm font-medium",
                    isCurrent || isCompleted ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {step.title}
                </div>
                {step.description && (
                  <div className="mt-0.5 text-[0.8125rem] text-muted-foreground">{step.description}</div>
                )}
              </div>
            </div>
            {orientation === "horizontal" && !isLast && (
              <div aria-hidden="true" className="hidden w-full pr-3 sm:block">
                <div className={cn("h-1 w-full rounded-xs", isCompleted ? "bg-primary" : "bg-(--track)")} />
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
