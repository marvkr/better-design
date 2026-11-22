"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "./tabs"

// Cream editorial FineTuneCard: a small oat inspector where an agent adjusts
// design properties. Number fields scrub: drag the label sideways, use the
// arrow keys (Shift for x10), or type a value. A changed field takes a pale
// terracotta wash, and the header notes the edit.
//
// Usage:
//   <FineTuneCard />
//   <FineTuneCard target="Hero banner" typeOptions={["Essay", "Note"]} />

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
        "flex h-7 min-w-0 items-center gap-1 rounded-md border py-1 pe-1.5 ps-1 transition-colors duration-fast ease-out",
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
          e.currentTarget.setPointerCapture(e.pointerId)
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
        className="flex h-full shrink-0 cursor-ew-resize touch-none select-none items-center rounded-sm px-1 text-xs text-muted-foreground outline-none hover:text-foreground focus-visible:text-(--primary-text)"
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
        className="min-w-0 flex-1 bg-transparent font-mono text-xs tabular-nums text-foreground outline-none"
      />
      {suffix && <span className="shrink-0 text-xs text-muted-foreground">{suffix}</span>}
    </label>
  )
}

const SEGMENTS = ["row", "col", "grid"] as const

/** A tiny diagram of the layout: three cells in a row, two stacked, or a 2x2 grid. */
function SegmentIcon({ kind }: { kind: string }) {
  const cell = "size-1.5 rounded-xs border border-current"
  if (kind === "row")
    return <span aria-hidden="true" className="flex gap-0.5">{[0, 1, 2].map((i) => <span key={i} className={cell} />)}</span>
  if (kind === "col")
    return <span aria-hidden="true" className="flex flex-col gap-0.5">{[0, 1].map((i) => <span key={i} className={cell} />)}</span>
  return (
    <span aria-hidden="true" className="grid grid-cols-2 gap-0.5">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className={cell} />
      ))}
    </span>
  )
}

interface FineTuneCardProps extends React.HTMLAttributes<HTMLDivElement> {
  target?: string
  typeOptions?: string[]
}

function FineTuneCard({
  target = "Article card",
  typeOptions = ["Essay", "Note", "Report"],
  className,
  ...props
}: FineTuneCardProps) {
  const [seg, setSeg] = React.useState("row")
  const [width, setWidth] = React.useState(324)
  const [height, setHeight] = React.useState(96)
  const [radius, setRadius] = React.useState(24)
  const [opacity, setOpacity] = React.useState(100)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [typeValue, setTypeValue] = React.useState("Select type")
  const done =
    seg !== "row" || width !== 324 || height !== 96 || radius !== 24 || opacity !== 100 || typeValue !== "Select type"

  return (
    <div className={cn("relative w-full max-w-64 rounded-xl border border-border bg-card text-card-foreground", className)} {...props}>
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="font-serif text-[0.9375rem] font-medium tracking-tight text-foreground">{target}</span>
        {done ? (
          <span className="flex items-center gap-1 text-xs font-medium text-(--success-text) animate-in fade-in-0 duration-fast">
            <Icon icon="ph:check" className="size-3" aria-hidden="true" />
            Edited
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs font-medium text-(--primary-text)">
            <Icon icon="ph:sparkle" className="size-3.5" aria-hidden="true" />
            Adjust
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2.5 border-b border-border p-4">
        <p className="text-xs font-medium text-muted-foreground">Layout</p>
        <Tabs value={seg} onValueChange={setSeg}>
          <TabsList aria-label="Layout" className="grid w-full grid-cols-3 items-stretch rounded-md bg-secondary p-0.5">
            {SEGMENTS.map((s) => (
              <TabsTrigger key={s} value={s} aria-label={`${s} layout`} className="px-0 py-1">
                <SegmentIcon kind={s} />
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="grid min-w-0 grid-cols-2 gap-2">
          <ScrubField label="W" value={width} onChange={setWidth} min={40} max={999} active={width !== 324} />
          <ScrubField label="H" value={height} onChange={setHeight} min={24} max={999} active={height !== 96} />
        </div>
        <div className="grid min-w-0 grid-cols-2 gap-2">
          <ScrubField label="Radius" value={radius} onChange={setRadius} min={0} max={64} active={radius !== 24} />
          <ScrubField label="Opacity" value={opacity} onChange={setOpacity} min={0} max={100} suffix="%" active={opacity !== 100} />
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-xs text-muted-foreground">Type</span>
        <div className="relative w-32">
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-haspopup="listbox"
            onClick={() => setMenuOpen((current) => !current)}
            className={cn(
              "flex h-7 w-full items-center justify-between rounded-md border bg-(--field) pe-1.5 ps-2.5 outline-none",
              "transition-[border-color,box-shadow] duration-fast ease-out focus-visible:ring-3 focus-visible:ring-ring",
              menuOpen ? "border-primary" : "border-(--line-strong) hover:border-(--control)",
            )}
          >
            <span className={cn("text-xs", typeValue !== "Select type" ? "text-foreground" : "text-muted-foreground")}>
              {typeValue}
            </span>
            <Icon
              icon="ph:caret-down"
              className={cn("size-3 text-muted-foreground transition-transform duration-fast", menuOpen && "rotate-180")}
              aria-hidden="true"
            />
          </button>

          {menuOpen && (
            <div
              role="listbox"
              aria-label="Type"
              className="absolute bottom-8 end-0 z-10 w-32 origin-bottom-right rounded-lg bg-popover p-1 text-popover-foreground shadow-(--shadow-menu) animate-in fade-in-0 duration-fast"
            >
              {typeOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  role="option"
                  aria-selected={item === typeValue}
                  onClick={() => {
                    setTypeValue(item)
                    setMenuOpen(false)
                  }}
                  className={cn(
                    "flex h-7 w-full items-center rounded-md px-2 text-start text-xs text-foreground outline-none transition-colors duration-fast hover:bg-accent focus-visible:bg-accent",
                    item === typeValue && "bg-muted font-medium",
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
