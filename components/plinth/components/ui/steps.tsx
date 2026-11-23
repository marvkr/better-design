import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Plinth Steps: numbered markers in Geist Mono. A done step takes the
 * ember Button material with a check; the current step is a raised
 * graphite marker in an ember ring; a later step stays a recessed well.
 */

interface Step {
  title: string
  description?: string
}

interface StepsProps extends React.HTMLAttributes<HTMLOListElement> {
  steps: Step[]
  currentStep: number
  orientation?: "horizontal" | "vertical"
}

function Steps({ steps, currentStep, orientation = "horizontal", className, ...props }: StepsProps) {
  const horizontal = orientation === "horizontal"
  return (
    <ol
      data-slot="steps"
      className={cn("flex", horizontal ? "w-full flex-row items-start" : "flex-col", className)}
      {...props}
    >
      {steps.map((step, index) => {
        const done = index < currentStep
        const current = index === currentStep
        const last = index === steps.length - 1
        return (
          <li
            key={`${step.title}-${index}`}
            aria-current={current ? "step" : undefined}
            className={cn("flex min-w-0", horizontal ? "flex-1 flex-col" : "flex-row gap-3")}
          >
            <div className={cn("flex items-center", horizontal ? "flex-row" : "flex-col self-stretch")}>
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-medium",
                  "transition-[background,box-shadow,color] duration-base",
                  done && "text-primary-foreground [background:var(--ember-gradient)] [box-shadow:inset_0_0.0625rem_0_oklch(1_0_0/0.4),0_0_0_0.0625rem_var(--ember-rim)]",
                  current && "text-foreground [background:var(--segment-gradient)] [box-shadow:inset_0_0.0625rem_0_oklch(1_0_0/0.09),0_0_0_0.125rem_var(--ring)]",
                  !done && !current && "bg-input text-muted-foreground [box-shadow:var(--shadow-inset)]"
                )}
              >
                {done ? <CheckIcon className="size-3.5" /> : index + 1}
              </span>
              {!last && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "rounded-full",
                    horizontal ? "mx-2 h-0.5 flex-1" : "my-1.5 w-0.5 flex-1 min-h-6",
                    done ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
            <div className={cn("min-w-0", horizontal ? "mt-2.5 pr-3" : "pb-6 pt-1")}>
              <p className={cn("text-sm font-medium leading-tight", current || done ? "text-foreground" : "text-muted-foreground")}>
                {step.title}
              </p>
              {step.description && (
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{step.description}</p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

// feather:check
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 6L9 17l-5-5" />
    </svg>
  )
}

export { Steps }
export type { StepsProps, Step }
