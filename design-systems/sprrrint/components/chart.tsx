"use client"

import * as React from "react"
import { ResponsiveContainer, Tooltip } from "recharts"
import { cn } from "@/lib/utils"

// ──────────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────────
export type ChartConfig = Record<
  string,
  { label?: string; color?: string; icon?: React.ComponentType }
>

// ──────────────────────────────────────────────────────────────────────────────
// Chart Context
// ──────────────────────────────────────────────────────────────────────────────
const ChartContext = React.createContext<{ config: ChartConfig }>({ config: {} })

function useChart() {
  return React.useContext(ChartContext)
}

// ──────────────────────────────────────────────────────────────────────────────
// Chart Container
// ──────────────────────────────────────────────────────────────────────────────
export interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config?: ChartConfig
  children: React.ReactNode
  aspect?: number
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ config = {}, children, aspect, className, ...props }, ref) => {
    return (
      <ChartContext.Provider value={{ config }}>
        <div
          ref={ref}
          className={cn(
            "rounded-[14px] border border-border bg-card shadow-sm p-4",
            className
          )}
          {...props}
        >
          <ResponsiveContainer width="100%" aspect={aspect ?? undefined}>
            {children as React.ReactElement}
          </ResponsiveContainer>
        </div>
      </ChartContext.Provider>
    )
  }
)
ChartContainer.displayName = "ChartContainer"

// ──────────────────────────────────────────────────────────────────────────────
// Chart Tooltip Content
// ──────────────────────────────────────────────────────────────────────────────
export interface ChartTooltipContentProps {
  active?: boolean
  payload?: Array<{ name: string; value: unknown; color?: string }>
  label?: string
  labelFormatter?: (label: string) => React.ReactNode
  formatter?: (value: unknown, name: string) => React.ReactNode
  hideLabel?: boolean
  className?: string
}

const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipContentProps>(
  ({ active, payload, label, labelFormatter, formatter, hideLabel = false, className }, ref) => {
    const { config } = useChart()
    if (!active || !payload?.length) return null

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[14px] border border-border bg-card px-3 py-2.5 shadow-sm text-xs",
          className
        )}
      >
        {!hideLabel && label && (
          <p className="mb-1.5 font-semibold text-foreground">
            {labelFormatter ? labelFormatter(label) : label}
          </p>
        )}
        <div className="flex flex-col gap-1">
          {payload.map((entry, i) => {
            const configEntry = config[entry.name]
            const displayName = configEntry?.label ?? entry.name
            const color = configEntry?.color ?? entry.color

            return (
              <div key={i} className="flex items-center gap-2">
                {color && (
                  <div
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: color }}
                  />
                )}
                <span className="text-muted-foreground">{displayName}:</span>
                <span className="font-semibold text-foreground">
                  {formatter ? formatter(entry.value, entry.name) : String(entry.value)}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltipContent"

// Re-export Recharts Tooltip for convenience
const ChartTooltip = Tooltip

export { ChartContainer, ChartTooltip, ChartTooltipContent, useChart }
