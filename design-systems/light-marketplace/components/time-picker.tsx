"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TimeValue {
  hours: number
  minutes: number
  period?: "AM" | "PM"
}

export interface TimePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: TimeValue
  onChange?: (value: TimeValue) => void
  use24Hour?: boolean
  disabled?: boolean
}

function pad(n: number) {
  return String(n).padStart(2, "0")
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      value,
      onChange,
      use24Hour = false,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const [internal, setInternal] = React.useState<TimeValue>({
      hours:   value?.hours   ?? 12,
      minutes: value?.minutes ?? 0,
      period:  value?.period  ?? "AM",
    })

    const time = value ?? internal
    const maxHrs = use24Hour ? 23 : 12

    const update = (patch: Partial<TimeValue>) => {
      const next = { ...time, ...patch }
      setInternal(next)
      onChange?.(next)
    }

    const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const n = parseInt(e.target.value, 10)
      if (!isNaN(n)) update({ hours: clamp(n, use24Hour ? 0 : 1, maxHrs) })
    }

    const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const n = parseInt(e.target.value, 10)
      if (!isNaN(n)) update({ minutes: clamp(n, 0, 59) })
    }

    const inputClass = cn(
      "w-12 bg-transparent text-center text-sm font-semibold text-foreground",
      "focus:outline-none",
      "[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
    )

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1 rounded-[14px] border border-border bg-background px-3 py-2",
          disabled && "opacity-50 pointer-events-none",
          className
        )}
        {...props}
      >
        {/* Hours */}
        <input
          type="number"
          min={use24Hour ? 0 : 1}
          max={maxHrs}
          value={pad(time.hours)}
          onChange={handleHoursChange}
          disabled={disabled}
          aria-label="Hours"
          className={inputClass}
        />

        <span className="text-sm font-semibold text-muted-foreground select-none">:</span>

        {/* Minutes */}
        <input
          type="number"
          min={0}
          max={59}
          value={pad(time.minutes)}
          onChange={handleMinutesChange}
          disabled={disabled}
          aria-label="Minutes"
          className={inputClass}
        />

        {/* AM/PM toggle */}
        {!use24Hour && (
          <div className="ml-1 flex overflow-hidden rounded-xl border border-border bg-secondary">
            {(["AM", "PM"] as const).map((p) => (
              <button
                key={p}
                type="button"
                disabled={disabled}
                onClick={() => update({ period: p })}
                className={cn(
                  "px-2 py-0.5 text-xs font-semibold transition-colors",
                  time.period === p
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-border hover:text-foreground",
                )}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }
)
TimePicker.displayName = "TimePicker"

export { TimePicker }
