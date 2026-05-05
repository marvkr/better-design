"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Vercel Time Picker: HH:MM time input with AM/PM toggle

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
    return num > 12 ? num - 12 : num === 0 ? 12 : num
  })
  const [minutes, setMinutes] = React.useState(() => parseInt(value.split(":")[1] ?? "0", 10))
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
    const v = Math.max(1, Math.min(12, parseInt(e.target.value, 10) || 1))
    setHours(v)
    emit(v, minutes, period)
  }

  const handleMinutes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Math.max(0, Math.min(59, parseInt(e.target.value, 10) || 0))
    setMinutes(v)
    emit(hours, v, period)
  }

  const togglePeriod = () => {
    const next = period === "AM" ? "PM" : "AM"
    setPeriod(next)
    emit(hours, minutes, next)
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-[10px] border border-border bg-background px-3",
        "h-10 shadow-[0_1px_2px_0_rgb(0_0_0/0.04)]",
        "focus-within:border-foreground focus-within:shadow-[0_0_0_3px_rgb(0_0_0/0.06)]",
        "transition-shadow duration-200",
        disabled && "cursor-not-allowed opacity-60",
        className
      )}
    >
      <input
        type="number"
        min={1}
        max={12}
        value={String(hours).padStart(2, "0")}
        onChange={handleHours}
        disabled={disabled}
        className="w-8 bg-transparent text-center text-sm font-medium text-foreground outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <span className="text-sm font-medium text-muted-foreground">:</span>
      <input
        type="number"
        min={0}
        max={59}
        value={String(minutes).padStart(2, "0")}
        onChange={handleMinutes}
        disabled={disabled}
        className="w-8 bg-transparent text-center text-sm font-medium text-foreground outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={togglePeriod}
        disabled={disabled}
        className="ml-1 rounded-md px-1.5 py-0.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:pointer-events-none"
      >
        {period}
      </button>
    </div>
  )
}

export { TimePicker }
export type { TimePickerProps }
