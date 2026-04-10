import * as React from "react"
import { cn } from "@/lib/utils"

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: React.ReactNode
  trend?: {
    value: string | number
    direction: "up" | "down" | "neutral"
    label?: string
  }
  icon?: React.ReactNode
  description?: string
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ label, value, trend, icon, description, className, ...props }, ref) => {
    const trendColor = {
      up:      "text-green-600",
      down:    "text-red-500",
      neutral: "text-muted-foreground",
    }

    const trendIcon = {
      up:      "↑",
      down:    "↓",
      neutral: "→",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[14px] border border-border bg-card shadow-sm p-6",
          className
        )}
        {...props}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-muted-foreground mb-1 truncate">
              {label}
            </p>
            <div className="text-2xl font-semibold text-foreground leading-tight">
              {value}
            </div>
            {trend && (
              <div
                className={cn(
                  "mt-2 flex items-center gap-1 text-xs font-medium",
                  trendColor[trend.direction]
                )}
              >
                <span>{trendIcon[trend.direction]}</span>
                <span>{trend.value}</span>
                {trend.label && (
                  <span className="text-muted-foreground font-normal">
                    {trend.label}
                  </span>
                )}
              </div>
            )}
            {description && (
              <p className="mt-1 text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          {icon && (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
              {icon}
            </div>
          )}
        </div>
      </div>
    )
  }
)
StatCard.displayName = "StatCard"

export { StatCard }
