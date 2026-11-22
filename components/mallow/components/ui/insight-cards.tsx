"use client"

import { Liveline, type LivelinePoint, type LivelineSeries } from "liveline"
import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { focusRing, pressScale, selectedOption, surfacePanel, optionTrack } from "./_shared"

const SNAPSHOT_END = Math.floor(Date.now() / 1000)

const formatPercent = (value: number) => `${value > 0 ? "+" : ""}${value.toFixed(2)}%`
const formatMoney = (value: number) => `$${Math.round(value).toLocaleString("en-US")}`

function makePoints(values: number[], gap = 6): LivelinePoint[] {
  return values.map((value, index) => ({
    time: SNAPSHOT_END - (values.length - 1 - index) * gap,
    value,
  }))
}

/**
 * Reads the chart colours from the element's own scope, and the theme from
 * whether an ancestor carries `.dark`; light is the default.
 */
function useChartTheme() {
  const ref = React.useRef<HTMLDivElement>(null)
  const [theme, setTheme] = React.useState<"dark" | "light">("light")
  const [colors, setColors] = React.useState({
    first: "oklch(0.52 0.2 288)",
    fee: "oklch(0.66 0.17 35)",
    red: "oklch(0.55 0.2 22)",
  })

  React.useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    const update = () => {
      const styles = getComputedStyle(element)
      setTheme(element.closest(".dark") ? "dark" : "light")
      setColors({
        first: styles.getPropertyValue("--chart-1").trim() || "oklch(0.52 0.2 288)",
        fee: styles.getPropertyValue("--fee").trim() || "oklch(0.66 0.17 35)",
        red: styles.getPropertyValue("--destructive").trim() || "oklch(0.55 0.2 22)",
      })
    }

    update()
    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, { attributes: true, subtree: true, attributeFilter: ["class", "style"] })
    return () => observer.disconnect()
  }, [])

  return { ref, theme, colors }
}

function Entity({ name, color }: { name: string; color: string }) {
  return (
    <span className="inline-flex items-center gap-1 align-baseline font-medium text-foreground">
      <span className="inline-block size-2 rounded-full" style={{ background: color }} />
      {name}
    </span>
  )
}

function Figure({ children, tone }: { children: React.ReactNode; tone: "down" | "up" | "cost" }) {
  return (
    <span
      className={cn(
        "font-medium tabular-nums",
        tone === "down" && "text-destructive-text",
        tone === "up" && "text-success-text",
        tone === "cost" && "text-(--fee)",
      )}
    >
      {children}
    </span>
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
      className="relative h-40 touch-pan-y"
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
        className="pointer-events-none absolute inset-y-3 w-px -translate-x-1/2 bg-foreground/20"
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
    <div className="pointer-events-none min-w-32 rounded-md bg-popover p-2 text-xs text-popover-foreground shadow-(--shadow-menu)">
      <span className="mb-1 block text-muted-foreground">Today, 12:00</span>
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

/** A quiet header chip on the lilac tag fill. */
function SnapshotChip() {
  return (
    <span className="rounded-full bg-(--tag) px-2 py-0.5 text-xs text-muted-foreground">Snapshot</span>
  )
}

const insightCard = cn(surfacePanel, "min-h-70 rounded-2xl p-4")
const chartWell = cn(optionTrack, "mt-3 overflow-hidden rounded-xl")
const chartHeader = "flex items-center justify-between px-3 pt-2.5 pb-1"

function CompareCard() {
  const { ref, theme, colors } = useChartTheme()
  const data = React.useMemo(
    () => ({
      oak: makePoints([-1.9, -2.4, -2.15, -2.86, -2.52, -3.1, -2.82, -3.41]),
      birch: makePoints([0.32, 0.68, 0.52, 1.01, 0.86, 1.18, 1.06, 1.35]),
    }),
    [],
  )
  const scrub = useScrubIndex(data.oak.length)

  const latestOak = data.oak.at(-1)?.value ?? -3.41
  const latestBirch = data.birch.at(-1)?.value ?? 1.35
  const series: LivelineSeries[] = React.useMemo(
    () => [
      { id: "oak", label: "", data: data.oak, value: latestOak, color: colors.fee },
      { id: "birch", label: "", data: data.birch, value: latestBirch, color: colors.first },
    ],
    [colors.fee, colors.first, data.oak, data.birch, latestOak, latestBirch],
  )

  return (
    <div ref={ref} className={insightCard}>
      <div className="flex items-start gap-4">
        {[
          { name: "Oak boards", delta: formatPercent(latestOak), sub: "-$1,284.10", tone: "down", color: colors.fee },
          { name: "Birch panels", delta: formatPercent(latestBirch), sub: "+$412.75", tone: "up", color: colors.first },
        ].map((item) => (
          <div key={item.name} className="flex-1">
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <span className="size-2 rounded-full" style={{ background: item.color }} />
              {item.name}
            </span>
            <span className="mt-0.5 block text-2xl font-medium tracking-tight tabular-nums text-foreground">
              {item.delta}
            </span>
            <span className="text-xs">
              <Figure tone={item.tone as "down" | "up"}>{item.sub}</Figure>
            </span>
          </div>
        ))}
      </div>
      <div className={chartWell}>
        <div className={chartHeader}>
          <span className="text-xs tabular-nums text-muted-foreground">Last 8 weeks</span>
          <SnapshotChip />
        </div>
        <ScrubChart
          pointCount={data.oak.length}
          scrub={scrub}
          renderTooltip={(index) => (
            <ChartTooltip
              rows={[
                { label: "Oak boards", value: formatPercent(data.oak[index].value), color: colors.fee },
                { label: "Birch panels", value: formatPercent(data.birch[index].value), color: colors.first },
              ]}
            />
          )}
        >
          <Liveline
            data={[]}
            value={0}
            series={series}
            theme={theme}
            grid={false}
            pulse={false}
            window={42}
            paused
            scrub={false}
            cursor="default"
            lineWidth={2}
            padding={{ top: 20, right: 0, bottom: 20, left: 0 }}
            formatValue={formatPercent}
          />
        </ScrubChart>
      </div>
    </div>
  )
}

function AnomalyCard() {
  const { ref, theme, colors } = useChartTheme()
  const [metric, setMetric] = React.useState<"spend" | "usage">("spend")
  const spend = React.useMemo(() => makePoints([182, 196, 174, 205, 219, 640, 905, 1128], 7), [])
  const usage = React.useMemo(() => makePoints([12, 13, 11, 14, 15, 38, 54, 66], 7), [])

  const data = metric === "spend" ? spend : usage
  const scrub = useScrubIndex(data.length)
  const value = data.at(-1)?.value ?? (metric === "spend" ? 1128 : 66)
  const threshold = metric === "spend" ? "$1,128" : "66 kWh"
  const formatValue = (chartValue: number) =>
    metric === "spend" ? formatMoney(chartValue) : `${Math.round(chartValue)} kWh`

  return (
    <div ref={ref} className={insightCard}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
          <Icon icon="iconoir:warning-triangle" className="size-4 text-(--fee)" aria-hidden="true" />
          High kiln spend
        </span>
        <SnapshotChip />
      </div>
      <div className={chartWell}>
        <div className={chartHeader}>
          <span className="text-xs tabular-nums text-muted-foreground">
            {scrub.index !== null ? formatValue(data[scrub.index].value) : `${threshold} this week`}
          </span>
          <span className="flex rounded-full bg-(--tag) p-0.5" role="group" aria-label="Metric">
            {(["spend", "usage"] as const).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={metric === item}
                onClick={() => setMetric(item)}
                className={cn(
                  focusRing,
                  pressScale,
                  "rounded-full px-2.5 py-0.5 text-xs font-medium",
                  metric === item ? selectedOption : "text-muted-foreground pointer-fine:hover:text-foreground",
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
                  color: colors.fee,
                },
              ]}
            />
          )}
        >
          <Liveline
            data={data}
            value={value}
            theme={theme}
            color={colors.fee}
            grid
            scrub={false}
            fill={false}
            pulse={false}
            momentum={false}
            paused
            window={49}
            lineWidth={2}
            cursor="crosshair"
            padding={{ top: 16, right: 0, bottom: 20, left: 0 }}
            formatValue={formatValue}
          />
        </ScrubChart>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-medium tracking-tight tabular-nums text-foreground">
          {formatMoney(spend.at(-1)?.value ?? 1128)}
        </span>
        <span className="text-sm">
          <Figure tone="cost">+$909.40</Figure>
        </span>
        <span className="text-sm text-muted-foreground">vs 3 months</span>
      </div>
    </div>
  )
}

function AllocationCard() {
  const segments = [
    { name: "ASH", label: "Ash stock", pct: 68.4, amount: "$38,420", color: "var(--chart-1)" },
    { name: "ELM", label: "Elm stock", pct: 24.1, amount: "$13,537", color: "var(--chart-3)" },
    { name: "YEW", label: "Yew stock", pct: 7.5, amount: "$4,213", color: "var(--chart-2)" },
  ]
  const [selected, setSelected] = React.useState(segments[0].name)
  const active = segments.find((segment) => segment.name === selected) ?? segments[0]

  return (
    <div className={insightCard}>
      <span className="text-sm text-muted-foreground">{active.label}</span>
      <span className="mt-0.5 block text-3xl font-medium tracking-tight tabular-nums text-foreground">
        {active.amount}
      </span>
      <div
        className={cn(optionTrack, "mt-4 flex h-9 gap-1 overflow-hidden rounded-full p-1")}
        role="group"
        aria-label="Allocation segments"
      >
        {segments.map((segment) => (
          <button
            key={segment.name}
            type="button"
            aria-pressed={selected === segment.name}
            aria-label={`${segment.label}: ${segment.pct}%`}
            onClick={() => setSelected(segment.name)}
            className={cn(
              focusRing,
              "h-full rounded-full transition-opacity duration-slow ease-(--ease-out) motion-reduce:transition-none",
              selected === segment.name ? "opacity-100" : "opacity-45 pointer-fine:hover:opacity-70",
            )}
            style={{ width: `${segment.pct}%`, background: segment.color }}
          />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-1">
        {segments.map((segment) => (
          <button
            key={segment.name}
            type="button"
            aria-pressed={selected === segment.name}
            onClick={() => setSelected(segment.name)}
            className={cn(
              focusRing,
              pressScale,
              "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs",
              selected === segment.name ? selectedOption : "text-muted-foreground pointer-fine:hover:text-foreground",
            )}
          >
            <span className="size-1.5 rounded-full" style={{ background: segment.color }} />
            {segment.name} <span className="tabular-nums">{segment.pct}%</span>
          </button>
        ))}
      </div>
      <div className={cn(optionTrack, "mt-3 min-h-16 rounded-xl px-3 py-2.5")}>
        <span className="block text-sm font-medium text-foreground">{active.label}</span>
        <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
          Share of stock value held today. Pick a segment to inspect it; the card keeps its place.
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
        <Entity name="Oak boards" color="var(--chart-2)" /> fell the most this quarter, down{" "}
        <Figure tone="down">-3.41%</Figure> or <Figure tone="down">-$1,284.10</Figure>.
      </>
    ),
    Card: CompareCard,
    pill: "Should I order less oak?",
  },
  {
    key: "anomaly",
    prose: (
      <>
        The kiln ran long on <span className="font-medium text-foreground">Mar 14</span>, costing{" "}
        <Figure tone="cost">$909.40</Figure> above the usual week.
      </>
    ),
    Card: AnomalyCard,
    pill: "How do I cut kiln costs?",
  },
  {
    key: "allocation",
    prose: (
      <>
        <Entity name="Ash stock" color="var(--chart-1)" /> holds{" "}
        <span className="font-medium tabular-nums text-foreground">68.4%</span> of your stock value.
      </>
    ),
    Card: AllocationCard,
    pill: "What if I spread it out?",
  },
] as const

interface InsightCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  onPrompt?: (prompt: string) => void
}

/**
 * Mallow InsightCards: a paged set of insights, each a sentence over a small
 * chart on a lilac option track, with a follow-up prompt as a lilac chip.
 */
function InsightCards({ label = "Insights", onPrompt, className, ...props }: InsightCardsProps) {
  const [page, setPage] = React.useState(0)
  const move = (direction: -1 | 1) => setPage((current) => (current + direction + PAGES.length) % PAGES.length)
  const { key, prose, Card, pill } = PAGES[page]

  return (
    <div data-slot="insight-cards" className={cn("w-full max-w-sm", className)} {...props}>
      <div className="flex items-center justify-between">
        <span className="flex items-baseline gap-1.5">
          <span className="text-sm font-medium text-foreground">{label}</span>
          <span className="text-sm tabular-nums text-muted-foreground">
            {page + 1} of {PAGES.length}
          </span>
        </span>
        <span className="flex items-center gap-1">
          {([-1, 1] as const).map((direction) => (
            <button
              key={direction}
              type="button"
              aria-label={direction === -1 ? "Previous insight" : "Next insight"}
              onClick={() => move(direction)}
              className={cn(
                focusRing,
                pressScale,
                "flex size-8 items-center justify-center rounded-full text-muted-foreground pointer-fine:hover:bg-accent pointer-fine:hover:text-foreground",
              )}
            >
              <Icon
                icon={direction === -1 ? "iconoir:nav-arrow-left" : "iconoir:nav-arrow-right"}
                className="size-4"
                aria-hidden="true"
              />
            </button>
          ))}
        </span>
      </div>

      <div key={key} aria-live="polite" className="animate-in fade-in duration-base motion-reduce:animate-none">
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{prose}</p>
        <div className="mt-3">
          <Card />
        </div>
        <button
          type="button"
          onClick={() => onPrompt?.(pill)}
          className={cn(
            focusRing,
            pressScale,
            "mt-3 rounded-full bg-(--tag) px-3.5 py-2 text-left text-sm text-foreground pointer-fine:hover:bg-accent",
          )}
        >
          {pill}
        </button>
      </div>
    </div>
  )
}

export { InsightCards }
