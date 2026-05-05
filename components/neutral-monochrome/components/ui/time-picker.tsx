"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TimePickerProps {
  value?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  use24Hour?: boolean
  className?: string
}

function pad(n: number) {
  return String(n).padStart(2, "0")
}

function TimePicker({
  value,
  onValueChange,
  disabled,
  use24Hour = false,
  className,
}: TimePickerProps) {
  // Parse controlled value (HH:MM or HH:MM AM/PM)
  const parse = (v: string | undefined) => {
    if (!v) return { hours: 12, minutes: 0, period: "AM" as "AM" | "PM" }
    const [time, period] = v.split(" ")
    const [h, m] = time.split(":").map(Number)
    return { hours: h ?? 12, minutes: m ?? 0, period: (period ?? "AM") as "AM" | "PM" }
  }

  const parsed = parse(value)
  const [hours, setHours] = React.useState(parsed.hours)
  const [minutes, setMinutes] = React.useState(parsed.minutes)
  const [period, setPeriod] = React.useState<"AM" | "PM">(parsed.period)

  function emit(h: number, m: number, p: "AM" | "PM") {
    const timeStr = use24Hour
      ? `${pad(h)}:${pad(m)}`
      : `${pad(h)}:${pad(m)} ${p}`
    onValueChange?.(timeStr)
  }

  function clampHours(v: string) {
    const n = parseInt(v, 10)
    if (isNaN(n)) return
    const max = use24Hour ? 23 : 12
    const min = use24Hour ? 0 : 1
    const clamped = Math.max(min, Math.min(max, n))
    setHours(clamped)
    emit(clamped, minutes, period)
  }

  function clampMinutes(v: string) {
    const n = parseInt(v, 10)
    if (isNaN(n)) return
    const clamped = Math.max(0, Math.min(59, n))
    setMinutes(clamped)
    emit(hours, clamped, period)
  }

  function togglePeriod() {
    const next = period === "AM" ? "PM" : "AM"
    setPeriod(next)
    emit(hours, minutes, next)
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-[10px] border border-border bg-card px-4 py-2",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      {/* Hours */}
      <input
        type="number"
        value={pad(hours)}
        min={use24Hour ? 0 : 1}
        max={use24Hour ? 23 : 12}
        disabled={disabled}
        onChange={(e) => clampHours(e.target.value)}
        aria-label="Hours"
        className={cn(
          "w-10 bg-transparent text-center text-sm font-semibold text-foreground",
          "focus:outline-none [appearance:textfield]",
          "[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        )}
      />

      <span className="text-muted-foreground font-semibold select-none">:</span>

      {/* Minutes */}
      <input
        type="number"
        value={pad(minutes)}
        min={0}
        max={59}
        disabled={disabled}
        onChange={(e) => clampMinutes(e.target.value)}
        aria-label="Minutes"
        className={cn(
          "w-10 bg-transparent text-center text-sm font-semibold text-foreground",
          "focus:outline-none [appearance:textfield]",
          "[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        )}
      />

      {/* AM/PM toggle */}
      {!use24Hour && (
        <button
          type="button"
          onClick={togglePeriod}
          disabled={disabled}
          className={cn(
            "ml-1 rounded-lg px-2 py-0.5 text-xs font-semibold transition-colors",
            "bg-secondary text-muted-foreground hover:bg-accent hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
        >
          {period}
        </button>
      )}
    </div>
  )
}

export { TimePicker }
