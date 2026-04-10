"use client"

import * as React from "react"
import {
  ResponsiveContainer,
  Tooltip,
  type TooltipProps,
} from "recharts"
import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Chart container
// ---------------------------------------------------------------------------

export interface ChartConfig {
  [key: string]: {
    label: string
    color?: string
  }
}

interface ChartContextValue {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextValue | null>(null)

function useChart() {
  const ctx = React.useContext(ChartContext)
  if (!ctx) throw new Error("useChart must be used within a ChartContainer")
  return ctx
}

export interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
  children: React.ReactElement
}

function ChartContainer({
  config,
  children,
  className,
  ...props
}: ChartContainerProps) {
  return (
    <ChartContext.Provider value={{ config }}>
      <div
        className={cn(
          "rounded-[10px] border border-border/40 bg-card p-4",
          className
        )}
        {...props}
      >
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// Chart tooltip content
// ---------------------------------------------------------------------------

interface ChartTooltipContentProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number | string
    color?: string
    dataKey?: string
  }>
  label?: string
  labelFormatter?: (label: string) => React.ReactNode
  formatter?: (value: number | string, name: string) => React.ReactNode
  hideLabel?: boolean
  indicator?: "dot" | "line"
}

function ChartTooltipContent({
  active,
  payload,
  label,
  labelFormatter,
  formatter,
  hideLabel = false,
  indicator = "dot",
}: ChartTooltipContentProps) {
  const { config } = useChart()

  if (!active || !payload?.length) return null

  return (
    <div className="rounded-[10px] border border-border bg-card px-3 py-2 shadow-xl text-xs">
      {!hideLabel && (
        <p className="mb-2 font-medium text-muted-foreground">
          {labelFormatter ? labelFormatter(label ?? "") : label}
        </p>
      )}
      <div className="space-y-1">
        {payload.map((entry, i) => {
          const cfg = config[entry.dataKey ?? entry.name]
          const color = entry.color ?? cfg?.color ?? "hsl(var(--primary))"
          const itemLabel = cfg?.label ?? entry.name
          const displayValue = formatter
            ? formatter(entry.value, entry.name)
            : entry.value

          return (
            <div key={i} className="flex items-center gap-2">
              {indicator === "dot" ? (
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: color }}
                />
              ) : (
                <span
                  className="h-px w-4 shrink-0"
                  style={{ background: color }}
                />
              )}
              <span className="text-muted-foreground">{itemLabel}</span>
              <span className="ml-auto pl-4 font-medium text-foreground tabular-nums">
                {displayValue}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const ChartTooltip = Tooltip

export { ChartContainer, ChartTooltip, ChartTooltipContent, useChart }
