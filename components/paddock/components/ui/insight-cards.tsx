"use client"

import { Liveline, type LivelinePoint, type LivelineSeries } from "liveline"
import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { cardSlab, focusRing, popoverSurface, pressScale, raisedSurface, surfacePlate, wellInset } from "./_shared"

// InsightCards: small embedded charts in an "Insights N" carousel, with
// pointer scrub tooltips, a metric switch and a split-bar inspector, drawn
// as white bordered cards over grey chart wells.

const SNAPSHOT_END = Math.floor(Date.now() / 1000)

const formatDays = (value: number) => `${value > 0 ? "+" : ""}${value.toFixed(1)}d`
const formatHours = (value: number) => `${Math.round(value).toLocaleString("en-US")} h`

function makePoints(values: number[], gap = 6): LivelinePoint[] {
  return values.map((value, index) => ({
    time: SNAPSHOT_END - (values.length - 1 - index) * gap,
    value,
  }))
}

/** Tracks the `.dark` class on the root so the chart picks its theme. */
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

/** Reads the chart tokens off the card, because the chart draws on a canvas. */
function useChartColors() {
  const ref = React.useRef<HTMLDivElement>(null)
  const [colors, setColors] = React.useState({
    accent: "oklch(0.66 0.2 38)",
    ink: "oklch(0.2 0.004 90)",
    red: "oklch(0.56 0.2 27)",
  })

  React.useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    const update = () => {
      const styles = getComputedStyle(element)
      setColors({
        accent: styles.getPropertyValue("--chart-1").trim() || "oklch(0.66 0.2 38)",
        ink: styles.getPropertyValue("--chart-2").trim() || "oklch(0.2 0.004 90)",
        red: styles.getPropertyValue("--destructive").trim() || "oklch(0.56 0.2 27)",
      })
    }

    update()
    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] })
    return () => observer.disconnect()
  }, [])

  return { ref, colors }
}

/** A tagged name in the prose: a coloured dot and the name. */
function Entity({ name, color }: { name: string; color: string }) {
  return (
    <span className="inline-flex items-center gap-1 align-baseline font-medium text-foreground">
      <span className="inline-block size-2 rounded-full" style={{ background: color }} />
      {name}
    </span>
  )
}

/** A figure in the prose, red when it is bad news and green when it is good. */
function Figure({ children, tone }: { children: React.ReactNode; tone: "red" | "green" }) {
  return (
    <span
      className={cn(
        "font-medium tabular-nums",
        tone === "red" ? "text-destructive-text" : "text-success-text",
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

/** Maps the pointer to a data index, once per frame. */
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

function ChartTooltip({ rows }: { rows: { label: string; value: string; color: string }[] }) {
  return (
    <div className={cn(popoverSurface, "pointer-events-none min-w-32 p-2 text-xs")}>
      <span className="mb-1 block text-muted-foreground">This week</span>
      {rows.map((row) => (
        <div key={row.label} className="flex items-center justify-between gap-3 py-0.5">
          <span className="inline-flex items-center gap-1.5 text-secondary-foreground">
            <span className="size-1.5 rounded-full" style={{ background: row.color }} />
            {row.label}
          </span>
          <strong className="font-medium tabular-nums">{row.value}</strong>
        </div>
      ))}
    </div>
  )
}

/** The small grey "Snapshot" tag every chart well carries. */
function SnapshotTag() {
  return (
    <span className="rounded-sm bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">Snapshot</span>
  )
}

function CompareCard() {
  const dark = useDarkMode()
  const { ref, colors } = useChartColors()
  const data = React.useMemo(
    () => ({
      review: makePoints([1.2, 1.6, 1.4, 2.3, 2.1, 2.9, 2.6, 3.4]),
      build: makePoints([-0.4, -0.2, -0.6, -0.5, -0.9, -0.7, -1.1, -1.3]),
    }),
    [],
  )
  const scrub = useScrubIndex(data.review.length)

  const latestReview = data.review.at(-1)?.value ?? 3.4
  const latestBuild = data.build.at(-1)?.value ?? -1.3
  const series: LivelineSeries[] = React.useMemo(
    () => [
      { id: "review", label: "", data: data.review, value: latestReview, color: colors.accent },
      { id: "build", label: "", data: data.build, value: latestBuild, color: colors.ink },
    ],
    [colors.accent, colors.ink, data.review, data.build, latestReview, latestBuild],
  )

  return (
    <div ref={ref} className={cn(cardSlab, "min-h-72 rounded-xl p-3")}>
      <div className="flex items-center gap-4">
        {[
          { name: "Review stage", delta: formatDays(latestReview), sub: "behind plan", tone: "red", color: colors.accent },
          { name: "Build stage", delta: formatDays(latestBuild), sub: "ahead of plan", tone: "green", color: colors.ink },
        ].map((item) => (
          <div key={item.name} className="flex-1">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="size-2 rounded-full" style={{ background: item.color }} />
              {item.name}
            </span>
            <span
              className={cn(
                "block text-lg font-semibold tracking-tight tabular-nums",
                item.tone === "red" ? "text-destructive-text" : "text-success-text",
              )}
            >
              {item.delta}
            </span>
            <span className="text-xs text-muted-foreground">{item.sub}</span>
          </div>
        ))}
      </div>
      <div className={cn(surfacePlate, "mt-2.5 overflow-hidden rounded-lg")}>
        <div className="flex items-center justify-between border-b border-border px-2.5 py-1.5">
          <span className="text-xs text-muted-foreground tabular-nums">Days from plan, 8 weeks</span>
          <SnapshotTag />
        </div>
        <ScrubChart
          pointCount={data.review.length}
          scrub={scrub}
          renderTooltip={(index) => (
            <ChartTooltip
              rows={[
                { label: "Review", value: formatDays(data.review[index].value), color: colors.accent },
                { label: "Build", value: formatDays(data.build[index].value), color: colors.ink },
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
            formatValue={formatDays}
          />
        </ScrubChart>
      </div>
    </div>
  )
}

function AnomalyCard() {
  const dark = useDarkMode()
  const { ref, colors } = useChartColors()
  const [metric, setMetric] = React.useState<"hours" | "tasks">("hours")
  const hours = React.useMemo(() => makePoints([62, 58, 66, 61, 70, 118, 142, 164], 7), [])
  const tasks = React.useMemo(() => makePoints([14, 12, 15, 13, 16, 29, 34, 41], 7), [])

  const data = metric === "hours" ? hours : tasks
  const scrub = useScrubIndex(data.length)
  const value = data.at(-1)?.value ?? (metric === "hours" ? 164 : 41)
  const threshold = metric === "hours" ? "90 h" : "20 tasks"
  const formatValue = (chartValue: number) =>
    metric === "hours" ? formatHours(chartValue) : `${Math.round(chartValue)} tasks`

  return (
    <div ref={ref} className={cn(cardSlab, "min-h-72 rounded-xl p-3")}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-medium text-foreground">
          <Icon icon="mingcute:arrow-up-line" className="size-3.5 text-destructive-text" aria-hidden="true" />
          Review queue is growing
        </span>
        <SnapshotTag />
      </div>
      <div className={cn(surfacePlate, "mt-2.5 overflow-hidden rounded-lg")}>
        <div className="flex items-center justify-between border-b border-border px-2.5 py-1.5">
          <span className="text-xs text-muted-foreground tabular-nums">
            {scrub.index !== null ? formatValue(data[scrub.index].value) : `${threshold} limit`}
          </span>
          <span className={cn(wellInset, "flex rounded-md p-0.5")}>
            {(["hours", "tasks"] as const).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={metric === item}
                onClick={() => setMetric(item)}
                className={cn(
                  focusRing,
                  pressScale,
                  "rounded-sm px-2 py-0.5 text-xs font-medium",
                  metric === item ? "bg-card text-foreground shadow-(--segment-lift)" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item === "hours" ? "Hours" : "Tasks"}
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
                  label: metric === "hours" ? "Hours" : "Tasks",
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
            lineWidth={2}
            cursor="crosshair"
            padding={{ top: 18, right: 0, bottom: 22, left: 0 }}
            formatValue={formatValue}
          />
        </ScrubChart>
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-lg font-semibold tracking-tight text-foreground tabular-nums">
          {formatHours(hours.at(-1)?.value ?? 164)} waiting
        </span>
        <Figure tone="red">+94 h</Figure>
        <span className="text-xs text-muted-foreground">vs last month</span>
      </div>
    </div>
  )
}

function AllocationCard() {
  const segments = [
    { name: "DSGN", label: "Design", pct: 48.5, amount: "312 h", color: "var(--chart-1)" },
    { name: "BUILD", label: "Build", pct: 36.2, amount: "233 h", color: "var(--chart-2)" },
    { name: "QA", label: "Quality checks", pct: 15.3, amount: "98 h", color: "var(--chart-5)" },
  ]
  const [selected, setSelected] = React.useState(segments[0].name)
  const active = segments.find((segment) => segment.name === selected) ?? segments[0]

  return (
    <div className={cn(cardSlab, "min-h-72 rounded-xl p-3")}>
      <span className="flex items-center gap-1.5 text-xs font-medium text-foreground">
        <span className="size-2 rounded-full" style={{ background: active.color }} />
        {active.label} hours this quarter
      </span>
      <span className="mt-1 block text-xl font-semibold tracking-tight text-foreground tabular-nums">{active.amount}</span>
      <div className={cn(wellInset, "mt-3 flex h-9 gap-0.5 overflow-hidden rounded-md p-0.5")} role="group" aria-label="Allocation segments">
        {segments.map((segment) => (
          <button
            key={segment.name}
            type="button"
            aria-pressed={selected === segment.name}
            aria-label={`${segment.label}: ${segment.pct}%`}
            onClick={() => setSelected(segment.name)}
            className={cn(
              focusRing,
              "relative h-full overflow-hidden rounded-sm transition-[opacity,transform] duration-slow ease-out active:scale-98",
              selected === segment.name ? "opacity-100" : "opacity-45 hover:opacity-70",
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
              pressScale,
              "flex h-6 items-center gap-1 rounded-sm px-2 text-xs",
              selected === segment.name
                ? "bg-secondary font-medium text-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            <span className="size-1.5 rounded-full" style={{ background: segment.color }} />
            {segment.name} <span className="tabular-nums">{segment.pct}%</span>
          </button>
        ))}
      </div>
      <div className={cn(surfacePlate, "mt-3 min-h-16 rounded-lg px-3 py-2")}>
        <span className="block text-xs font-medium text-foreground">{active.label}</span>
        <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
          Share of logged hours across every open project. Pick a segment to inspect it without moving the card.
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
        The <Entity name="Review" color="var(--chart-1)" /> stage is running{" "}
        <Figure tone="red">3.4 days</Figure> behind plan while build is <Figure tone="green">1.3 days</Figure> ahead.
      </>
    ),
    Card: CompareCard,
    pill: "Should I move a reviewer from build?",
  },
  {
    key: "anomaly",
    prose: (
      <>
        Hours waiting in review jumped on <span className="font-medium text-foreground">week 6</span>:{" "}
        <Figure tone="red">+94 h</Figure> over the usual load.
      </>
    ),
    Card: AnomalyCard,
    pill: "Which cards are stuck the longest?",
  },
  {
    key: "allocation",
    prose: (
      <>
        Most logged time goes to <Entity name="Design" color="var(--chart-1)" />, at{" "}
        <span className="font-medium text-foreground">48.5%</span> of the quarter.
      </>
    ),
    Card: AllocationCard,
    pill: "How would a second designer change this?",
  },
] as const

interface InsightCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  onPrompt?: (prompt: string) => void
}

/**
 * Paddock InsightCards: a carousel of schedule insights, each a line of prose
 * over a white chart card and a white prompt button.
 */
function InsightCards({ label = "Insights", onPrompt, className, ...props }: InsightCardsProps) {
  const [page, setPage] = React.useState(0)
  const move = (direction: -1 | 1) => setPage((current) => (current + direction + PAGES.length) % PAGES.length)
  const { key, prose, Card, pill } = PAGES[page]

  return (
    <div className={cn("min-h-104 w-full max-w-88", className)} {...props}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <span className="text-[0.9375rem] font-semibold text-foreground">{label}</span>
          <span className="rounded-sm bg-secondary px-1.5 text-xs font-medium text-secondary-foreground tabular-nums">
            {PAGES.length}
          </span>
        </span>
        <span className="flex items-center gap-0.5">
          {(["mingcute:left-line", "mingcute:right-line"] as const).map((icon, index) => (
            <button
              key={icon}
              type="button"
              aria-label={index === 0 ? "Previous insight" : "Next insight"}
              onClick={() => move(index === 0 ? -1 : 1)}
              className={cn(
                focusRing,
                pressScale,
                "flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <Icon icon={icon} className="size-4" aria-hidden="true" />
            </button>
          ))}
        </span>
      </div>

      <div key={key} className="animate-in fade-in duration-base">
        <p className="mt-1.5 text-[0.8125rem] text-muted-foreground">{prose}</p>
        <div className="mt-2.5">
          <Card />
        </div>
        <button
          type="button"
          onClick={() => onPrompt?.(pill)}
          className={cn(raisedSurface, focusRing, pressScale, "mt-2.5 h-8 rounded-md px-3.5 text-left text-xs font-medium")}
        >
          {pill}
        </button>
      </div>
    </div>
  )
}

export { InsightCards }
