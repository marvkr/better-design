import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

/** Props for Steps: the zero-based index of the step the user is on. */
export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  currentStep?: number;
}

type StepState = "complete" | "current" | "upcoming";

const badgeTone = {
  complete:
    "border-[0.09375rem] border-(--primary-rim) bg-primary text-primary-foreground shadow-(--shadow-control)",
  current:
    "border-[0.09375rem] border-(--ink) bg-card text-foreground shadow-(--shadow-control-off)",
  upcoming: "border-[0.09375rem] border-(--line-strong) bg-card text-muted-foreground",
} as const satisfies Record<StepState, string>;

/**
 * Playful console Steps: a row of numbered square badges joined by lines.
 *
 * A finished step becomes a small orange key with a bold check. The current
 * step is a white key with an ink edge, and steps still to come are white
 * badges with an olive edge in the muted ink. The line into a reached step
 * turns orange and thickens. Each child is a step, shown as the label
 * beside its badge.
 */
const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  ({ className, currentStep = 0, children, ...props }, ref) => {
    const steps = React.Children.toArray(children);

    return (
      <div
        ref={ref}
        role="list"
        data-slot="steps"
        className={cn("flex items-center gap-3", className)}
        {...props}
      >
        {steps.map((child, index) => {
          const state: StepState =
            index < currentStep
              ? "complete"
              : index === currentStep
                ? "current"
                : "upcoming";

          return (
            <React.Fragment key={index}>
              {index > 0 && (
                <div
                  aria-hidden="true"
                  data-slot="steps-connector"
                  className={cn(
                    "min-w-6 flex-1 rounded-full transition-colors duration-fast ease-out",
                    index <= currentStep ? "h-0.5 bg-primary" : "h-px bg-(--line-strong)",
                  )}
                />
              )}
              <div
                role="listitem"
                data-slot="steps-item"
                data-state={state}
                aria-current={state === "current" ? "step" : undefined}
                className="group/step flex shrink-0 items-center gap-2"
              >
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-md font-mono text-sm font-semibold tabular-nums",
                    "transition-[background-color,border-color,color,box-shadow] duration-fast ease-out",
                    badgeTone[state],
                  )}
                >
                  {state === "complete" ? (
                    <>
                      <Icon icon="ph:check-bold" className="size-3.5" aria-hidden="true" />
                      <span className="sr-only">Step {index + 1}, done</span>
                    </>
                  ) : (
                    index + 1
                  )}
                </span>
                {child}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    );
  },
);
Steps.displayName = "Steps";

/**
 * A single step's label: bold ink once reached, muted while still ahead.
 */
const Step = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="step"
    className={cn(
      "text-sm font-bold text-foreground empty:hidden group-data-[state=upcoming]/step:font-medium group-data-[state=upcoming]/step:text-muted-foreground",
      className,
    )}
    {...props}
  />
));
Step.displayName = "Step";

export { Steps, Step };
