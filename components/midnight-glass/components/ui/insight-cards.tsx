"use client"

import { Liveline, type LivelinePoint, type LivelineSeries } from "liveline"
import * as React from "react"
import { cn } from "@/lib/utils"

// InsightCards: embedded mini-visualizations in an "Insights N" carousel.
// This preserves Beautiful UI's Liveline charts, pointer scrub tooltips, metric
// toggle, and allocation inspector while adapting colors to the active design
// system's semantic tokens.
// Source: https://beautiful-ui-five.vercel.app/

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)"
const SNAPSHOT_END = Math.floor(Date.now() / 1000)

const formatPercent = (value: number) => `${value > 0 ? "+" : ""}${value.toFixed(2)}%`
const formatMoney = (value: number) => `$${Math.round(value).toLocaleString("en-US")}`

function makePoints(values: number[], gap = 6): LivelinePoint[] {
  return values.map((value, index) => ({
    time: SNAPSHOT_END - (values.length - 1 - index) * gap,
    value,
  }))
}

function useDarkMode() {
  const [dark, setDark] = React.useState(false)

  React.useEffect(() => {
    const root = document.documentElement
    const update = () => setDark(root.classList.contains("dark"))
    update()
    const observer = new MutationObserver(update)
    observer.observe(root, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  return dark
}

function useChartColors() {
  const ref = React.useRef<HTMLDivElement>(null)
  const [colors, setColors] = React.useState({
    accent: "oklch(0.65 0.18 250)",
    orange: "oklch(0.72 0.16 65)",
    red: "oklch(0.62 0.21 25)",
  })

  React.useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    const update = () => {
      const styles = getComputedStyle(element)
      setColors({
        accent: styles.getPropertyValue("--chart-1").trim() || "oklch(0.65 0.18 250)",
        orange: styles.getPropertyValue("--chart-4").trim() || "oklch(0.72 0.16 65)",
        red: styles.getPropertyValue("--destructive").trim() || "oklch(0.62 0.21 25)",
      })
    }

    update()
    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] })
    return () => observer.disconnect()
  }, [])

  return { ref, colors }
}

function Entity({ name, color }: { name: string; color: string }) {
  return (
    <span className="inline-flex items-center gap-1 align-baseline font-medium text-foreground">
      <span className="inline-block size-2.5 rounded-full" style={{ background: color }} />
      @{name}
    </span>
  )
}

function Mono({ children, tone }: { children: React.ReactNode; tone: "red" | "green" }) {
  return (
    <code
      className={cn(
        "font-mono text-[0.7188rem]",
        tone === "red" ? "text-destructive" : "text-[color:var(--chart-2)]",
      )}
    >
      {children}
    </code>
  )
}

function chartIndexFromPointer(event: React.PointerEvent<HTMLDivElement>, pointCount: number) {
  const rect = event.currentTarget.getBoundingClientRect()
  const progress = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width))
  return Math.round(progress * (pointCount - 1))
}

function useScrubIndex(pointCount: number) {
  const [index, setIndex] = React.useState<number | null>(null)
  const frame = React.useRef<number | null>(null)
  const queued = React.useRef<number | null>(null)

  React.useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current)
    },
    [],
  )

  const update = (event: React.PointerEvent<HTMLDivElement>) => {
    queued.current = chartIndexFromPointer(event, pointCount)
    if (frame.current !== null) return
    frame.current = requestAnimationFrame(() => {
      frame.current = null
      setIndex((current) => (current === queued.current ? current : queued.current))
    })
  }

  const clear = () => {
    queued.current = null
    if (frame.current !== null) cancelAnimationFrame(frame.current)
    frame.current = null
    setIndex(null)
  }

  return { index, update, clear }
}

interface ScrubChartProps {
  children: React.ReactNode
  pointCount: number
  scrub: ReturnType<typeof useScrubIndex>
  renderTooltip: (index: number) => React.ReactNode
}

function ScrubChart({ children, pointCount, scrub, renderTooltip }: ScrubChartProps) {
  return (
    <div
      className="relative h-[10.375rem] touch-pan-y"
      onPointerDown={scrub.update}
      onPointerMove={scrub.update}
      onPointerLeave={scrub.clear}
      onPointerCancel={scrub.clear}
      onPointerUp={scrub.clear}
    >
      {children}
      {scrub.index !== null && (
        <ScrubOverlay index={scrub.index} pointCount={pointCount}>
          {renderTooltip(scrub.index)}
        </ScrubOverlay>
      )}
    </div>
  )
}

function ScrubOverlay({
  index,
  pointCount,
  children,
}: {
  index: number
  pointCount: number
  children: React.ReactNode
}) {
  const position = (index / (pointCount - 1)) * 100

  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-3 w-px -translate-x-1/2 bg-border"
        style={{ left: `${position}%` }}
      />
      <span
        className="pointer-events-none absolute top-3 z-10 -translate-x-1/2"
        style={{ left: `${Math.min(Math.max(position, 28), 72)}%` }}
      >
        {children}
      </span>
    </>
  )
}

function ChartTooltip({ rows }: { rows: { label: string; value: string; color: string }[] }) {
  return (
    <div className="pointer-events-none min-w-[8.25rem] rounded-md border border-border bg-popover p-2 text-[0.6563rem] text-popover-foreground shadow-md">
      <span className="mb-1 block text-[0.625rem] text-muted-foreground">Today, 12:00</span>
      {rows.map((row) => (
        <div key={row.label} className="flex items-center justify-between gap-3 py-0.5">
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <span className="size-1.5 rounded-full" style={{ background: row.color }} />
            {row.label}
          </span>
          <strong className="font-medium tabular-nums">{row.value}</strong>
        </div>
      ))}
    </div>
  )
}

function CompareCard() {
  const dark = useDarkMode()
  const { ref, colors } = useChartColors()
  const data = React.useMemo(
    () => ({
      mint: makePoints([-2.9, -3.4, -3.05, -3.86, -3.52, -4.1, -3.82, -4.41]),
      pistachio: makePoints([0.22, 0.58, 0.42, 0.91, 0.76, 1.08, 0.96, 1.15]),
    }),
    [],
  )
  const scrub = useScrubIndex(data.mint.length)

  const latestMint = data.mint.at(-1)?.value ?? -4.41
  const latestPistachio = data.pistachio.at(-1)?.value ?? 1.15
  const series: LivelineSeries[] = React.useMemo(
    () => [
      { id: "mint", label: "", data: data.mint, value: latestMint, color: colors.orange },
      { id: "pistachio", label: "", data: data.pistachio, value: latestPistachio, color: colors.accent },
    ],
    [colors.accent, colors.orange, data.mint, data.pistachio, latestMint, latestPistachio],
  )

  return (
    <div ref={ref} className="min-h-[17.375rem] rounded-xl border border-border bg-card p-3">
      <div className="flex items-center gap-4">
        {[
          { name: "Mint Chip", delta: formatPercent(latestMint), sub: "-$2,377.66", tone: "red", color: colors.orange },
          { name: "Pistachio", delta: formatPercent(latestPistachio), sub: "+$617.22", tone: "green", color: colors.accent },
        ].map((seriesItem) => (
          <div key={seriesItem.name} className="flex-1">
            <span className="flex items-center gap-1.5 text-[0.7188rem] text-foreground/70">
              <span className="size-2 rounded-full" style={{ background: seriesItem.color }} />
              {seriesItem.name}
            </span>
            <span
              className={cn(
                "block text-[1.0625rem] font-semibold tracking-[-0.01em] tabular-nums",
                seriesItem.tone === "red" ? "text-destructive" : "text-[color:var(--chart-2)]",
              )}
            >
              {seriesItem.delta}
            </span>
            <Mono tone={seriesItem.tone as "red" | "green"}>{seriesItem.sub}</Mono>
          </div>
        ))}
      </div>
      <div className="mt-2 overflow-hidden rounded-md border border-border bg-muted/40">
        <div className="flex items-center justify-between border-b border-border px-2.5 py-1.5">
          <span className="text-[0.6875rem] text-muted-foreground tabular-nums">Trend snapshot</span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[0.6563rem] font-medium text-foreground/70">Snapshot</span>
        </div>
        <ScrubChart
          pointCount={data.mint.length}
          scrub={scrub}
          renderTooltip={(index) => (
            <ChartTooltip
              rows={[
                { label: "Mint Chip", value: formatPercent(data.mint[index].value), color: colors.orange },
                { label: "Pistachio", value: formatPercent(data.pistachio[index].value), color: colors.accent },
              ]}
            />
          )}
        >
          <Liveline
            data={[]}
            value={0}
            series={series}
            theme={dark ? "dark" : "light"}
            grid={false}
            pulse={false}
            window={42}
            paused
            scrub={false}
            cursor="default"
            lineWidth={2.25}
            padding={{ top: 24, right: 0, bottom: 22, left: 0 }}
            formatValue={formatPercent}
          />
        </ScrubChart>
      </div>
    </div>
  )
}

function AnomalyCard() {
  const dark = useDarkMode()
  const { ref, colors } = useChartColors()
  const [metric, setMetric] = React.useState<"spend" | "usage">("spend")
  const spend = React.useMemo(() => makePoints([274, 289, 264, 307, 331, 1210, 1718, 2112], 7), [])
  const usage = React.useMemo(() => makePoints([18, 19, 17, 21, 22, 58, 81, 96], 7), [])

  const data = metric === "spend" ? spend : usage
  const scrub = useScrubIndex(data.length)
  const value = data.at(-1)?.value ?? (metric === "spend" ? 2112 : 96)
  const threshold = metric === "spend" ? "$2,112" : "82 kWh"
  const formatValue = (chartValue: number) =>
    metric === "spend" ? formatMoney(chartValue) : `${Math.round(chartValue)} kWh`

  return (
    <div ref={ref} className="min-h-[17.375rem] rounded-xl border border-border bg-card p-3">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[0.75rem] font-medium text-foreground">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-destructive" aria-hidden="true">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
          High freezer spend
        </span>
        <span className="rounded-full bg-muted px-2 py-0.5 text-[0.6563rem] font-medium text-foreground/70">Snapshot</span>
      </div>
      <div className="mt-2 overflow-hidden rounded-md border border-border bg-muted/40">
        <div className="flex items-center justify-between border-b border-border px-2.5 py-1.5">
          <span className="text-[0.6875rem] text-muted-foreground tabular-nums">
            {scrub.index !== null
              ? formatValue(data[scrub.index].value)
              : `${threshold} threshold`}
          </span>
          <span className="flex rounded-full bg-muted p-0.5">
            {(["spend", "usage"] as const).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={metric === item}
                onClick={() => setMetric(item)}
                className={cn(
                  "rounded-full px-2 py-0.5 text-[0.6563rem] font-medium transition-[background-color,color,box-shadow,transform] duration-fast active:scale-[0.96]",
                  metric === item ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item === "spend" ? "Spend" : "Usage"}
              </button>
            ))}
          </span>
        </div>
        <ScrubChart
          pointCount={data.length}
          scrub={scrub}
          renderTooltip={(index) => (
            <ChartTooltip
              rows={[
                {
                  label: metric === "spend" ? "Spend" : "Usage",
                  value: formatValue(data[index].value),
                  color: colors.red,
                },
              ]}
            />
          )}
        >
          <Liveline
            data={data}
            value={value}
            theme={dark ? "dark" : "light"}
            color={colors.red}
            grid
            scrub={false}
            fill={false}
            pulse={false}
            momentum={false}
            paused
            window={49}
            lineWidth={2.25}
            cursor="crosshair"
            padding={{ top: 18, right: 0, bottom: 22, left: 0 }}
            formatValue={formatValue}
          />
        </ScrubChart>
      </div>
      <div className="mt-1.5 flex items-baseline gap-2">
        <span className="text-[1.0625rem] font-semibold tracking-[-0.01em] text-foreground tabular-nums">
          {formatMoney(spend.at(-1)?.value ?? 2112)} spent
        </span>
        <Mono tone="red">+$1,834.66</Mono>
        <span className="text-[0.6875rem] text-muted-foreground">vs 3 months</span>
      </div>
    </div>
  )
}

function AllocationCard() {
  const segments = [
    { name: "VAN", label: "Vanilla", pct: 72.5, amount: "$51,785", color: "var(--chart-4)" },
    { name: "CHOC", label: "Chocolate", pct: 22.8, amount: "$16,278", color: "var(--chart-3)" },
    { name: "MINT", label: "Mint", pct: 4.7, amount: "$3,357", color: "var(--chart-1)" },
  ]
  const [selected, setSelected] = React.useState(segments[0].name)
  const active = segments.find((segment) => segment.name === selected) ?? segments[0]

  return (
    <div className="min-h-[17.375rem] rounded-xl border border-border bg-card p-3">
      <span className="flex items-center gap-1.5 text-[0.75rem] font-medium text-foreground">
        <span className="flex size-3.5 items-center justify-center rounded-full text-[0.5rem] font-bold text-background" style={{ background: "var(--chart-4)" }}>
          V
        </span>
        Vanilla allocation
      </span>
      <span className="mt-1 block text-[1.25rem] font-semibold tracking-[-0.01em] text-foreground tabular-nums">{active.amount}</span>
      <div className="mt-3 flex h-9 gap-0.5 overflow-hidden rounded-full bg-muted p-0.5" role="group" aria-label="Allocation segments">
        {segments.map((segment) => (
          <button
            key={segment.name}
            type="button"
            aria-pressed={selected === segment.name}
            aria-label={`${segment.label}: ${segment.pct}%`}
            onClick={() => setSelected(segment.name)}
            className="relative h-full overflow-hidden rounded-full transition-[opacity,transform,box-shadow] duration-slow active:scale-[0.98]"
            style={{
              width: `${segment.pct}%`,
              background: segment.color,
              opacity: selected === segment.name ? 1 : 0.58,
              boxShadow: selected === segment.name ? "inset 0 0 0 1px oklch(1 0 0 / 0.22)" : undefined,
              transitionTimingFunction: EASE,
            }}
          >
            <span
              className="absolute inset-y-1 left-1 rounded-full transition-[width,opacity] duration-500"
              style={{
                width: selected === segment.name ? "calc(100% - 8px)" : "0%",
                opacity: selected === segment.name ? 1 : 0,
                background: "oklch(1 0 0 / 0.2)",
                transitionTimingFunction: EASE,
              }}
            />
          </button>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        {segments.map((segment) => (
          <button
            key={segment.name}
            type="button"
            aria-pressed={selected === segment.name}
            onClick={() => setSelected(segment.name)}
            className={cn(
              "flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[0.6875rem] transition-[background-color,color,transform] duration-fast active:scale-[0.96]",
              selected === segment.name ? "bg-muted text-foreground" : "text-foreground/70 hover:bg-accent hover:text-foreground",
            )}
          >
            <span className="size-1.5 rounded-full" style={{ background: segment.color }} />
            {segment.name} <span className="tabular-nums">{segment.pct}%</span>
          </button>
        ))}
      </div>
      <div className="mt-3 min-h-16 rounded-md border border-border bg-muted/40 px-2.5 py-2">
        <span className="block text-[0.7188rem] font-medium text-foreground">{active.label}</span>
        <span className="mt-1 block text-[0.6875rem] leading-relaxed text-muted-foreground">
          Contribution snapshot across current inventory value. Segment selection changes the inspected group without moving the card.
        </span>
      </div>
    </div>
  )
}

const PAGES = [
  {
    key: "compare",
    prose: (
      <>
        The worst performer in your <Entity name="Creamery" color="var(--chart-4)" /> is Rocky Road, down{" "}
        <Mono tone="red">-6%</Mono> or <Mono tone="red">-$2,453.44</Mono>.
      </>
    ),
    Card: CompareCard,
    pill: "Should I rebalance flavors?",
  },
  {
    key: "anomaly",
    prose: (
      <>
        Unusually high freezer bill on <span className="font-medium text-foreground">Dec 13</span>:{" "}
        <Mono tone="red">+$1,834.66</Mono> above your average.
      </>
    ),
    Card: AnomalyCard,
    pill: "Get tips on cutting freezer costs",
  },
  {
    key: "allocation",
    prose: (
      <>
        You&apos;re heavily invested in <Entity name="Vanilla" color="var(--chart-4)" />, and it&apos;s{" "}
        <span className="font-medium text-foreground">72.5%</span> of your case.
      </>
    ),
    Card: AllocationCard,
    pill: "If we look at seasonals, what changes?",
  },
] as const

interface InsightCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  onPrompt?: (prompt: string) => void
}

function InsightCards({ label = "Insights", onPrompt, className, ...props }: InsightCardsProps) {
  const [page, setPage] = React.useState(0)
  const move = (direction: -1 | 1) => setPage((current) => (current + direction + PAGES.length) % PAGES.length)
  const { key, prose, Card, pill } = PAGES[page]

  return (
    <div className={cn("min-h-[25.5rem] w-full max-w-[21.5rem]", className)} {...props}>
      <div className="flex items-center justify-between">
        <span className="flex items-baseline gap-1.5">
          <span className="text-[0.8125rem] font-semibold text-foreground">{label}</span>
          <span className="text-[0.8125rem] text-muted-foreground tabular-nums">{PAGES.length}</span>
        </span>
        <span className="flex items-center gap-0.5">
          {(["M15 18l-6-6 6-6", "M9 6l6 6-6 6"] as const).map((path, index) => (
            <button
              key={path}
              type="button"
              aria-label={index === 0 ? "Previous insight" : "Next insight"}
              onClick={() => move(index === 0 ? -1 : 1)}
              className="flex size-6 items-center justify-center rounded-[0.375rem] text-muted-foreground transition-[background-color,color,transform] duration-fast hover:bg-accent hover:text-foreground active:scale-[0.96]"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={path} />
              </svg>
            </button>
          ))}
        </span>
      </div>

      <div key={key} style={{ animation: "bui-insight-fade 250ms ease-out both" }}>
        <p className="mt-1.5 text-[0.7813rem] leading-relaxed text-foreground/70">{prose}</p>
        <div className="mt-2">
          <Card />
        </div>
        <button
          type="button"
          onClick={() => onPrompt?.(pill)}
          className="mt-2 rounded-full border border-border bg-card px-3 py-1.5 text-left text-[0.75rem] text-foreground shadow-sm transition-colors duration-fast hover:bg-accent"
        >
          {pill}
        </button>
      </div>
      <style>{`
        @keyframes bui-insight-fade { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  )
}

export { InsightCards }
