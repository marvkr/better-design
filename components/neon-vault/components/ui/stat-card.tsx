import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "./card"

// Neon Vault Stat Card: a raised asset panel showing one metric, like the
// wallet's Funding and Unified Trading rows. Big tabular numerals, a pill
// trend chip in mint or the destructive hue, and a raised graphite icon tile.

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

function StatCard({
  label,
  value,
  change,
  icon,
  description,
  className,
  ...props
}: StatCardProps) {
  return (
    <Card className={cn("", className)} {...props}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="text-2xl font-semibold tracking-tight text-foreground">
              {value}
            </span>
          </div>
          {icon && (
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground [box-shadow:var(--shadow-raised)]">
              {icon}
            </div>
          )}
        </div>
        {(change || description) && (
          <div className="mt-3 flex items-center gap-2">
            {change && (
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                  change.trend === "up" && "bg-chart-5/15 text-chart-5",
                  change.trend === "down" &&
                    "bg-destructive/15 text-destructive",
                  change.trend === "neutral" &&
                    "bg-secondary text-muted-foreground"
                )}
              >
                {change.value}
              </span>
            )}
            {description && (
              <span className="text-xs text-muted-foreground">
                {description}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export { StatCard }
export type { StatCardProps }
