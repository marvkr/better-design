"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"

// Luxe Chart: Recharts container with card bg, rounded-xl
// Monochromatic palette: white primary, warm grays for secondary series
// Tooltip and legend styled to match the dark premium aesthetic

const LUXE_COLORS = [
  "hsl(0, 0%, 100%)",   // white (primary)
  "hsl(40, 5%, 55%)",   // warm gray
  "hsl(0, 0%, 40%)",    // mid gray
  "hsl(0, 0%, 28%)",    // dark gray
  "hsl(40, 4%, 70%)",   // light warm gray
]

type ChartConfig = Record<
  string,
  { label: string; color?: string; icon?: React.ComponentType }
>

type ChartContextProps = { config: ChartConfig }

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const ctx = React.useContext(ChartContext)
  if (!ctx) throw new Error("useChart must be used within <ChartContainer>")
  return ctx
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    config: ChartConfig
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={ref}
        id={chartId}
        className={cn(
          "flex aspect-video justify-center",
          "rounded-xl border border-border/60 bg-card p-4",
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground",
          "[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/40",
          "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border",
          "[&_.recharts-dot[stroke='#fff']]:stroke-transparent",
          "[&_.recharts-layer]:outline-none",
          "[&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border/40",
          "[&_.recharts-radial-bar-background-sector]:fill-muted",
          "[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted/30",
          "[&_.recharts-reference-line_[stroke='#ccc']]:stroke-border",
          "[&_.recharts-sector[stroke='#fff']]:stroke-transparent",
          "[&_.recharts-sector]:outline-none",
          "[&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "ChartContainer"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([, cfg]) => cfg.color)
  if (!colorConfig.length) return null

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(config)
          .filter(([, cfg]) => cfg.color)
          .map(([key, cfg], i) => {
            const color = cfg.color ?? LUXE_COLORS[i % LUXE_COLORS.length]
            return `[data-chart="${id}"] { --color-${key}: ${color}; }`
          })
          .join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    active?: boolean
    payload?: Array<{ name: string; value: number | string; color?: string; dataKey?: string }>
    label?: string
    labelKey?: string
    nameKey?: string
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: "line" | "dot" | "dashed"
    formatter?: (value: number | string, name: string) => React.ReactNode
  }
>(
  (
    {
      active,
      payload,
      className,
      label,
      labelKey,
      hideLabel = false,
      hideIndicator = false,
      indicator = "dot",
      formatter,
      ...props
    },
    ref
  ) => {
    const { config } = useChart()
    if (!active || !payload?.length) return null

    return (
      <div
        ref={ref}
        className={cn(
          "min-w-[9rem] overflow-hidden rounded-xl border border-border/60 bg-card px-3 py-2 shadow-xl",
          "text-xs text-foreground tracking-wide",
          className
        )}
        {...props}
      >
        {!hideLabel && label && (
          <p className="mb-1.5 font-medium text-muted-foreground">{label}</p>
        )}
        <div className="flex flex-col gap-1">
          {payload.map((item, i) => {
            const configEntry = config[item.dataKey as string] ?? config[item.name]
            const color = item.color ?? configEntry?.color ?? LUXE_COLORS[i]
            const entryLabel = configEntry?.label ?? item.name

            return (
              <div key={i} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5">
                  {!hideIndicator && (
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  )}
                  <span className="text-muted-foreground">{entryLabel}</span>
                </div>
                <span className="font-medium text-foreground tabular-nums">
                  {formatter
                    ? formatter(item.value, item.name)
                    : typeof item.value === "number"
                    ? item.value.toLocaleString()
                    : item.value}
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

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    payload?: Array<{ value: string; color?: string; dataKey?: string }>
    hideIcon?: boolean
    nameKey?: string
    verticalAlign?: "top" | "bottom"
  }
>(({ className, hideIcon = false, payload, verticalAlign = "bottom", ...props }, ref) => {
  const { config } = useChart()
  if (!payload?.length) return null

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center gap-4 text-xs text-muted-foreground",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
      {...props}
    >
      {payload.map((item) => {
        const configEntry = config[item.dataKey as string] ?? config[item.value]
        const entryLabel = configEntry?.label ?? item.value

        return (
          <div key={item.value} className="flex items-center gap-1.5">
            {!hideIcon && (
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
            )}
            {entryLabel}
          </div>
        )
      })}
    </div>
  )
})
ChartLegendContent.displayName = "ChartLegendContent"

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  useChart,
  LUXE_COLORS,
}
