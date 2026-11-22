import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

// Amber Glass StatCard: glass ticket with a bold number and a trend chip.

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: string | number
  change?: {
    value: string | number
    trend: "up" | "down" | "neutral"
  }
  icon?: React.ReactNode
  description?: string
}

const trendStyles = {
  up: "text-[oklch(0.78_0.14_155)] bg-[oklch(0.72_0.15_155/0.12)]",
  down: "text-[oklch(0.74_0.16_27)] bg-[oklch(0.6_0.21_27/0.12)]",
  neutral: "text-muted-foreground bg-[var(--ag-fill)]",
}

const trendIcons = {
  up: "tabler:trending-up",
  down: "tabler:trending-down",
  neutral: "tabler:minus",
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, label, value, change, icon, description, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-3 rounded-xl p-5",
        "backdrop-blur-[var(--ag-blur)] bg-card",
        "border border-[color:var(--ag-border)]",
        "shadow-[var(--shadow-glass)]",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        {icon && <span className="text-primary [&>svg]:h-4 [&>svg]:w-4">{icon}</span>}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-[-0.02em] tabular-nums">
          {value}
        </span>
        {change && (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
              trendStyles[change.trend]
            )}
          >
            <Icon icon={trendIcons[change.trend]} className="h-3 w-3" />
            {change.value}
          </span>
        )}
      </div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  )
)
StatCard.displayName = "StatCard"

export { StatCard }
export type { StatCardProps }
