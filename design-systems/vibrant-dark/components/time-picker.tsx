"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Dynamic Time Picker: filled dark inputs, pill AM/PM toggle

interface TimePickerProps {
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  className?: string
}

function TimePicker({ value = "12:00", onChange, disabled, className }: TimePickerProps) {
  const [hours, setHours] = React.useState(() => {
    const [h] = value.split(":")
    const num = parseInt(h!, 10)
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
      onChange?.(`${String(hour24).padStart(2, "0")}:${String(m).padStart(2, "0")}`)
    },
    [onChange]
  )

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-xl bg-secondary px-3 h-10",
        "focus-within:ring-2 focus-within:ring-ring transition-[background,box-shadow] duration-150",
        disabled && "cursor-not-allowed opacity-60",
        className
      )}
    >
      <input
        type="number"
        min={1}
        max={12}
        value={String(hours).padStart(2, "0")}
        onChange={(e) => {
          const v = Math.max(1, Math.min(12, parseInt(e.target.value, 10) || 1))
          setHours(v)
          emit(v, minutes, period)
        }}
        disabled={disabled}
        className="w-8 bg-transparent text-center text-sm font-medium text-foreground outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <span className="text-sm font-medium text-muted-foreground">:</span>
      <input
        type="number"
        min={0}
        max={59}
        value={String(minutes).padStart(2, "0")}
        onChange={(e) => {
          const v = Math.max(0, Math.min(59, parseInt(e.target.value, 10) || 0))
          setMinutes(v)
          emit(hours, v, period)
        }}
        disabled={disabled}
        className="w-8 bg-transparent text-center text-sm font-medium text-foreground outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={() => {
          const next = period === "AM" ? "PM" : "AM"
          setPeriod(next)
          emit(hours, minutes, next)
        }}
        disabled={disabled}
        className="ml-1 rounded-full bg-secondary/80 px-2 py-0.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-card hover:text-foreground active:scale-[0.97] disabled:pointer-events-none"
      >
        {period}
      </button>
    </div>
  )
}

export { TimePicker }
export type { TimePickerProps }
