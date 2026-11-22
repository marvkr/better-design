import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * Playdesk Steps — completed markers take the primary Button's blue gradient,
 * the current one gets the focus halo, and the rest stay recessed wells.
 */

export interface Step {
  title: string;
  description?: string;
}

export interface StepsProps extends React.HTMLAttributes<HTMLOListElement> {
  steps: Step[];
  current?: number;
}

const Steps = React.forwardRef<HTMLOListElement, StepsProps>(
  ({ className, steps, current = 0, ...props }, ref) => (
    <ol ref={ref} className={cn("space-y-4", className)} {...props}>
      {steps.map((step, index) => {
        const done = index < current;
        const active = index === current;

        return (
          <li key={step.title} className="flex gap-3">
            <span
              className={cn(
                "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                done &&
                  "[background-image:var(--fill-primary)] text-primary-foreground [box-shadow:var(--shadow-primary)]",
                active &&
                  "bg-card text-foreground [box-shadow:var(--shadow-rim)] ring-[0.1875rem] ring-ring/25",
                !done &&
                  !active &&
                  "bg-secondary text-muted-foreground [box-shadow:var(--shadow-track-inset)]",
              )}
            >
              {done ? <Check className="size-3.5" strokeWidth={3} /> : index + 1}
            </span>
            <div className="space-y-0.5 pb-1">
              <p
                className={cn(
                  "text-sm font-medium",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step.title}
              </p>
              {step.description ? (
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  ),
);
Steps.displayName = "Steps";

export { Steps };
