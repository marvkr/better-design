"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Halo Time Picker: translucent pill inputs for hours/minutes with AM/PM toggle

interface TimePickerProps {
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  className?: string
}

function TimePicker({ value = "12:00", onChange, disabled, className }: TimePickerProps) {
  const [hours, setHours] = React.useState(() => {
    const [h] = value.split(":")
    const num = parseInt(h, 10)
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
        "inline-flex items-center gap-1 px-3 h-10",
        "rounded-full border border-border backdrop-blur-xl bg-foreground/[0.06]",
        "shadow-[inset_0_0_0.375rem_color-mix(in_oklch,var(--halo)_6%,transparent)]",
        "focus-within:shadow-[inset_0_0_0.375rem_color-mix(in_oklch,var(--halo)_6%,transparent),0_0_0_0.1875rem_color-mix(in_oklch,var(--primary)_20%,transparent)] focus-within:border-primary/50",
        "transition duration-base",
        disabled && "cursor-not-allowed opacity-60",
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
        className="w-8 bg-transparent text-center text-sm font-medium text-foreground/90 outline-none"
      />
      <span className="text-sm font-medium text-foreground/40">:</span>
      <input
        type="text"
        inputMode="numeric"
        maxLength={2}
        aria-label="Minutes"
        value={minutes}
        onChange={handleMinutes}
        onBlur={handleMinutesBlur}
        disabled={disabled}
        className="w-8 bg-transparent text-center text-sm font-medium text-foreground/90 outline-none"
      />
      <button
        type="button"
        onClick={togglePeriod}
        disabled={disabled}
        className="ml-1 rounded-full px-1.5 py-0.5 text-xs font-medium text-foreground/50 transition-colors hover:bg-foreground/[0.08] hover:text-foreground/80 disabled:pointer-events-none"
      >
        {period}
      </button>
    </div>
  )
}

export { TimePicker }
export type { TimePickerProps }
