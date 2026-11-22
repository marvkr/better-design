import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * Interior Steps — the three materials in a column. A completed tile takes the
 * primary Button's flat ink fill and thumb shadow; the current tile is a
 * pressable cap lifted to the surface; upcoming tiles stay recessed wells.
 * Step numbers are counts, so they run mono. Connectors are 2px-radius rails
 * at border weight; done is said with ink, never blue.
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
    <ol ref={ref} className={cn("flex flex-col", className)} {...props}>
      {steps.map((step, index) => {
        const done = index < current;
        const active = index === current;
        const last = index === steps.length - 1;

        return (
          <li key={step.title} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-[0.5rem]",
                  "font-mono text-[0.6563rem] tabular-nums",
                  "transition-[background-color,box-shadow] duration-fast",
                  done &&
                    "bg-primary text-primary-foreground shadow-[var(--shadow-thumb)]",
                  active && "bg-card text-foreground shadow-[var(--shadow-cap)]",
                  !done &&
                    !active &&
                    "bg-secondary text-muted-foreground shadow-[var(--shadow-well)]",
                )}
              >
                {done ? (
                  <Check className="size-3" strokeWidth={2.5} />
                ) : (
                  index + 1
                )}
              </span>
              {!last ? (
                <span
                  aria-hidden
                  className="mt-1 mb-1 w-0.5 flex-1 rounded-[0.125rem] bg-border"
                />
              ) : null}
            </div>
            <div className={cn("space-y-0.5", !last && "pb-4")}>
              <p
                className={cn(
                  "text-[0.8125rem] font-medium",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step.title}
              </p>
              {step.description ? (
                <p className="text-[0.7813rem] leading-relaxed text-muted-foreground">
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
