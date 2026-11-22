"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "./tabs"

// FineTuneCard: compact interactive inspector where the agent adjusts design
// properties. Number fields scrub: drag the label for an east-west adjust,
// use arrow keys (Shift for x10), or type directly.
// Ported from Beautiful UI: https://beautiful-ui-five.vercel.app/
//
// Usage:
//   <FineTuneCard />
//   <FineTuneCard target="Hero banner" typeOptions={["Seasonal", "Classic"]} />

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
        "flex h-[1.625rem] min-w-0 items-center gap-1 rounded-md py-1 pr-1 pl-0.5 transition-[background-color,box-shadow] duration-base",
        active ? "bg-primary/10 shadow-[0_0_0_0.0625rem_var(--primary)]" : "bg-muted",
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
        className="flex h-full shrink-0 cursor-ew-resize touch-none items-center rounded-[0.25rem] px-0.5 text-[0.75rem] text-muted-foreground select-none hover:text-foreground focus-visible:text-primary focus-visible:outline-none"
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
        className="min-w-0 flex-1 bg-transparent text-[0.75rem] text-foreground tabular-nums outline-none"
      />
      {suffix && <span className="shrink-0 pr-0.5 text-[0.7188rem] text-muted-foreground">{suffix}</span>}
    </label>
  )
}

const SEGMENTS = ["row", "col", "grid"] as const

function SegmentIcon({ kind }: { kind: string }) {
  const dot = "size-1.5 rounded-[0.125rem] border-[0.075rem] border-current"
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
  target = "Flavor card",
  typeOptions = ["Seasonal", "Classic", "Limited"],
  className,
  ...props
}: FineTuneCardProps) {
  const [seg, setSeg] = React.useState("row")
  const [width, setWidth] = React.useState(324)
  const [height, setHeight] = React.useState(96)
  const [radius, setRadius] = React.useState(28)
  const [opacity, setOpacity] = React.useState(100)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [typeValue, setTypeValue] = React.useState("Select type")
  const done =
    seg !== "row" || width !== 324 || height !== 96 || radius !== 28 || opacity !== 100 || typeValue !== "Select type"

  return (
    <div className={cn("relative w-full max-w-60 rounded-xl border border-border bg-card shadow-md", className)} {...props}>
      {/* header */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="text-[0.8125rem] font-medium text-foreground">{target}</span>
        {done ? (
          <span
            className="flex items-center gap-1.5 text-[0.75rem] font-medium text-[color:var(--chart-2)]"
            style={{ animation: "bui-pop-in 250ms cubic-bezier(0.23,1,0.32,1) both" }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Edited
          </span>
        ) : (
          <span className="flex items-center gap-1.5">
            <span className="flex size-[1.125rem] items-center justify-center rounded-[0.3125rem] border border-primary/30 bg-primary/10">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="var(--primary)" aria-hidden="true">
                <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
              </svg>
            </span>
            <span
              className="bg-clip-text text-[0.75rem] font-medium text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, var(--primary) 35%, var(--foreground) 50%, var(--primary) 65%)",
                backgroundSize: "200% 100%",
                animation: "bui-shimmer-text 1.4s linear infinite",
              }}
            >
              Adjust
            </span>
          </span>
        )}
      </div>

      {/* layout section */}
      <div className="flex flex-col gap-2 border-b border-border p-3.5">
        <p className="text-[0.7813rem] font-medium text-foreground">Layout</p>
        <Tabs value={seg} onValueChange={setSeg}>
          <TabsList aria-label="Layout" className="grid w-full grid-cols-3 items-stretch bg-secondary">
            {SEGMENTS.map((s) => (
              <TabsTrigger
                key={s}
                value={s}
                aria-label={`${s} layout`}
                className="px-0"
              >
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
          <ScrubField label="Radius" value={radius} onChange={setRadius} min={0} max={64} active={radius !== 28} />
          <ScrubField label="Opacity" value={opacity} onChange={setOpacity} min={0} max={100} suffix="%" active={opacity !== 100} />
        </div>
      </div>

      {/* interaction section */}
      <div className="flex items-center justify-between px-3.5 py-2.5">
        <span className="text-[0.75rem] text-muted-foreground">Type</span>
        <div className="relative w-[7.5rem]">
          <button
            type="button"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
            className={cn(
              "flex h-[1.625rem] w-full items-center justify-between rounded-md border border-border bg-muted py-1 pr-1 pl-2 transition-shadow duration-base focus-visible:outline-none",
              menuOpen && "shadow-[0_0_0_0.0625rem_var(--primary)]",
            )}
          >
            <span className={cn("text-[0.75rem]", typeValue !== "Select type" ? "text-foreground" : "text-muted-foreground")}>
              {typeValue}
            </span>
            <svg
              width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className="text-muted-foreground transition-transform duration-base"
              style={{ transform: menuOpen ? "rotate(180deg)" : "rotate(0)" }}
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 bottom-8 z-10 w-[7.5rem] rounded-md border border-border bg-card p-1 shadow-md"
              style={{ animation: "bui-pop-in 200ms cubic-bezier(0.23,1,0.32,1) both", transformOrigin: "bottom right" }}
            >
              {typeOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setTypeValue(item)
                    setMenuOpen(false)
                  }}
                  className={cn(
                    "flex h-[1.625rem] w-full items-center rounded-[0.375rem] px-2 text-left text-[0.7813rem] text-foreground transition-colors duration-fast hover:bg-muted",
                    item === typeValue && "bg-muted",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes bui-shimmer-text { to { background-position: -200% 0; } }
        @keyframes bui-pop-in { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  )
}

export { FineTuneCard }
