import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

// Precision Stat Card - a metric with label, value, and optional trend chip.
// Quiet neutral surfaces, oklch trend tints.

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
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
              {icon}
            </div>
          )}
        </div>
        {(change || description) && (
          <div className="mt-3 flex items-center gap-2">
            {change && (
              <span
                className={cn(
                  "inline-flex items-center rounded-sm px-1.5 py-0.5 text-xs font-medium",
                  change.trend === "up" && "bg-[oklch(0.62_0.16_150)]/12 text-[oklch(0.46_0.14_150)]",
                  change.trend === "down" && "bg-destructive/10 text-destructive",
                  change.trend === "neutral" && "bg-muted text-muted-foreground"
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
