import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

/*
 * Bevel Steps.
 *
 * Three states, three surfaces, no borders. A completed step takes the primary
 * Button's own gradient and shadow, so progress reads as the same material as
 * the control that made it. The current step sits on the card with the button
 * shadow, and a step still ahead is a well pressed into the page. The
 * connector between markers is one pixel of the track, and it turns to the
 * accent once the step behind it is done.
 */

/** One step in a `Steps` run. `icon` accepts any Iconify glyph name. */
export interface Step {
  title: string
  description?: string
  icon?: string
}

/** Props for `Steps`; `currentStep` is the zero-based index of the live step. */
export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[]
  currentStep: number
  orientation?: "horizontal" | "vertical"
}

const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  (
    { className, steps, currentStep, orientation = "horizontal", ...props },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "flex",
        orientation === "horizontal" ? "flex-row items-start" : "flex-col",
        className,
      )}
      {...props}
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isCurrent = index === currentStep
        const isLast = index === steps.length - 1

        return (
          <div
            key={index}
            className={cn(
              "flex gap-3",
              orientation === "horizontal" ?
                "flex-1 flex-col items-start"
              : "flex-row",
            )}
          >
            <div
              className={cn(
                "flex w-full items-start gap-3",
                orientation === "horizontal" ? "flex-row" : "flex-col",
              )}
            >
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full",
                    "transition-[background-color,background-image,box-shadow] duration-base ease-out",
                    isCompleted &&
                      "text-primary-foreground bg-[linear-gradient(180deg,var(--primary-from)_0%,var(--primary-to)_100%)] [box-shadow:var(--shadow-primary)]",
                    isCurrent &&
                      "bg-card text-primary [box-shadow:var(--shadow-button)]",
                    !isCompleted &&
                      !isCurrent &&
                      "bg-[var(--inner)] text-muted-foreground [box-shadow:var(--shadow-inset)]",
                  )}
                >
                  {isCompleted ?
                    <Icon icon="solar:check-read-linear" className="size-4" />
                  : step.icon ?
                    <Icon icon={step.icon} className="size-4" />
                  : <span className="text-[0.7813rem] leading-4 font-semibold tracking-[0.0188rem]">
                      {index + 1}
                    </span>
                  }
                </div>
                {orientation === "vertical" && !isLast && (
                  <div
                    className={cn(
                      "my-1 min-h-6 w-px flex-1",
                      isCompleted ? "bg-[var(--primary)]" : "bg-[var(--track)]",
                    )}
                  />
                )}
              </div>
              <div
                className={cn(
                  orientation === "vertical" && "pb-6",
                  "min-w-0 flex-1",
                )}
              >
                <div
                  className={cn(
                    "text-[0.9063rem] leading-[1.125rem] font-semibold tracking-[-0.0125rem]",
                    isCurrent ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {step.title}
                </div>
                {step.description && (
                  <div className="mt-1 text-[0.7813rem] leading-4 tracking-[0.0188rem] text-muted-foreground">
                    {step.description}
                  </div>
                )}
              </div>
            </div>
            {orientation === "horizontal" && !isLast && (
              <div className="mt-4 hidden w-full sm:block">
                <div
                  className={cn(
                    "h-px w-full",
                    index < currentStep ?
                      "bg-[var(--primary)]"
                    : "bg-[var(--track)]",
                  )}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  ),
)
Steps.displayName = "Steps"

export { Steps }
