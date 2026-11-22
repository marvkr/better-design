import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  currentStep?: number;
}

type StepState = "complete" | "current" | "upcoming";

const discTone = {
  complete: "bg-primary text-primary-foreground",
  current: "border-2 border-primary bg-background text-foreground",
  upcoming: "border border-(--line-strong) bg-background text-muted-foreground",
} as const satisfies Record<StepState, string>;

/**
 * Bold retail Steps: the checkout progress row, such as Bag, Delivery,
 * Payment. Each step is a round numbered disc joined to the next by a
 * hairline. A finished step is a solid black disc with a white check, the
 * current one is white with a black ring, and the steps ahead are grey. The
 * line into a reached step turns black. Each child is one step's label.
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
                    "h-px min-w-6 flex-1 transition-colors duration-fast ease-out",
                    index <= currentStep ? "bg-primary" : "bg-border",
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
                    "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-medium tabular-nums",
                    "transition-[background-color,border-color,color] duration-fast ease-out",
                    discTone[state],
                  )}
                >
                  {state === "complete" ? (
                    <>
                      <Icon icon="mingcute:check-line" className="size-4" aria-hidden="true" />
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

/** One step's label: black once reached, grey while it is still ahead. */
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
