"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

// Leather Luxe Time Picker: hour and minute digits in one recessed well,
// the AM/PM toggle as a tiny raised chip.

interface TimePickerProps {
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  className?: string
}

function TimePicker({ value = "12:00", onChange, disabled, className }: TimePickerProps) {
  const [hours, setHours] = React.useState(() => {
    const [h] = value.split(":")
    const num = parseInt(h ?? "12", 10)
    const h12 = num > 12 ? num - 12 : num === 0 ? 12 : num
    return String(h12).padStart(2, "0")
  })
  const [minutes, setMinutes] = React.useState(() =>
    String(parseInt(value.split(":")[1] ?? "0", 10)).padStart(2, "0")
  )
  const [period, setPeriod] = React.useState<"AM" | "PM">(() => {
    const h = parseInt(value.split(":")[0] ?? "12", 10)
    return h >= 12 ? "PM" : "AM"
  })

  const emit = React.useCallback(
    (h: number, m: number, p: "AM" | "PM") => {
      let hour24 = h % 12
      if (p === "PM") hour24 += 12
      const hStr = String(hour24).padStart(2, "0")
      const mStr = String(m).padStart(2, "0")
      onChange?.(`${hStr}:${mStr}`)
    },
    [onChange]
  )

  const handleHours = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    setHours(raw)
    const parsed = parseInt(raw, 10)
    if (!isNaN(parsed)) emit(parsed, parseInt(minutes, 10) || 0, period)
  }

  const handleHoursBlur = () => {
    const clamped = Math.max(1, Math.min(12, parseInt(hours, 10) || 1))
    setHours(String(clamped).padStart(2, "0"))
    emit(clamped, parseInt(minutes, 10) || 0, period)
  }

  const handleMinutes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    setMinutes(raw)
    const parsed = parseInt(raw, 10)
    if (!isNaN(parsed)) emit(parseInt(hours, 10) || 1, parsed, period)
  }

  const handleMinutesBlur = () => {
    const clamped = Math.max(0, Math.min(59, parseInt(minutes, 10) || 0))
    setMinutes(String(clamped).padStart(2, "0"))
    emit(parseInt(hours, 10) || 1, clamped, period)
  }

  const togglePeriod = () => {
    const next = period === "AM" ? "PM" : "AM"
    setPeriod(next)
    emit(parseInt(hours, 10) || 1, parseInt(minutes, 10) || 0, next)
  }

  return (
    <div
      className={cn(
        formFieldBase,
        "inline-flex h-10 w-auto items-center gap-1",
        "focus-within:border-primary/60 focus-within:[box-shadow:var(--shadow-well),0_0_0_0.1875rem_oklch(0.55_0.115_52/0.25)]",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <input
        type="text"
        inputMode="numeric"
        maxLength={2}
        aria-label="Hours"
        value={hours}
        onChange={handleHours}
        onBlur={handleHoursBlur}
        disabled={disabled}
        className="w-8 bg-transparent text-center text-sm font-medium text-foreground outline-none"
      />
      <span className="text-sm font-medium text-muted-foreground/70">:</span>
      <input
        type="text"
        inputMode="numeric"
        maxLength={2}
        aria-label="Minutes"
        value={minutes}
        onChange={handleMinutes}
        onBlur={handleMinutesBlur}
        disabled={disabled}
        className="w-8 bg-transparent text-center text-sm font-medium text-foreground outline-none"
      />
      <button
        type="button"
        onClick={togglePeriod}
        disabled={disabled}
        className={cn(
          "ml-1 rounded-full px-2 py-0.5 text-xs font-medium",
          "[background-image:var(--gradient-raised)] border border-highlight",
          "[box-shadow:var(--shadow-raised-sm)]",
          "text-muted-foreground transition-[filter,color] duration-base",
          "hover:brightness-125 hover:text-foreground",
          "disabled:pointer-events-none"
        )}
      >
        {period}
      </button>
    </div>
  )
}

export { TimePicker }
export type { TimePickerProps }
