import * as React from "react"
import { cn } from "@/lib/utils"

// Luxe StatCard: premium metric card — label, large value, trend indicator
// Monochromatic: trend arrows are always muted (no green/red accents)

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: string | number
  trend?: {
    value: string
    direction: "up" | "down" | "neutral"
    label?: string
  }
  icon?: React.ReactNode
}

function StatCard({
  label,
  value,
  trend,
  icon,
  className,
  ...props
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/60 bg-card p-6",
        "flex flex-col gap-4",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase">
          {label}
        </p>
        {icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
            {icon}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="text-3xl font-semibold text-foreground tracking-tight">
          {value}
        </p>
        {trend && (
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">
              {trend.direction === "up" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m18 15-6-6-6 6" />
                </svg>
              )}
              {trend.direction === "down" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              )}
              {trend.direction === "neutral" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                </svg>
              )}
            </span>
            <span className="text-xs text-muted-foreground">
              {trend.value}
              {trend.label && (
                <span className="ml-1 opacity-70">{trend.label}</span>
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export { StatCard }
