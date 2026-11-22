import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Chrome Azure StatCard — a dark brushed-steel panel surfacing a single metric.
 * The optional icon sits in a raised steel chip. Positive change reads green,
 * negative reads destructive, both rendered as inline SVG arrows.
 */

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: React.ReactNode
  icon?: React.ReactNode
  change?: {
    value: string | number
    direction?: "up" | "down" | "neutral"
  }
  description?: React.ReactNode
}

const ArrowUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="m5 12 7-7 7 7" />
    <path d="M12 19V5" />
  </svg>
)

const ArrowDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M12 5v14" />
    <path d="m19 12-7 7-7-7" />
  </svg>
)

const MinusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M5 12h14" />
  </svg>
)

/** Narrows a stat delta to a number, so a negative one points the trend down. */
function isNumericDelta<TValue>(value: TValue | number): value is number {
  return typeof value === "number"
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, label, value, icon, change, description, ...props }, ref) => {
    const delta = change?.value
    const direction =
      change?.direction ?? (isNumericDelta(delta) && delta < 0 ? "down" : "up")
    const changeColor =
      direction === "up"
        ? "text-[oklch(0.8_0.12_160)]"
        : direction === "down"
        ? "text-destructive"
        : "text-muted-foreground"
    const ChangeIcon =
      direction === "up" ? ArrowUpIcon : direction === "down" ? ArrowDownIcon : MinusIcon

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl p-5 bg-card text-card-foreground border border-white/5",
          "[box-shadow:var(--shadow-sm)]",
          "transition-[background-color,box-shadow,border-color] duration-base",
          "hover:border-white/10 hover:[box-shadow:var(--shadow-md)]",
          className
        )}
        {...props}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {label}
          </div>
          {icon && (
            <div className="flex h-8 w-8 items-center justify-center rounded-md [background:var(--surface-silver)] text-foreground [box-shadow:var(--shadow-button)]">
              <span className="flex h-4 w-4 items-center justify-center">{icon}</span>
            </div>
          )}
        </div>
        <div className="mt-3 text-2xl font-semibold tracking-tight">{value}</div>
        {(change || description) && (
          <div className="mt-2 flex items-center gap-2 text-xs">
            {change && (
              <span className={cn("inline-flex items-center gap-0.5 font-medium", changeColor)}>
                <ChangeIcon className="h-3 w-3" />
                {change.value}
              </span>
            )}
            {description && <span className="text-muted-foreground">{description}</span>}
          </div>
        )}
      </div>
    )
  }
)
StatCard.displayName = "StatCard"

export { StatCard }
