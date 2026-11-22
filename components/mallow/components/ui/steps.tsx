import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { primaryFinish, selectedOption, optionTrack } from "./_shared";

/**
 * Mallow Steps: numbered marks joined by a lilac groove; a finished step
 * takes the violet primary finish with a check, the current step takes the
 * violet tint and ring, and steps ahead stay on the lilac track.
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
            <div className={cn("flex w-full items-start gap-3", orientation === "horizontal" ? "flex-row" : "flex-col")}>
              <div className="flex flex-col items-center self-stretch">
                <div
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full",
                    "transition-[background-color,box-shadow,color] duration-base ease-(--ease-out)",
                    isCompleted && primaryFinish,
                    isCurrent && cn(selectedOption, "text-foreground"),
                    !isCompleted && !isCurrent && cn(optionTrack, "text-muted-foreground"),
                  )}
                >
                  {isCompleted ? (
                    <Icon icon="iconoir:check" aria-hidden="true" className="size-4" />
                  ) : step.icon ? (
                    <Icon icon={step.icon} aria-hidden="true" className="size-4" />
                  ) : (
                    <span className="text-xs font-medium tabular-nums">{index + 1}</span>
                  )}
                </div>
                {orientation === "vertical" && !isLast && (
                  <div
                    className={cn(
                      "my-1.5 min-h-6 w-1 flex-1 rounded-full",
                      isCompleted ? "bg-primary" : optionTrack,
                    )}
                  />
                )}
              </div>
              <div className={cn("min-w-0 flex-1", orientation === "vertical" && "pb-6")}>
                <div
                  className={cn(
                    "text-sm font-medium leading-snug",
                    isCurrent || isCompleted ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {step.title}
                </div>
                {step.description && (
                  <div className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{step.description}</div>
                )}
              </div>
            </div>
            {orientation === "horizontal" && !isLast && (
              <div className="hidden w-full pr-3 sm:block">
                <div className={cn("h-1 w-full rounded-full", isCompleted ? "bg-primary" : optionTrack)} />
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
