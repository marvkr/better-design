import * as React from "react"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"

// Dynamic Stat Card: metric display with card bg and colored trend badge

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
}

function StatCard({ label, value, change, changeLabel, icon, className, ...props }: StatCardProps) {
  const isPositive = change !== undefined && change >= 0
  const TrendIcon = isPositive ? TrendingUp : TrendingDown

  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-[14px] bg-card p-5",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm text-muted-foreground">{label}</p>
        {icon && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
            {icon}
          </div>
        )}
      </div>
      <div className="flex items-end justify-between gap-2">
        <span className="text-2xl font-semibold text-foreground">{value}</span>
        {change !== undefined && (
          <span
            className={cn(
              "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
              isPositive
                ? "bg-[hsl(var(--success)/0.15)] text-[hsl(var(--success))]"
                : "bg-destructive/15 text-destructive"
            )}
          >
            <TrendIcon className="h-3 w-3" />
            {Math.abs(change)}%
            {changeLabel && <span className="text-muted-foreground">{changeLabel}</span>}
          </span>
        )}
      </div>
    </div>
  )
}

export { StatCard }
export type { StatCardProps }
