"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase, popoverSurface } from "./_shared"

// Amber Glass TimePicker: recessed well trigger with a floating glass list.

interface TimePickerProps {
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  className?: string
}

const TIMES = Array.from({ length: 48 }, (_, i) => {
  const hours = Math.floor(i / 2)
  const minutes = i % 2 === 0 ? "00" : "30"
  const period = hours < 12 ? "AM" : "PM"
  const display = hours % 12 === 0 ? 12 : hours % 12
  return `${display}:${minutes} ${period}`
})

function TimePicker({ value, onChange, disabled, className }: TimePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [internal, setInternal] = React.useState(value ?? "")
  const selected = value ?? internal
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !(e.target instanceof Node && containerRef.current.contains(e.target))) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <div ref={containerRef} className={cn("relative w-[10rem]", className)}>
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-9 w-full items-center justify-between rounded-lg px-3 py-2 text-sm",
          formFieldBase,
          !selected && "text-muted-foreground"
        )}
      >
        <span className="flex items-center gap-2">
          <Icon icon="tabler:clock" className="h-4 w-4 text-primary" />
          {selected || "Select time"}
        </span>
        <Icon icon="tabler:chevron-down" className="h-3.5 w-3.5 text-muted-foreground" />
      </button>
      {open && (
        <ul
          role="listbox"
          className={cn(
            "absolute z-50 mt-1.5 max-h-56 w-full overflow-y-auto rounded-lg p-1",
            popoverSurface
          )}
        >
          {TIMES.map((time) => (
            <li key={time}>
              <button
                type="button"
                role="option"
                aria-selected={time === selected}
                onClick={() => {
                  setInternal(time)
                  onChange?.(time)
                  setOpen(false)
                }}
                className={cn(
                  "flex w-full items-center rounded-md px-2 py-1.5 text-sm transition-colors",
                  time === selected
                    ? "bg-primary/15 font-semibold text-primary"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {time}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export { TimePicker }
export type { TimePickerProps }
