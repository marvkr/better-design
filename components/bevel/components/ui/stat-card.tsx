import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { Card } from "./card"

/*
 * Bevel StatCard.
 *
 * Built on the Card, so a metric tile and a content card are the same surface.
 * The label sits at the 12.5px step above a 26px number, which is the greeting
 * step and the only place a dashboard needs it. The glyph sits in an inner
 * well, and the delta uses the success and destructive tokens rather than a
 * color of its own.
 */

/** Props for `StatCard`; `icon` takes an Iconify name such as a Solar glyph. */
export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: React.ReactNode
  icon?: string
  change?: {
    value: string | number
    direction?: "up" | "down" | "neutral"
  }
  description?: React.ReactNode
}

/** Narrows a stat delta to a number, so a negative one points the trend down. */
function isNumericDelta<TValue>(value: TValue | number): value is number {
  return typeof value === "number"
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    { className, label, value, icon, change, description, ...props },
    ref,
  ) => {
    const delta = change?.value
    const direction =
      change?.direction ?? (isNumericDelta(delta) && delta < 0 ? "down" : "up")
    const changeColor =
      direction === "up" ? "text-[var(--success)]"
      : direction === "down" ? "text-destructive"
      : "text-muted-foreground"
    const changeIcon =
      direction === "up" ? "solar:arrow-up-linear"
      : direction === "down" ? "solar:arrow-down-linear"
      : "solar:minus-square-linear"

    return (
      <Card ref={ref} className={cn("p-[1.125rem]", className)} {...props}>
        <div className="flex items-start justify-between gap-3">
          <div className="text-[0.7813rem] leading-4 font-semibold tracking-[0.0188rem] text-muted-foreground">
            {label}
          </div>
          {icon && (
            <div className="flex size-9 shrink-0 items-center justify-center rounded-[0.75rem] bg-[var(--inner)] text-primary [box-shadow:var(--shadow-inset)]">
              <Icon icon={icon} className="size-[1.125rem]" />
            </div>
          )}
        </div>
        <div className="mt-2.5 text-[1.625rem] leading-[1.875rem] font-semibold tracking-[-0.0563rem] text-foreground">
          {value}
        </div>
        {(change || description) && (
          <div className="mt-2 flex items-center gap-2 text-[0.7813rem] leading-4 tracking-[0.0188rem]">
            {change && (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 font-semibold",
                  changeColor,
                )}
              >
                <Icon icon={changeIcon} className="size-3.5" />
                {change.value}
              </span>
            )}
            {description && (
              <span className="text-muted-foreground">{description}</span>
            )}
          </div>
        )}
      </Card>
    )
  },
)
StatCard.displayName = "StatCard"

export { StatCard }
