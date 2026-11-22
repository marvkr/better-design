"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

/*
 * Bevel Chart.
 *
 * The series palette steps from a deep blue at --chart-1 down to the track
 * color at --chart-5, so a single-series chart reads as the accent and a
 * five-series chart still reads as one family. Every rule the chart draws,
 * the grid, the axis line and the hover cursor, is one pixel of the track
 * token rather than a border color, which is how the rest of the system
 * separates things. The tooltip is a popover surface: 14px radius, no border,
 * var(--shadow-lg).
 */

/** Narrows a chart datum to a number, so the value renders as one. */
function isChartNumber<TValue>(value: TValue | number): value is number {
  return typeof value === "number"
}

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
  if (!context)
    throw new Error("useChart must be used within a <ChartContainer />")
  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"]
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
          "flex aspect-video justify-center",
          "text-[0.7813rem] leading-4 tracking-[0.0188rem]",
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground",
          "[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-[var(--track)]",
          "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-[var(--track)]",
          "[&_.recharts-dot[stroke='#fff']]:stroke-transparent",
          "[&_.recharts-layer]:outline-none",
          "[&_.recharts-polar-grid_[stroke='#ccc']]:stroke-[var(--track)]",
          "[&_.recharts-radial-bar-background-sector]:fill-[var(--inner)]",
          "[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-[var(--inner)]",
          "[&_.recharts-reference-line_[stroke='#ccc']]:stroke-[var(--track)]",
          "[&_.recharts-sector[stroke='#fff']]:stroke-transparent",
          "[&_.recharts-sector]:outline-none",
          "[&_.recharts-surface]:outline-none [&_.recharts-surface]:overflow-visible",
          className,
        )}
        {...props}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: Object.entries(config)
              .map(([k, v]) => {
                // SAFETY: this branch runs only for a config entry that carried
                // a `theme` map, which the ChartConfig type declares as one
                // color per theme.
                const c = v as { color?: string; theme?: Record<string, string> }
                const light = c.color ?? c.theme?.light
                const dark = c.theme?.dark
                return (
                  (light ? `[data-chart="${chartId}"]{--color-${k}:${light};}` : "") +
                  (dark ? `.dark [data-chart="${chartId}"]{--color-${k}:${dark};}` : "")
                )
              })
              .join(""),
          }}
        />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
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
>(
  (
    {
      active,
      payload,
      label,
      className,
      hideLabel = false,
      hideIndicator = false,
      indicator = "dot",
      nameKey,
      labelKey,
    },
    ref,
  ) => {
    const { config } = useChart()
    // SAFETY: `config` is the ChartConfig this provider was given, whose values
    // declare an optional label.
    const cfg = config as Record<string, { label?: React.ReactNode }> | undefined
    if (!active || !payload?.length) return null

    const tooltipLabel = labelKey ? cfg?.[labelKey]?.label ?? label : label

    return (
      <div
        ref={ref}
        className={cn(
          "min-w-[9rem] rounded-[0.875rem] px-3 py-2.5",
          "bg-popover text-popover-foreground [box-shadow:var(--shadow-lg)]",
          "text-[0.7813rem] leading-4 tracking-[0.0188rem]",
          className,
        )}
      >
        {!hideLabel && tooltipLabel !== undefined && tooltipLabel !== "" && (
          <div className="mb-1.5 font-semibold tracking-[-0.0125rem] text-foreground">
            {String(tooltipLabel)}
          </div>
        )}
        <div className="grid gap-1.5">
          {payload.map((item, i) => {
            type ChartTooltipDatum = { fill?: string } & Record<
              string,
              string | number | null | undefined
            >
            // SAFETY: recharts types its tooltip payload as unknown, but every
            // entry this chart renders came from the caller's data array.
            const itemPayload = item.payload as ChartTooltipDatum | undefined
            const key = nameKey
              ? String(itemPayload?.[nameKey] ?? item.name ?? i)
              : String(item.name ?? item.dataKey ?? i)
            // SAFETY: recharts writes `fill` onto the payload it hands back for
            // the series it drew, so it is present once a color resolved.
            const itemColor = item.color ?? itemPayload?.fill
            return (
              <div key={key} className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-muted-foreground">
                  {!hideIndicator && (
                    <span
                      className={cn(
                        "shrink-0",
                        indicator === "line"
                          ? "h-2.5 w-[0.1875rem] rounded-full"
                          : indicator === "dashed"
                            ? "h-2.5 w-0 border-l-[0.0938rem] border-dashed"
                            : "size-2.5 rounded-full",
                      )}
                      style={
                        indicator === "dashed"
                          ? { borderColor: itemColor }
                          : { background: itemColor }
                      }
                    />
                  )}
                  {cfg?.[key]?.label ?? item.name}
                </span>
                <span className="font-semibold tabular-nums tracking-[-0.0125rem] text-foreground">
                  {isChartNumber(item.value)
                    ? item.value.toLocaleString()
                    : item.value}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  },
)
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = RechartsPrimitive.Legend

/** One entry recharts hands to the element passed as a legend's `content`. */
interface ChartLegendPayloadItem {
  value?: string | number
  dataKey?: string | number
  color?: string
}

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    hideIcon?: boolean
    nameKey?: string
    /** Supplied by recharts when this element is a `Legend` content. */
    payload?: ChartLegendPayloadItem[]
  }
>((
  { className, id, style, hideIcon = false, nameKey, payload = [], children },
  ref,
) => {
  const { config } = useChart()
  // SAFETY: `config` is the ChartConfig this provider was given, whose values
  // declare an optional label.
  const cfg = config as Record<string, { label?: React.ReactNode }> | undefined

  // An empty legend renders nothing, the way every other system does, so a
  // chart without a payload keeps no padded strip under it.
  if (!payload.length && !children) return null

  // Recharts clones this element with its own legend props (layout, align,
  // wrapperStyle and the rest), so only the attributes a div understands are
  // forwarded. Everything else would land on the DOM node as an unknown prop.
  return (
    <div
      ref={ref}
      id={id}
      style={style}
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 pt-3",
        "text-[0.7813rem] leading-4 tracking-[0.0188rem] text-muted-foreground",
        className,
      )}
    >
      {payload.map((item, i) => {
        const itemKey = String(item.dataKey ?? item.value ?? i)
        const configKey = nameKey ?? itemKey
        return (
          <span key={itemKey} className="flex items-center gap-2">
            {!hideIcon && (
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ background: item.color }}
              />
            )}
            {cfg?.[configKey]?.label ?? item.value}
          </span>
        )
      })}
      {children}
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
}
