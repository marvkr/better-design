"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Luxe DatePicker: calendar popover using Button + Calendar + Popover from this design system
// We inline the popover pattern here to avoid circular deps — self-contained

export interface DatePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  disabled = false,
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [month, setMonth] = React.useState<Date>(value ?? new Date())
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const daysInMonth = (year: number, m: number) => new Date(year, m + 1, 0).getDate()
  const firstDayOfMonth = (year: number, m: number) => new Date(year, m, 1).getDay()

  const year = month.getFullYear()
  const m = month.getMonth()
  const days = daysInMonth(year, m)
  const startDay = firstDayOfMonth(year, m)

  const prevMonth = () => setMonth(new Date(year, m - 1, 1))
  const nextMonth = () => setMonth(new Date(year, m + 1, 1))

  const handleSelect = (day: number) => {
    const selected = new Date(year, m, day)
    onChange?.(selected)
    setOpen(false)
  }

  const isSelected = (day: number) => {
    if (!value) return false
    return (
      value.getFullYear() === year &&
      value.getMonth() === m &&
      value.getDate() === day
    )
  }

  const isToday = (day: number) => {
    const t = new Date()
    return t.getFullYear() === year && t.getMonth() === m && t.getDate() === day
  }

  const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
  const MONTHS = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ]

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(
          "flex h-10 w-full items-center justify-start gap-3 rounded-xl border border-border bg-secondary px-4 text-sm",
          "text-foreground transition-colors duration-200 hover:bg-accent",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          "disabled:cursor-not-allowed disabled:opacity-40"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted-foreground"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
        <span className={cn(!value && "text-muted-foreground")}>
          {value ? formatDate(value) : placeholder}
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Date picker"
          className={cn(
            "absolute z-50 mt-1 w-72 rounded-xl border border-border bg-card p-4 shadow-xl",
            "animate-in fade-in-0 zoom-in-95"
          )}
        >
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={prevMonth}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <span className="text-sm font-medium text-foreground tracking-wide">
              {MONTHS[m]} {year}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-[11px] font-medium text-muted-foreground/60 tracking-wider">
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: startDay }, (_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: days }, (_, i) => {
              const day = i + 1
              const selected = isSelected(day)
              const today = isToday(day)
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelect(day)}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors duration-150",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    selected && "bg-primary text-primary-foreground font-medium",
                    !selected && today && "border border-border text-foreground",
                    !selected && !today && "text-foreground hover:bg-accent"
                  )}
                >
                  {day}
                </button>
              )
            })}
          </div>

          {/* Clear */}
          {value && (
            <div className="mt-3 border-t border-border pt-3">
              <button
                type="button"
                onClick={() => { onChange?.(undefined); setOpen(false) }}
                className="w-full rounded-lg px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                Clear date
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export { DatePicker }
