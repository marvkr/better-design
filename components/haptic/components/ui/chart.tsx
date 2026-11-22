"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<"light" | "dark", string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) throw new Error("useChart must be used within a <ChartContainer />")
  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs",
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground",
          "[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border",
          "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border",
          "[&_.recharts-dot[stroke='#fff']]:stroke-transparent",
          "[&_.recharts-layer]:outline-none",
          "[&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border",
          "[&_.recharts-radial-bar-background-sector]:fill-muted",
          "[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted",
          "[&_.recharts-reference-line_[stroke='#ccc']]:stroke-border",
          "[&_.recharts-sector[stroke='#fff']]:stroke-transparent",
          "[&_.recharts-sector]:outline-none",
          "[&_.recharts-surface]:outline-none [&_.recharts-surface]:overflow-visible",
          className
        )}
        {...props}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: Object.entries(config)
              .map(([k, v]) => {
                // SAFETY: this branch runs only for a config entry that carried a `theme`
                // map, which the ChartConfig type declares as colour-per-theme.
                const c = v as { color?: string; theme?: Record<string, string> };
                const light = c.color ?? c.theme?.light;
                const dark = c.theme?.dark;
                return (
                  (light ? `[data-chart="${chartId}"]{--color-${k}:${light};}` : "") +
                  (dark ? `.dark [data-chart="${chartId}"]{--color-${k}:${dark};}` : "")
                );
              })
              .join(""),
          }}
        />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: "line" | "dot" | "dashed"
      nameKey?: string
      labelKey?: string
    }
>(({ className, active, payload, label, hideLabel, nameKey, labelKey, ...props }, ref) => {
  if (!active || !payload?.length) return null
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg px-3 py-2 text-xs",
        "bg-popover text-popover-foreground border border-border",
        "[box-shadow:var(--shadow-l)]",
        className
      )}
      {...props}
    >
      {!hideLabel && label != null && (
        <div className="mb-1 font-medium">{String(label)}</div>
      )}
      <div className="space-y-1">
        {payload.map((item, i) => {
          // SAFETY: recharts types its tooltip payload as unknown, but every entry
          // this chart renders came from the `data` array the caller passed in.
          type ChartTooltipDatum = { fill?: string } & Record<
              string,
              string | number | null | undefined
            >
            // SAFETY: recharts types its tooltip payload as unknown, but every
            // entry this chart renders came from the caller's data array.
            const itemPayload = item.payload as ChartTooltipDatum | undefined
          const name = String(itemPayload?.[nameKey ?? "name"] ?? item.name ?? "")
          const value = String(itemPayload?.[labelKey ?? "value"] ?? item.value ?? "")
          return (
            <div key={i} className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">{name}</span>
              <span className="font-medium">{value}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean
      nameKey?: string
    }
>(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
  const { config } = useChart()

  if (!payload?.length) return null

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload.map((item) => {
        const itemPayload = new Map(Object.entries(item.payload ?? {}))
        const key = String(
          (nameKey ? itemPayload.get(nameKey) : undefined)
          ?? item.dataKey
          ?? item.value
          ?? "value"
        )
        const itemConfig = config[key]
        const Icon = itemConfig?.icon
        const color = item.color
          ?? itemPayload.get("fill")

        return (
          <div key={String(item.value ?? key)} className="flex items-center gap-1.5">
            {Icon && !hideIcon ? (
              <Icon />
            ) : (
              <span
                aria-hidden="true"
                className="size-2 shrink-0 rounded-[0.125rem]"
                style={{ backgroundColor: color }}
              />
            )}
            <span>{itemConfig?.label ?? item.value}</span>
          </div>
        )
      })}
    </div>
  )
})
ChartLegendContent.displayName = "ChartLegendContent"

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent }
