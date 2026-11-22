"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";
import { popoverSurface } from "./_shared";

/**
 * Burnished Chart: the recharts wrapper.
 *
 * Series take the warm light of the system in order: glow, ember, pale
 * copper, deep copper, then a warm grey (--chart-1 to --chart-5). Grid lines
 * are the umber hairline and ticks are muted text, so only the data glows.
 * The tooltip is the raised umber panel every menu uses, and its swatches are
 * small rounded pills with a lit top edge, with a hairline rim.
 */

type ChartTheme = "light" | "dark";

/**
 * Selector prefix for each theme a series colour can be set for. Burnished
 * is dark by default and flips under `.light`.
 */
const THEME_SELECTORS: ReadonlyArray<[ChartTheme, string]> = [
  ["dark", ""],
  ["light", ".light"],
];

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<ChartTheme, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={ref}
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center font-sans text-xs tracking-[0.016em]",
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground",
          "[&_.recharts-cartesian-grid_line]:stroke-border",
          "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-input",
          "[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-accent/60",
          "[&_.recharts-polar-grid_*]:stroke-border",
          "[&_.recharts-radial-bar-background-sector]:fill-muted",
          "[&_.recharts-reference-line_*]:stroke-input",
          "[&_.recharts-dot]:stroke-transparent",
          "[&_.recharts-sector]:stroke-background",
          "[&_.recharts-layer]:outline-none [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none [&_.recharts-surface]:overflow-visible",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "Chart";

/**
 * Writes one `--color-<key>` variable per configured series, scoped to this
 * chart, with a light-mode value when the series sets a theme pair.
 */
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const coloured = Object.entries(config).filter(
    ([, item]) => item.theme || item.color,
  );

  if (!coloured.length) return null;

  const css = THEME_SELECTORS.map(([theme, prefix]) => {
    const declarations = coloured
      .map(([key, item]) => {
        const color = item.theme?.[theme] ?? item.color;
        return color ? `  --color-${key}: ${color};` : null;
      })
      .filter(Boolean)
      .join("\n");
    return `${prefix} [data-chart=${id}] {\n${declarations}\n}`;
  }).join("\n");

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
};

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean;
      hideIndicator?: boolean;
      indicator?: "line" | "dot" | "dashed";
      nameKey?: string;
      labelKey?: string;
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref,
  ) => {
    const { config } = useChart();

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) return null;

      const [item] = payload;
      const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
      const itemConfig = getPayloadConfigFromPayload(
        config,
        // SAFETY: recharts copies the series' scalar fields onto each item.
        item as ChartDatum | undefined,
        // SAFETY: `payload` is the caller's data row that the item was drawn from.
        item?.payload as ChartDatum | undefined,
        key,
      );
      const value =
        !labelKey && isChartString(label)
          ? (config[label]?.label ?? label)
          : itemConfig?.label;

      if (labelFormatter) {
        return (
          <div className={cn("font-semibold text-foreground", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        );
      }

      if (!value) return null;

      return (
        <div className={cn("font-semibold text-foreground", labelClassName)}>
          {value}
        </div>
      );
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

    if (!active || !payload?.length) return null;

    // One series with a line or dashed marker puts the label beside the
    // value instead of above it.
    const nestLabel = payload.length === 1 && indicator !== "dot";

    return (
      <div
        ref={ref}
        data-slot="chart-tooltip"
        className={cn(
          popoverSurface,
          "grid min-w-36 items-start gap-2 px-3.5 py-2.5 text-xs tracking-[0.016em]",
          className,
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`;
            // SAFETY: `payload` is the caller's data row that the item was drawn from.
            const row = item.payload as ChartDatum | undefined;
            const itemConfig = getPayloadConfigFromPayload(
              config,
              // SAFETY: recharts copies the series' scalar fields onto each item.
              item as ChartDatum,
              row,
              key,
            );
            const fill = row?.fill;
            const indicatorColor =
              color || (isChartString(fill) ? fill : undefined) || item.color;

            return (
              <div
                key={`${item.dataKey ?? key}-${index}`}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:size-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center",
                )}
              >
                {formatter && item.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          aria-hidden="true"
                          className={cn(
                            "shrink-0 border-(--color-border) bg-(--color-bg)",
                            indicator === "dot" && "size-2.5 rounded-full ring-1 ring-inset ring-border",
                            indicator === "line" && "w-1 rounded-full",
                            indicator === "dashed" &&
                              "w-0 border-l-2 border-dashed bg-transparent",
                            nestLabel && indicator === "dashed" && "my-0.5",
                          )}
                          style={
                            // SAFETY: CSSProperties has no index for custom
                            // properties; the indicator reads these two.
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between gap-4 leading-none",
                        nestLabel ? "items-end" : "items-center",
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value !== undefined && item.value !== null && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {isChartNumber(item.value)
                            ? item.value.toLocaleString()
                            : item.value}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
ChartTooltipContent.displayName = "ChartTooltipContent";

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean;
      nameKey?: string;
    }
>(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
    ref,
  ) => {
    const { config } = useChart();

    if (!payload?.length) return null;

    return (
      <div
        ref={ref}
        data-slot="chart-legend"
        className={cn(
          "flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className,
        )}
      >
        {payload.map((item, index) => {
          const key = `${nameKey || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(
            config,
            undefined,
            // SAFETY: `payload` is the caller's data row that the item was drawn from.
            item.payload as ChartDatum | undefined,
            key,
          );

          return (
            <div
              key={`${String(item.value ?? key)}-${index}`}
              className="flex items-center gap-1.5 [&>svg]:size-3 [&>svg]:text-muted-foreground"
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <span
                  aria-hidden="true"
                  className="size-2.5 shrink-0 rounded-full ring-1 ring-inset ring-border"
                  style={{ backgroundColor: item.color }}
                />
              )}
              <span>{itemConfig?.label ?? item.value}</span>
            </div>
          );
        })}
      </div>
    );
  },
);
ChartLegendContent.displayName = "ChartLegendContent";

/** Narrows a chart value to a string, such as a category label. */
function isChartString<TValue>(value: TValue | string): value is string {
  return typeof value === "string";
}

/** Narrows a chart datum to a number, so it renders with locale grouping. */
function isChartNumber<TValue>(value: TValue | number): value is number {
  return typeof value === "number";
}

/** A recharts item, or the data row it came from, read by field name. */
type ChartDatum = Record<string, string | number | null | undefined>;

/**
 * Finds the config entry for a tooltip or legend item. The key can name a
 * field on the item, or a field on the data row the item came from, whose
 * value is then the config key (a pie slice's `browser`, for instance).
 */
function getPayloadConfigFromPayload(
  config: ChartConfig,
  item: ChartDatum | undefined,
  row: ChartDatum | undefined,
  key: string,
) {
  const ownValue = item?.[key];
  const rowValue = row?.[key];
  let configKey = key;
  if (isChartString(ownValue)) configKey = ownValue;
  else if (isChartString(rowValue)) configKey = rowValue;

  return configKey in config ? config[configKey] : config[key];
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
