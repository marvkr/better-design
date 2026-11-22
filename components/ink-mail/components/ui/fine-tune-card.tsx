"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { menuItemBase, popoverSurface } from "./_shared"
import { Tabs, TabsList, TabsTrigger } from "./tabs"

// FineTuneCard: a compact inspector where the agent adjusts the properties of
// one email block. Number fields scrub: drag the label sideways, use the
// arrow keys (Shift for x10), or type a value. A changed field takes the white
// wash, so the edits read at a glance.
//
// Usage:
//   <FineTuneCard />
//   <FineTuneCard target="Receipt header" typeOptions={["Transactional", "Digest"]} />

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
        "flex h-7 min-w-0 items-center gap-1 rounded-md border py-1 pr-1.5 pl-0.5 transition-[background-color,border-color] duration-fast ease-out",
        active ? "border-(--line-strong) bg-(--wash)" : "border-transparent bg-muted",
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
        className="flex h-full shrink-0 cursor-ew-resize touch-none select-none items-center rounded-sm px-1 text-xs text-muted-foreground outline-none hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
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
      {suffix && <span className="shrink-0 font-mono text-xs text-muted-foreground">{suffix}</span>}
    </label>
  )
}

const SEGMENTS = ["row", "col", "grid"] as const

function SegmentIcon({ kind }: { kind: string }) {
  const dot = "size-1.5 rounded-xs border border-current"
  if (kind === "row")
    return <span className="flex gap-0.5">{[0, 1, 2].map((i) => <span key={i} className={dot} />)}</span>
  if (kind === "col")
    return <span className="flex flex-col gap-0.5">{[0, 1].map((i) => <span key={i} className={dot} />)}</span>
  return (
    <span className="grid grid-cols-2 gap-0.5">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className={dot} />
      ))}
    </span>
  )
}

interface FineTuneCardProps extends React.HTMLAttributes<HTMLDivElement> {
  target?: string
  typeOptions?: string[]
}

function FineTuneCard({
  target = "Welcome email",
  typeOptions = ["Transactional", "Marketing", "Digest"],
  className,
  ...props
}: FineTuneCardProps) {
  const [seg, setSeg] = React.useState("row")
  const [width, setWidth] = React.useState(600)
  const [height, setHeight] = React.useState(96)
  const [radius, setRadius] = React.useState(12)
  const [opacity, setOpacity] = React.useState(100)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [typeValue, setTypeValue] = React.useState("Select type")
  const done =
    seg !== "row" || width !== 600 || height !== 96 || radius !== 12 || opacity !== 100 || typeValue !== "Select type"

  return (
    <div className={cn("relative w-full max-w-64 rounded-lg border border-border bg-card", className)} {...props}>
      {/* header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="truncate text-sm font-medium text-foreground">{target}</span>
        {done ? (
          <span className="flex items-center gap-1.5 text-xs font-medium text-(--success-text) animate-in fade-in-0 zoom-in-95 duration-fast">
            <Icon icon="ph:check" className="size-3.5" aria-hidden="true" />
            Edited
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Icon icon="ph:sparkle" className="size-3.5" aria-hidden="true" />
            Adjust
          </span>
        )}
      </div>

      {/* layout section */}
      <div className="flex flex-col gap-2 border-b border-border p-4">
        <p className="text-xs font-medium text-muted-foreground">Layout</p>
        <Tabs value={seg} onValueChange={setSeg}>
          <TabsList aria-label="Layout" className="grid w-full grid-cols-3 items-stretch">
            {SEGMENTS.map((s) => (
              <TabsTrigger key={s} value={s} aria-label={`${s} layout`} className="px-0">
                <SegmentIcon kind={s} />
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="grid min-w-0 grid-cols-2 gap-2">
          <ScrubField label="W" value={width} onChange={setWidth} min={40} max={999} active={width !== 600} />
          <ScrubField label="H" value={height} onChange={setHeight} min={24} max={999} active={height !== 96} />
        </div>
        <div className="grid min-w-0 grid-cols-2 gap-2">
          <ScrubField label="Radius" value={radius} onChange={setRadius} min={0} max={64} active={radius !== 12} />
          <ScrubField label="Opacity" value={opacity} onChange={setOpacity} min={0} max={100} suffix="%" active={opacity !== 100} />
        </div>
      </div>

      {/* type picker */}
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <span className="text-xs text-muted-foreground">Type</span>
        <div className="relative w-32">
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-haspopup="listbox"
            onClick={() => setMenuOpen((current) => !current)}
            className={cn(
              "flex h-7 w-full items-center justify-between rounded-md border bg-(--field) py-1 pr-1.5 pl-2 outline-none transition-colors duration-fast ease-out focus-visible:ring-3 focus-visible:ring-ring",
              menuOpen ? "border-foreground" : "border-(--line-strong) hover:border-(--control)",
            )}
          >
            <span className={cn("truncate text-xs", typeValue !== "Select type" ? "text-foreground" : "text-muted-foreground")}>
              {typeValue}
            </span>
            <Icon
              icon="ph:caret-down"
              aria-hidden="true"
              className={cn(
                "size-3.5 shrink-0 text-muted-foreground transition-transform duration-fast ease-out",
                menuOpen && "rotate-180",
              )}
            />
          </button>

          {menuOpen && (
            <div
              role="listbox"
              aria-label="Type"
              className={cn(
                popoverSurface,
                "absolute right-0 bottom-9 z-10 w-36 origin-bottom-right p-1 animate-in fade-in-0 zoom-in-95 duration-fast",
              )}
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
                    menuItemBase,
                    "w-full justify-between text-start text-xs hover:bg-accent",
                    item === typeValue && "text-foreground",
                  )}
                >
                  {item}
                  {item === typeValue && <Icon icon="ph:check" className="size-3.5" aria-hidden="true" />}
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
