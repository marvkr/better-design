"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { cardSlab, focusRing, menuItemBase, popoverSurface, wellInset } from "./_shared"
import { Tabs, TabsList, TabsTrigger } from "./tabs"

// FineTuneCard: a compact property inspector where an agent adjusts a
// component. Number fields scrub: drag the label east or west, use the
// arrow keys (Shift for x10), or type a value.
//
// Usage:
//   <FineTuneCard />
//   <FineTuneCard target="Callout" typeOptions={["Note", "Warning"]} />

/**
 * A scrub field: a recessed well with a draggable label. Once its value
 * leaves the default, a glow ring marks it as edited.
 */
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
        wellInset,
        "flex h-8 min-w-0 items-center gap-1 rounded-md py-1 pr-2 pl-0.5 ring-1 transition-[box-shadow] duration-fast",
        "focus-within:ring-2 focus-within:ring-ring",
        active ? "ring-glow/45" : "ring-transparent",
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
        className={cn(
          "flex h-full shrink-0 cursor-ew-resize touch-none select-none items-center rounded-sm px-1.5 font-mono text-xs outline-none",
          "focus-visible:text-primary-text [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground",
          active ? "text-primary-text" : "text-muted-foreground",
        )}
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
        className="min-w-0 flex-1 bg-transparent font-mono text-xs tracking-normal text-foreground tabular-nums outline-none"
      />
      {suffix && <span className="shrink-0 text-xs text-muted-foreground">{suffix}</span>}
    </label>
  )
}

const SEGMENTS = ["row", "col", "grid"] as const
const SEGMENT_ICONS: { [segment: string]: string } = {
  row: "ph:columns",
  col: "ph:rows",
  grid: "ph:squares-four",
}

interface FineTuneCardProps extends React.HTMLAttributes<HTMLDivElement> {
  target?: string
  typeOptions?: string[]
}

/**
 * Burnished FineTuneCard: a props inspector on an umber slab. Number fields
 * are recessed wells, the layout switch is the Burnished tabs, and the type
 * picker opens the raised umber menu panel.
 */
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
    <div className={cn(cardSlab, "relative w-full max-w-64 rounded-2xl", className)} {...props}>
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="font-mono text-[0.8125rem] font-medium tracking-normal text-foreground">
          {`<${target.replace(/\s+/g, "")} />`}
        </span>
        {done ? (
          <span className="flex animate-in fade-in items-center gap-1 text-xs font-semibold text-primary-text duration-base">
            <Icon icon="ph:check" className="size-3" aria-hidden="true" />
            Edited
          </span>
        ) : (
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">Props</span>
        )}
      </div>

      <div className="flex flex-col gap-2.5 border-b border-border p-4">
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

      <div className="flex items-center justify-between px-4 py-3">
        <span className="font-mono text-xs tracking-normal text-muted-foreground">type</span>
        <div className="relative w-[7.75rem]">
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-haspopup="listbox"
            onClick={() => setMenuOpen((current) => !current)}
            className={cn(
              focusRing,
              "flex h-8 w-full items-center justify-between rounded-md bg-(image:--fill-raised) py-1 pr-2 pl-2.5 shadow-(--bevel-raised)",
              "transition-[box-shadow] duration-fast [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-(--bevel-raised-hover)",
              menuOpen && "shadow-(--bevel-raised-focus)",
            )}
          >
            <span className={cn("text-xs", typeValue !== "Select type" ? "text-foreground" : "text-muted-foreground")}>
              {typeValue}
            </span>
            <Icon
              icon="ph:caret-down"
              className={cn("size-3 text-muted-foreground transition-transform duration-base", menuOpen && "rotate-180")}
              aria-hidden="true"
            />
          </button>

          {menuOpen && (
            <div
              role="listbox"
              aria-label="Type"
              className={cn(
                popoverSurface,
                "absolute right-0 bottom-9.5 z-10 w-[7.75rem] origin-bottom-right animate-in fade-in zoom-in-95 p-1 duration-fast",
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
                    "min-h-8 w-full text-left text-xs focus-visible:bg-accent [@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent",
                    item === typeValue ? "font-semibold text-primary-text" : "text-foreground",
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
