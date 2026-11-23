import * as React from "react"

import { cn } from "@/lib/utils"
import { Card } from "./card"

/*
 * Plinth Stat Card: a panel with a mono caps label, a large figure and a
 * change readout chip. Up and down take the stage's green and red; the
 * ember stays for actions.
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

function StatCard({ label, value, change, icon, description, className, ...props }: StatCardProps) {
  return (
    <Card className={cn("p-4", className)} {...props}>
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[0.6875rem] uppercase text-muted-foreground">{label}</span>
        {icon && (
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-input text-muted-foreground [box-shadow:var(--shadow-inset)] [&_svg]:size-4">
            {icon}
          </span>
        )}
      </div>
      <div className="mt-2 text-[1.75rem] font-medium leading-none tracking-tight text-foreground tabular-nums">{value}</div>
      {(change || description) && (
        <div className="mt-3 flex items-center gap-2">
          {change && (
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-[0.6875rem] tabular-nums ring-1 ring-inset",
                change.trend === "up" && "bg-[oklch(0.3_0.07_150)] text-[color:oklch(0.88_0.13_150)] ring-[oklch(0.55_0.13_150)]",
                change.trend === "down" && "bg-[oklch(0.3_0.09_25)] text-[color:oklch(0.88_0.07_25)] ring-[oklch(0.58_0.17_25)]",
                change.trend === "neutral" && "bg-secondary text-secondary-foreground ring-[oklch(1_0_0/0.12)]"
              )}
            >
              {change.trend === "up" && <TrendingUpIcon className="size-3" />}
              {change.trend === "down" && <TrendingDownIcon className="size-3" />}
              {change.value}
            </span>
          )}
          {description && <span className="text-xs text-muted-foreground">{description}</span>}
        </div>
      )}
    </Card>
  )
}

// feather:trending-up
function TrendingUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="m23 6l-9.5 9.5l-5-5L1 18" /><path d="M17 6h6v6" /></g>
    </svg>
  )
}

// feather:trending-down
function TrendingDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="m23 18l-9.5-9.5l-5 5L1 6" /><path d="M17 18h6v-6" /></g>
    </svg>
  )
}

export { StatCard }
export type { StatCardProps }
