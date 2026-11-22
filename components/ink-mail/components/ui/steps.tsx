import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  currentStep?: number;
}

type StepState = "complete" | "current" | "upcoming";

const discTone = {
  complete: "border border-primary bg-primary text-primary-foreground",
  current: "border border-foreground bg-(--wash) text-foreground",
  upcoming: "border border-(--line-strong) bg-card text-muted-foreground",
} as const satisfies Record<StepState, string>;

/**
 * Ink mail Steps: a row of small numbered discs joined by hairlines, the way
 * a domain setup or onboarding flow counts its stages.
 *
 * A finished step takes the off-white primary fill with a black check. The
 * current step is edged in full ink over the white wash, and steps still to
 * come are quiet outlined discs in caption ink. The hairline into a reached
 * step brightens to the strong edge.
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
                    "h-0.25 min-w-6 flex-1 transition-colors duration-fast ease-out",
                    index <= currentStep ? "bg-foreground/40" : "bg-border",
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
                    "flex size-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-medium tabular-nums",
                    "transition-[background-color,border-color,color] duration-fast ease-out",
                    discTone[state],
                  )}
                >
                  {state === "complete" ? (
                    <>
                      <Icon icon="ph:check" className="size-3.5" aria-hidden="true" />
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
 * A single step's label: full ink once reached, caption ink while it is
 * still ahead.
 */
const Step = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="step"
    className={cn(
      "text-sm font-medium text-foreground empty:hidden group-data-[state=upcoming]/step:text-muted-foreground",
      className,
    )}
    {...props}
  />
));
Step.displayName = "Step";

export { Steps, Step };
