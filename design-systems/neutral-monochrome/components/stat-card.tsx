import * as React from "react"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: string | number
  description?: string
  trend?: {
    value: number
    label?: string
  }
  icon?: React.ReactNode
}

function StatCard({
  label,
  value,
  description,
  trend,
  icon,
  className,
  ...props
}: StatCardProps) {
  const trendPositive = trend && trend.value > 0
  const trendNegative = trend && trend.value < 0
  const trendNeutral = trend && trend.value === 0

  return (
    <div
      className={cn(
        "rounded-[10px] border border-border/40 bg-card p-5 space-y-3",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
        {icon && (
          <div className="shrink-0 text-muted-foreground">{icon}</div>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-2xl font-semibold tracking-tight text-foreground">
          {value}
        </p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>

      {trend && (
        <div
          className={cn(
            "inline-flex items-center gap-1 text-xs font-medium",
            trendPositive && "text-primary",
            trendNegative && "text-destructive",
            trendNeutral && "text-muted-foreground"
          )}
        >
          {trendPositive && <TrendingUp className="h-3.5 w-3.5" />}
          {trendNegative && <TrendingDown className="h-3.5 w-3.5" />}
          {trendNeutral && <Minus className="h-3.5 w-3.5" />}
          <span>
            {trendPositive ? "+" : ""}{trend.value}%{" "}
            {trend.label && (
              <span className="font-normal text-muted-foreground">
                {trend.label}
              </span>
            )}
          </span>
        </div>
      )}
    </div>
  )
}

export { StatCard }
