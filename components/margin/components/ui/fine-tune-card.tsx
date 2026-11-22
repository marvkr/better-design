"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { focusRing, menuItemBase } from "./_shared"
import { Tabs, TabsList, TabsTrigger } from "./tabs"

// FineTuneCard: a compact inspector where an assistant adjusts a block.
// Number fields scrub: drag the label left or right, use the arrow keys
// (Shift for steps of ten), or type a value.
//
// Usage:
//   <FineTuneCard />
//   <FineTuneCard target="Callout" typeOptions={["Note", "Warning"]} />

/**
 * A scrub field: the grey filled field with a draggable label. Once its
 * value leaves the default, the label turns oxblood and an oxblood edge marks it.
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
        "flex h-7.5 min-w-0 items-center gap-1 rounded-lg border bg-(--field) py-1 ps-0.5 pe-2 transition duration-fast ease-(--ease-out)",
        "focus-within:border-primary/45 focus-within:bg-card focus-within:ring-3 focus-within:ring-ring",
        active ? "border-primary/35" : "border-transparent",
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
          "flex h-full shrink-0 cursor-ew-resize touch-none select-none items-center rounded-md px-1.5 text-xs font-medium outline-none",
          "hover:text-foreground focus-visible:bg-(--mark) focus-visible:text-(--mark-foreground)",
          active ? "text-(--primary-text)" : "text-muted-foreground",
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
        className="min-w-0 flex-1 bg-transparent text-sm tabular-nums text-foreground outline-none"
      />
      {suffix && <span className="shrink-0 text-xs text-muted-foreground">{suffix}</span>}
    </label>
  )
}

const SEGMENTS = ["row", "col", "grid"] as const
const SEGMENT_ICONS: { [segment: string]: string } = {
  row: "solar:align-horizontal-center-linear",
  col: "solar:align-vertical-center-linear",
  grid: "solar:widget-linear",
}

interface FineTuneCardProps extends React.HTMLAttributes<HTMLDivElement> {
  target?: string
  typeOptions?: string[]
}

/**
 * Margin FineTuneCard: a block inspector on a white sheet. Number fields
 * are grey filled fields, the layout switch is Margin's segmented tabs, and
 * the type picker opens the white menu panel.
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
  const [radius, setRadius] = React.useState(12)
  const [opacity, setOpacity] = React.useState(100)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [typeValue, setTypeValue] = React.useState("Select type")
  const menuRef = React.useRef<HTMLDivElement>(null)
  const done =
    seg !== "row" || width !== 320 || height !== 96 || radius !== 12 || opacity !== 100 || typeValue !== "Select type"

  React.useEffect(() => {
    if (!menuOpen) return
    const onPointer = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }
    document.addEventListener("pointerdown", onPointer)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("pointerdown", onPointer)
      document.removeEventListener("keydown", onKey)
    }
  }, [menuOpen])

  return (
    <div
      data-slot="fine-tune-card"
      className={cn(
        "relative w-full max-w-64 rounded-xl border border-border bg-card text-card-foreground",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="font-mono text-xs text-(--clause-keyword)">
          {`<${target.replace(/\s+/g, "")} />`}
        </span>
        {done ? (
          <span className="flex animate-in items-center gap-1 text-xs font-medium text-(--primary-text) fade-in duration-base">
            <Icon icon="solar:check-circle-bold" className="size-3.5" aria-hidden="true" />
            Edited
          </span>
        ) : (
          <span className="flex h-5 items-center rounded-sm bg-(--field) px-1.5 text-xs text-muted-foreground">Props</span>
        )}
      </div>

      <div className="flex flex-col gap-2.5 border-b border-border p-4">
        <p className="text-xs font-medium text-muted-foreground">Layout</p>
        <Tabs value={seg} onValueChange={setSeg}>
          <TabsList aria-label="Layout" className="grid w-full grid-cols-3 items-stretch">
            {SEGMENTS.map((s) => (
              <TabsTrigger key={s} value={s} aria-label={`${s} layout`} className="px-0">
                <Icon icon={SEGMENT_ICONS[s]} className="size-4" aria-hidden="true" />
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="grid min-w-0 grid-cols-2 gap-2">
          <ScrubField label="W" value={width} onChange={setWidth} min={40} max={999} active={width !== 320} />
          <ScrubField label="H" value={height} onChange={setHeight} min={24} max={999} active={height !== 96} />
        </div>
        <div className="grid min-w-0 grid-cols-2 gap-2">
          <ScrubField label="R" value={radius} onChange={setRadius} min={0} max={64} active={radius !== 12} />
          <ScrubField label="α" value={opacity} onChange={setOpacity} min={0} max={100} suffix="%" active={opacity !== 100} />
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-xs font-medium text-muted-foreground">Type</span>
        <div ref={menuRef} className="relative w-32">
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-haspopup="listbox"
            onClick={() => setMenuOpen((current) => !current)}
            className={cn(
              focusRing,
              "flex h-7 w-full items-center justify-between rounded-lg bg-card ps-2.5 pe-2 shadow-sm transition-colors duration-fast hover:bg-accent",
              menuOpen && "ring-1 ring-primary/45",
            )}
          >
            <span className={cn("text-sm", typeValue !== "Select type" ? "text-foreground" : "text-muted-foreground")}>
              {typeValue}
            </span>
            <Icon
              icon="solar:alt-arrow-down-linear"
              className={cn("size-3.5 text-muted-foreground transition-transform duration-base", menuOpen && "rotate-180")}
              aria-hidden="true"
            />
          </button>

          {menuOpen && (
            <div
              role="listbox"
              aria-label="Type"
              className="absolute end-0 bottom-9 z-10 w-36 origin-bottom-right animate-in rounded-xl bg-popover p-1 text-popover-foreground shadow-md fade-in zoom-in-95 duration-fast"
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
                    "w-full justify-between text-left hover:bg-(--field)",
                    item === typeValue ? "font-medium text-foreground" : "text-foreground",
                  )}
                >
                  {item}
                  {item === typeValue && (
                    <Icon icon="solar:check-read-linear" className="text-(--primary-text)!" aria-hidden="true" />
                  )}
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
