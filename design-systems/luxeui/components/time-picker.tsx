"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Luxe TimePicker: HH:MM input with AM/PM toggle — secondary bg, monochromatic
// Hours/minutes are separate number inputs; AM/PM is a toggle group

export interface TimePickerProps {
  value?: string // "HH:MM" 24h format internally
  onChange?: (value: string) => void
  use12Hour?: boolean
  disabled?: boolean
  className?: string
}

function pad(n: number) {
  return String(n).padStart(2, "0")
}

function TimePicker({
  value,
  onChange,
  use12Hour = true,
  disabled = false,
  className,
}: TimePickerProps) {
  const parseTime = (t?: string) => {
    if (!t) return { hours: 12, minutes: 0 }
    const [h, m] = t.split(":").map(Number)
    return { hours: h ?? 12, minutes: m ?? 0 }
  }

  const { hours: initH, minutes: initM } = parseTime(value)
  const [hours, setHours] = React.useState(initH)
  const [minutes, setMinutes] = React.useState(initM)
  const [period, setPeriod] = React.useState<"AM" | "PM">(initH >= 12 ? "PM" : "AM")

  const emit = (h: number, m: number, p: "AM" | "PM") => {
    let h24 = h
    if (use12Hour) {
      if (p === "PM" && h !== 12) h24 = h + 12
      if (p === "AM" && h === 12) h24 = 0
    }
    onChange?.(`${pad(h24)}:${pad(m)}`)
  }

  const handleHours = (raw: string) => {
    let n = parseInt(raw, 10)
    if (isNaN(n)) return
    const max = use12Hour ? 12 : 23
    const min = use12Hour ? 1 : 0
    n = Math.max(min, Math.min(max, n))
    setHours(n)
    emit(n, minutes, period)
  }

  const handleMinutes = (raw: string) => {
    let n = parseInt(raw, 10)
    if (isNaN(n)) return
    n = Math.max(0, Math.min(59, n))
    setMinutes(n)
    emit(hours, n, period)
  }

  const togglePeriod = () => {
    const next = period === "AM" ? "PM" : "AM"
    setPeriod(next)
    emit(hours, minutes, next)
  }

  const inputCls = cn(
    "h-10 w-12 rounded-xl border border-border bg-secondary px-0 text-center text-sm font-medium text-foreground",
    "transition-colors duration-200 hover:bg-accent",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-primary/30",
    "disabled:cursor-not-allowed disabled:opacity-40",
    "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
  )

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <input
        type="number"
        value={pad(hours)}
        onChange={(e) => handleHours(e.target.value)}
        min={use12Hour ? 1 : 0}
        max={use12Hour ? 12 : 23}
        disabled={disabled}
        aria-label="Hours"
        className={inputCls}
      />
      <span className="text-muted-foreground font-medium text-sm select-none">:</span>
      <input
        type="number"
        value={pad(minutes)}
        onChange={(e) => handleMinutes(e.target.value)}
        min={0}
        max={59}
        disabled={disabled}
        aria-label="Minutes"
        className={inputCls}
      />
      {use12Hour && (
        <button
          type="button"
          onClick={togglePeriod}
          disabled={disabled}
          aria-label={`Toggle AM/PM, currently ${period}`}
          className={cn(
            "flex h-10 items-center justify-center rounded-xl border border-border bg-secondary px-3",
            "text-sm font-medium text-foreground tracking-wide",
            "transition-all duration-200 hover:bg-accent",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            "disabled:cursor-not-allowed disabled:opacity-40",
            "active:scale-[0.97]"
          )}
        >
          {period}
        </button>
      )}
    </div>
  )
}

export { TimePicker }
