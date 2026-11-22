"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "./tabs"

// FineTuneCard: a compact property inspector where an agent adjusts a
// component, styled like a docs props panel. Number fields scrub: drag the
// label east or west, use the arrow keys (Shift for x10), or type a value.
//
// Usage:
//   <FineTuneCard />
//   <FineTuneCard target="Callout" typeOptions={["Note", "Warning"]} />

function ScrubField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix = "",
  active,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step?: number
  suffix?: string
  active?: boolean
}) {
  const drag = React.useRef<{ x: number; v: number } | null>(null)
  const clamp = (v: number) => Math.min(max, Math.max(min, Math.round(v)))

  return (
    <label
      className={cn(
        "flex h-7 min-w-0 items-center gap-1 rounded-md border py-1 pr-1.5 pl-0.5 transition-colors duration-fast",
        active ? "border-(--primary-line) bg-(--primary-wash)" : "border-(--line-strong) bg-(--field)",
      )}
    >
      <span
        role="slider"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        tabIndex={0}
        onPointerDown={(e) => {
          ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
          drag.current = { x: e.clientX, v: value }
        }}
        onPointerMove={(e) => {
          if (!drag.current) return
          onChange(clamp(drag.current.v + ((e.clientX - drag.current.x) / 2) * step))
        }}
        onPointerUp={() => {
          drag.current = null
        }}
        onKeyDown={(e) => {
          const mult = e.shiftKey ? 10 : 1
          if (e.key === "ArrowUp" || e.key === "ArrowRight") {
            e.preventDefault()
            onChange(clamp(value + step * mult))
          } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
            e.preventDefault()
            onChange(clamp(value - step * mult))
          }
        }}
        className="flex h-full shrink-0 cursor-ew-resize touch-none select-none items-center rounded-sm px-1 font-mono text-xs text-muted-foreground outline-none hover:text-foreground focus-visible:text-(--primary-text)"
      >
        {label}
      </span>
      <input
        inputMode="numeric"
        value={value}
        onChange={(e) => {
          const n = Number(e.target.value.replace(/[^\d-]/g, ""))
          if (!Number.isNaN(n)) onChange(clamp(n))
        }}
        aria-label={`${label} value`}
        className="min-w-0 flex-1 bg-transparent font-mono text-xs text-foreground tabular-nums outline-none"
      />
      {suffix && <span className="shrink-0 text-xs text-muted-foreground">{suffix}</span>}
    </label>
  )
}

const SEGMENTS = ["row", "col", "grid"] as const
const SEGMENT_ICONS: Record<string, string> = {
  row: "feather:columns",
  col: "feather:align-justify",
  grid: "feather:grid",
}

interface FineTuneCardProps extends React.HTMLAttributes<HTMLDivElement> {
  target?: string
  typeOptions?: string[]
}

function FineTuneCard({
  target = "Card group",
  typeOptions = ["Note", "Tip", "Warning"],
  className,
  ...props
}: FineTuneCardProps) {
  const [seg, setSeg] = React.useState("row")
  const [width, setWidth] = React.useState(320)
  const [height, setHeight] = React.useState(96)
  const [radius, setRadius] = React.useState(16)
  const [opacity, setOpacity] = React.useState(100)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [typeValue, setTypeValue] = React.useState("Select type")
  const done =
    seg !== "row" || width !== 320 || height !== 96 || radius !== 16 || opacity !== 100 || typeValue !== "Select type"

  return (
    <div className={cn("relative w-full max-w-60 rounded-xl border border-border bg-card", className)} {...props}>
      <div className="flex items-center justify-between border-b border-border px-3.5 py-2.5">
        <span className="font-mono text-[0.8125rem] font-medium text-foreground">{`<${target.replace(/\s+/g, "")} />`}</span>
        {done ? (
          <span className="flex animate-in fade-in items-center gap-1 text-xs font-medium text-(--primary-text) duration-base">
            <Icon icon="feather:check" className="size-3" aria-hidden="true" />
            Edited
          </span>
        ) : (
          <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">Props</span>
        )}
      </div>

      <div className="flex flex-col gap-2 border-b border-border p-3.5">
        <p className="text-xs font-semibold text-foreground">Layout</p>
        <Tabs value={seg} onValueChange={setSeg}>
          <TabsList aria-label="Layout" className="grid w-full grid-cols-3 items-stretch">
            {SEGMENTS.map((s) => (
              <TabsTrigger key={s} value={s} aria-label={`${s} layout`} className="px-0">
                <Icon icon={SEGMENT_ICONS[s]} className="size-3.5" aria-hidden="true" />
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="grid min-w-0 grid-cols-2 gap-2">
          <ScrubField label="W" value={width} onChange={setWidth} min={40} max={999} active={width !== 320} />
          <ScrubField label="H" value={height} onChange={setHeight} min={24} max={999} active={height !== 96} />
        </div>
        <div className="grid min-w-0 grid-cols-2 gap-2">
          <ScrubField label="R" value={radius} onChange={setRadius} min={0} max={64} active={radius !== 16} />
          <ScrubField label="α" value={opacity} onChange={setOpacity} min={0} max={100} suffix="%" active={opacity !== 100} />
        </div>
      </div>

      <div className="flex items-center justify-between px-3.5 py-2.5">
        <span className="font-mono text-xs text-muted-foreground">type</span>
        <div className="relative w-[7.5rem]">
          <button
            type="button"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
            className={cn(
              "flex h-7 w-full items-center justify-between rounded-md border bg-(--field) py-1 pr-1.5 pl-2 outline-none transition-colors duration-fast focus-visible:ring-3 focus-visible:ring-ring",
              menuOpen ? "border-primary" : "border-(--line-strong)",
            )}
          >
            <span className={cn("text-xs", typeValue !== "Select type" ? "text-foreground" : "text-muted-foreground")}>
              {typeValue}
            </span>
            <Icon
              icon="feather:chevron-down"
              className={cn("size-3 text-muted-foreground transition-transform duration-base", menuOpen && "rotate-180")}
              aria-hidden="true"
            />
          </button>

          {menuOpen && (
            <div className="absolute right-0 bottom-8 z-10 w-[7.5rem] origin-bottom-right animate-in fade-in zoom-in-95 rounded-lg bg-popover p-1 shadow-(--shadow-menu) duration-fast">
              {typeOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setTypeValue(item)
                    setMenuOpen(false)
                  }}
                  className={cn(
                    "flex h-7 w-full items-center rounded-md px-2 text-left text-xs outline-none transition-colors duration-fast hover:bg-accent focus-visible:bg-accent",
                    item === typeValue ? "font-medium text-(--primary-text)" : "text-foreground",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export { FineTuneCard }
