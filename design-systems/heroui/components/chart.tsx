"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"

// Dynamic Chart: dark bg recharts wrapper with card container

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { config?: Record<string, { label?: string; color?: string }> }
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex aspect-video w-full items-center justify-center rounded-2xl bg-card p-4", className)}
    {...props}
  >
    <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
      {children as React.ReactElement}
    </RechartsPrimitive.ResponsiveContainer>
  </div>
))
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    active?: boolean
    payload?: Array<{ name?: string; value?: number | string; color?: string }>
    label?: string
    hideLabel?: boolean
  }
>(({ active, payload, label, hideLabel, className, ...props }, ref) => {
  if (!active || !payload?.length) return null

  return (
    <div
      ref={ref}
      className={cn("rounded-xl bg-card border border-border p-3 text-xs shadow-[0_8px_30px_0_rgba(0,0,0,0.5)]", className)}
      {...props}
    >
      {!hideLabel && label && <p className="mb-1.5 font-medium text-foreground">{label}</p>}
      <div className="flex flex-col gap-1">
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center gap-2">
            {entry.color && (
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: entry.color }} />
            )}
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium text-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    payload?: Array<{ value?: string; color?: string }>
  }
>(({ payload, className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-wrap items-center justify-center gap-4 pt-3 text-xs", className)} {...props}>
    {payload?.map((entry, i) => (
      <div key={i} className="flex items-center gap-1.5">
        <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: entry.color }} />
        <span className="text-muted-foreground">{entry.value}</span>
      </div>
    ))}
  </div>
))
ChartLegendContent.displayName = "ChartLegendContent"

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent }
