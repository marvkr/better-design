"use client"

import { Liveline, type LivelinePoint, type LivelineSeries } from "liveline"
import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { focusRing } from "./_shared"

// InsightCards: small live charts an assistant attaches to its answer, in a
// paged "Insights" strip. Scrub a chart to read a point, switch a metric,
// or pick a segment of a split bar to inspect it.
//
// Usage:
//   <InsightCards />
//   <InsightCards label="Insights" onPrompt={(prompt) => ask(prompt)} />

const SNAPSHOT_END = Math.floor(Date.now() / 1000)

const formatPercent = (value: number) => `${value > 0 ? "+" : ""}${value.toFixed(2)}%`
const formatCount = (value: number) => Math.round(value).toLocaleString("en-US")

/** Spaces values evenly back in time from one fixed snapshot moment. */
function makePoints(values: number[], gap = 6): LivelinePoint[] {
  return values.map((value, index) => ({
    time: SNAPSHOT_END - (values.length - 1 - index) * gap,
    value,
  }))
}

/** Follows the `.dark` class on the root, so the chart library picks its theme. */
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

/** Reads Margin's chart tokens from the card, since the chart draws on a canvas. */
function useChartColors() {
  const ref = React.useRef<HTMLDivElement>(null)
  const [colors, setColors] = React.useState({
    ox: "oklch(0.42 0.13 25)",
    slate: "oklch(0.52 0.05 245)",
    red: "oklch(0.52 0.18 29)",
  })

  React.useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    const update = () => {
      const styles = getComputedStyle(element)
      setColors({
        ox: styles.getPropertyValue("--chart-1").trim() || "oklch(0.42 0.13 25)",
        slate: styles.getPropertyValue("--chart-2").trim() || "oklch(0.52 0.05 245)",
        red: styles.getPropertyValue("--destructive").trim() || "oklch(0.52 0.18 29)",
      })
    }

    update()
    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] })
    return () => observer.disconnect()
  }, [])

  return { ref, colors }
}

/** A tagged page name inside the prose, led by its colour dot. */
function Entity({ name, color }: { name: string; color: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-sm bg-(--mark) px-1 align-baseline font-medium text-(--mark-foreground)">
      <span className="inline-block size-2 rounded-full" style={{ background: color }} />
      {name}
    </span>
  )
}

/** A figure set in the monospace face, red when it falls and green when it rises. */
function Mono({ children, tone }: { children: React.ReactNode; tone: "red" | "green" }) {
  return (
    <code
      className={cn(
        "font-mono text-xs tabular-nums",
        tone === "red" ? "text-destructive-text" : "text-success-text",
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

/** Tracks which point the pointer sits over, once per frame. */
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

/** The chart area that turns pointer movement into a hairline and a tooltip. */
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
        className="pointer-events-none absolute inset-y-3 w-px -translate-x-1/2 bg-input"
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

/** The floating white panel that reads out the scrubbed point. */
function ChartTooltip({ rows }: { rows: { label: string; value: string; color: string }[] }) {
  return (
    <div className="pointer-events-none min-w-36 rounded-lg bg-popover p-2 text-xs text-popover-foreground shadow-md">
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

/** The small grey "Snapshot" mark in a chart header. */
function SnapshotTag() {
  return (
    <span className="flex h-5 items-center rounded-sm bg-(--field) px-1.5 text-xs text-muted-foreground">Snapshot</span>
  )
}

/** The white sheet each insight sits on. */
const insightCard = "min-h-70 rounded-xl border border-border bg-card p-3 text-card-foreground"

/** The grey plate a chart sits in, with its own header row. */
const chartPlate = "mt-2 overflow-hidden rounded-lg border border-border bg-muted"

function CompareCard() {
  const dark = useDarkMode()
  const { ref, colors } = useChartColors()
  const data = React.useMemo(
    () => ({
      drafts: makePoints([-1.9, -2.4, -2.05, -2.86, -2.52, -3.1, -2.82, -3.41]),
      shared: makePoints([0.32, 0.68, 0.52, 1.01, 0.86, 1.28, 1.16, 1.45]),
    }),
    [],
  )
  const scrub = useScrubIndex(data.drafts.length)

  const latestDrafts = data.drafts.at(-1)?.value ?? -3.41
  const latestShared = data.shared.at(-1)?.value ?? 1.45
  const series: LivelineSeries[] = React.useMemo(
    () => [
      { id: "drafts", label: "", data: data.drafts, value: latestDrafts, color: colors.slate },
      { id: "shared", label: "", data: data.shared, value: latestShared, color: colors.ox },
    ],
    [colors.ox, colors.slate, data.drafts, data.shared, latestDrafts, latestShared],
  )

  return (
    <div ref={ref} className={insightCard}>
      <div className="flex items-center gap-4">
        {[
          { name: "Drafts", delta: formatPercent(latestDrafts), sub: "-38 pages", tone: "red", color: colors.slate },
          { name: "Shared notes", delta: formatPercent(latestShared), sub: "+16 pages", tone: "green", color: colors.ox },
        ].map((item) => (
          <div key={item.name} className="flex-1">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="size-2 rounded-full" style={{ background: item.color }} />
              {item.name}
            </span>
            <span
              className={cn(
                "block text-lg font-semibold tabular-nums",
                item.tone === "red" ? "text-destructive-text" : "text-success-text",
              )}
            >
              {item.delta}
            </span>
            <Mono tone={item.tone as "red" | "green"}>{item.sub}</Mono>
          </div>
        ))}
      </div>
      <div className={chartPlate}>
        <div className="flex items-center justify-between border-b border-border bg-card px-2.5 py-1.5">
          <span className="text-xs text-muted-foreground">Last 8 weeks</span>
          <SnapshotTag />
        </div>
        <ScrubChart
          pointCount={data.drafts.length}
          scrub={scrub}
          renderTooltip={(index) => (
            <ChartTooltip
              rows={[
                { label: "Drafts", value: formatPercent(data.drafts[index].value), color: colors.slate },
                { label: "Shared notes", value: formatPercent(data.shared[index].value), color: colors.ox },
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
            lineWidth={2}
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
  const [metric, setMetric] = React.useState<"visitors" | "engagements">("visitors")
  const visitors = React.useMemo(() => makePoints([412, 436, 398, 451, 470, 1210, 1640, 1850], 7), [])
  const engagements = React.useMemo(() => makePoints([88, 94, 81, 102, 110, 296, 401, 465], 7), [])

  const data = metric === "visitors" ? visitors : engagements
  const scrub = useScrubIndex(data.length)
  const value = data.at(-1)?.value ?? (metric === "visitors" ? 1850 : 465)
  const threshold = metric === "visitors" ? "1,200 visitors" : "300 engagements"
  const formatValue = (chartValue: number) =>
    metric === "visitors" ? `${formatCount(chartValue)} visitors` : `${formatCount(chartValue)} engagements`

  return (
    <div ref={ref} className={insightCard}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
          <Icon icon="solar:graph-up-linear" className="size-4 text-(--primary-text)" aria-hidden="true" />
          Traffic spike on a shared page
        </span>
        <SnapshotTag />
      </div>
      <div className={chartPlate}>
        <div className="flex items-center justify-between border-b border-border bg-card px-2.5 py-1.5">
          <span aria-live="polite" className="text-xs tabular-nums text-muted-foreground">
            {scrub.index !== null ? formatValue(data[scrub.index].value) : `${threshold} threshold`}
          </span>
          <span className="flex rounded-md bg-(--field) p-0.5" role="group" aria-label="Metric">
            {(["visitors", "engagements"] as const).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={metric === item}
                onClick={() => setMetric(item)}
                className={cn(
                  focusRing,
                  "h-5 rounded-sm px-2 text-xs transition duration-fast active:scale-96",
                  metric === item ? "bg-card font-medium text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item === "visitors" ? "Visitors" : "Engagements"}
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
                  label: metric === "visitors" ? "Visitors" : "Engagements",
                  value: formatCount(data[index].value),
                  color: colors.ox,
                },
              ]}
            />
          )}
        >
          <Liveline
            data={data}
            value={value}
            theme={dark ? "dark" : "light"}
            color={colors.ox}
            grid
            scrub={false}
            fill={false}
            pulse={false}
            momentum={false}
            paused
            window={49}
            lineWidth={2}
            cursor="crosshair"
            padding={{ top: 18, right: 0, bottom: 22, left: 0 }}
            formatValue={formatValue}
          />
        </ScrubChart>
      </div>
      <div className="mt-1.5 flex items-baseline gap-2">
        <span className="text-lg font-semibold tabular-nums text-foreground">
          {formatCount(visitors.at(-1)?.value ?? 1850)} visitors
        </span>
        <Mono tone="green">+1,438</Mono>
        <span className="text-xs text-muted-foreground">vs last week</span>
      </div>
    </div>
  )
}

function AllocationCard() {
  const segments = [
    { name: "NOTES", label: "Notes", pct: 64.5, amount: "1,290 pages", color: "var(--chart-1)" },
    { name: "TASKS", label: "Tasks", pct: 26.8, amount: "536 pages", color: "var(--chart-3)" },
    { name: "FILES", label: "Files", pct: 8.7, amount: "174 pages", color: "var(--chart-2)" },
  ]
  const [selected, setSelected] = React.useState(segments[0].name)
  const active = segments.find((segment) => segment.name === selected) ?? segments[0]

  return (
    <div className={insightCard}>
      <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
        <Icon icon="solar:notebook-bold" className="size-4 text-(--primary-text)" aria-hidden="true" />
        Workspace by type
      </span>
      <span className="mt-1 block text-xl font-semibold tabular-nums text-foreground">{active.amount}</span>
      <div
        className="mt-3 flex h-8 gap-0.5 overflow-hidden rounded-lg bg-(--field) p-0.5"
        role="group"
        aria-label="Workspace segments"
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
              "relative h-full overflow-hidden rounded-md transition duration-slow ease-(--ease-out) active:scale-98",
              selected === segment.name ? "opacity-100" : "opacity-50 hover:opacity-75",
            )}
            style={{ width: `${segment.pct}%`, background: segment.color }}
          />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-1">
        {segments.map((segment) => (
          <button
            key={segment.name}
            type="button"
            aria-pressed={selected === segment.name}
            onClick={() => setSelected(segment.name)}
            className={cn(
              focusRing,
              "flex h-6 items-center gap-1 rounded-md px-1.5 text-xs transition duration-fast active:scale-96",
              selected === segment.name
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            <span className="size-1.5 rounded-full" style={{ background: segment.color }} />
            {segment.label} <span className="tabular-nums">{segment.pct}%</span>
          </button>
        ))}
      </div>
      <div className="mt-3 min-h-16 rounded-lg bg-muted px-3 py-2">
        <span className="block text-xs font-medium text-foreground">{active.label}</span>
        <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
          The share of pages in your workspace. Pick a segment to inspect it; the card keeps its size.
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
        In <Entity name="Product" color="var(--chart-1)" /> more drafts are going stale, down{" "}
        <Mono tone="red">-3.41%</Mono> while shared notes rise <Mono tone="green">+1.45%</Mono>.
      </>
    ),
    Card: CompareCard,
    pill: "Which drafts should I archive?",
  },
  {
    key: "anomaly",
    prose: (
      <>
        The page <span className="font-medium text-foreground">Launch plan</span> drew{" "}
        <Mono tone="green">1,850</Mono> visitors this week, four times the usual.
      </>
    ),
    Card: AnomalyCard,
    pill: "Who has been viewing the launch plan?",
  },
  {
    key: "allocation",
    prose: (
      <>
        Most of your workspace is <Entity name="Notes" color="var(--chart-1)" />, at{" "}
        <span className="font-medium text-foreground">64.5%</span> of all pages.
      </>
    ),
    Card: AllocationCard,
    pill: "Turn old notes into tasks",
  },
] as const

interface InsightCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  onPrompt?: (prompt: string) => void
}

/**
 * Margin InsightCards: a paged strip of small chart sheets. Each page has a
 * line of prose, a paper card with a grey chart plate, and a marked
 * follow-up prompt.
 */
function InsightCards({ label = "Insights", onPrompt, className, ...props }: InsightCardsProps) {
  const [page, setPage] = React.useState(0)
  const move = (direction: -1 | 1) => setPage((current) => (current + direction + PAGES.length) % PAGES.length)
  const { key, prose, Card, pill } = PAGES[page]

  return (
    <section
      aria-label={label}
      aria-roledescription="carousel"
      data-slot="insight-cards"
      className={cn("min-h-104 w-full max-w-sm", className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <span className="flex items-baseline gap-1.5">
          <span className="text-sm font-semibold text-foreground">{label}</span>
          <span className="text-xs tabular-nums text-muted-foreground">
            {page + 1} of {PAGES.length}
          </span>
        </span>
        <span className="flex items-center gap-1">
          {(["previous", "next"] as const).map((direction) => (
            <button
              key={direction}
              type="button"
              aria-label={direction === "previous" ? "Previous insight" : "Next insight"}
              onClick={() => move(direction === "previous" ? -1 : 1)}
              className={cn(
                focusRing,
                "grid size-7 place-items-center rounded-lg bg-card text-muted-foreground shadow-sm transition duration-fast hover:bg-accent hover:text-foreground active:scale-96",
              )}
            >
              <Icon
                icon={direction === "previous" ? "solar:alt-arrow-left-linear" : "solar:alt-arrow-right-linear"}
                className="size-4"
                aria-hidden="true"
              />
            </button>
          ))}
        </span>
      </div>

      <div key={key} aria-live="polite" className="animate-in fade-in duration-base">
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{prose}</p>
        <div className="mt-2">
          <Card />
        </div>
        <button
          type="button"
          onClick={() => onPrompt?.(pill)}
          className={cn(
            focusRing,
            "mt-2 flex h-7 items-center gap-1.5 rounded-lg bg-(--mark) px-2.5 text-left text-sm text-(--mark-foreground) transition-colors duration-fast hover:bg-primary/15",
          )}
        >
          <Icon icon="solar:magic-stick-3-linear" className="size-4" aria-hidden="true" />
          {pill}
        </button>
      </div>
    </section>
  )
}

export { InsightCards }
