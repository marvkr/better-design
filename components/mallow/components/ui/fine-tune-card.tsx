"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { cardSlab, focusRing, menuItemBase, popoverSurface, selectedOption, optionTrack } from "./_shared"
import { Tabs, TabsList, TabsTrigger } from "./tabs"

/**
 * A scrub field: a small lilac field with a draggable label. Once its value
 * leaves the default, a faint plum ring marks it as edited.
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
        optionTrack,
        "flex h-9 min-w-0 items-center gap-1 rounded-md py-1 pr-2.5 pl-0.5 ring-1 transition-shadow duration-fast",
        "focus-within:ring-2 focus-within:ring-ring",
        active ? "ring-foreground/25" : "ring-transparent",
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
          "flex h-full shrink-0 cursor-ew-resize touch-none select-none items-center rounded-sm px-2 font-mono text-xs outline-none",
          "focus-visible:text-foreground pointer-fine:hover:text-foreground",
          active ? "text-foreground" : "text-muted-foreground",
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
        className="min-w-0 flex-1 bg-transparent font-mono text-xs tabular-nums text-foreground outline-none"
      />
      {suffix && <span className="shrink-0 text-xs text-muted-foreground">{suffix}</span>}
    </label>
  )
}

const SEGMENTS = ["row", "col", "grid"] as const
const SEGMENT_ICONS: { [segment: string]: string } = {
  row: "iconoir:view-columns-3",
  col: "iconoir:table-rows",
  grid: "iconoir:view-grid",
}

interface FineTuneCardProps extends React.HTMLAttributes<HTMLDivElement> {
  target?: string
  typeOptions?: string[]
}

/**
 * Mallow FineTuneCard: a compact props inspector where number fields sit on
 * lilac tracks, the layout switch is the sliding Tabs, and the type picker opens a
 * floating menu.
 */
function FineTuneCard({
  target = "Stat group",
  typeOptions = ["Plain", "Bordered", "Inset"],
  className,
  ...props
}: FineTuneCardProps) {
  const [seg, setSeg] = React.useState("row")
  const [width, setWidth] = React.useState(320)
  const [height, setHeight] = React.useState(96)
  const [radius, setRadius] = React.useState(18)
  const [opacity, setOpacity] = React.useState(100)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [typeValue, setTypeValue] = React.useState("Select type")
  const menuRef = React.useRef<HTMLDivElement>(null)
  const done =
    seg !== "row" || width !== 320 || height !== 96 || radius !== 18 || opacity !== 100 || typeValue !== "Select type"

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
    <div data-slot="fine-tune-card" className={cn(cardSlab, "relative w-full max-w-72 rounded-3xl", className)} {...props}>
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <span className="font-mono text-sm font-medium text-foreground">{`<${target.replace(/\s+/g, "")} />`}</span>
        {done ? (
          <span className="flex items-center gap-1 rounded-full bg-(--tag) px-2 py-0.5 text-xs text-foreground animate-in fade-in duration-base motion-reduce:animate-none">
            <Icon icon="iconoir:check" className="size-3.5" aria-hidden="true" />
            Edited
          </span>
        ) : (
          <span className="rounded-full bg-(--tag) px-2 py-0.5 text-xs text-muted-foreground">Props</span>
        )}
      </div>

      <div className="flex flex-col gap-2.5 px-5 pb-4">
        <p className="text-xs text-muted-foreground">Layout</p>
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
          <ScrubField label="R" value={radius} onChange={setRadius} min={0} max={64} active={radius !== 18} />
          <ScrubField
            label="α"
            value={opacity}
            onChange={setOpacity}
            min={0}
            max={100}
            suffix="%"
            active={opacity !== 100}
          />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border px-5 py-4">
        <span className="font-mono text-xs text-muted-foreground">type</span>
        <div ref={menuRef} className="relative w-32">
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-haspopup="listbox"
            onClick={() => setMenuOpen((current) => !current)}
            className={cn(
              focusRing,
              selectedOption,
              "flex h-9 w-full items-center justify-between rounded-md py-1 pr-2.5 pl-3",
              "transition-shadow duration-fast pointer-fine:hover:shadow-(--option-edge-hover)",
            )}
          >
            <span className={cn("text-xs", typeValue !== "Select type" ? "text-foreground" : "text-muted-foreground")}>
              {typeValue}
            </span>
            <Icon
              icon="iconoir:nav-arrow-down"
              className={cn(
                "size-3.5 text-muted-foreground transition-transform duration-base motion-reduce:transition-none",
                menuOpen && "rotate-180",
              )}
              aria-hidden="true"
            />
          </button>

          {menuOpen && (
            <div
              role="listbox"
              aria-label="Type"
              className={cn(
                popoverSurface,
                "absolute right-0 bottom-11 z-10 w-32 origin-bottom-right p-1 animate-in fade-in zoom-in-95 duration-fast motion-reduce:animate-none",
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
                    "min-h-8 w-full justify-between text-left text-xs focus-visible:bg-accent pointer-fine:hover:bg-accent",
                    item === typeValue ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item}
                  {item === typeValue && <Icon icon="iconoir:check" className="size-3.5" aria-hidden="true" />}
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
