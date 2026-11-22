import * as React from "react"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "./card"

/*
 * StatCard — the spec's headline metric: big tabular number on a carved
 * panel, trend chip in cobalt or red.
 */

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
            <span className="text-2xl font-semibold tracking-tight tabular-nums text-foreground">
              {value}
            </span>
          </div>
          {icon && (
            <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground [background-image:var(--bezel)] [box-shadow:var(--shadow-raised)]">
              {icon}
            </div>
          )}
        </div>
        {(change || description) && (
          <div className="mt-3 flex items-center gap-2">
            {change && (
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-1.5 py-0.5 text-xs font-medium",
                  change.trend === "up" && "bg-primary/15 text-chart-2 border border-primary/25",
                  change.trend === "down" && "bg-destructive/15 text-destructive border border-destructive/25",
                  change.trend === "neutral" && "border border-border bg-muted text-muted-foreground"
                )}
              >
                {change.value}
              </span>
            )}
            {description && (
              <span className="text-xs text-muted-foreground">{description}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export { StatCard }
export type { StatCardProps }
