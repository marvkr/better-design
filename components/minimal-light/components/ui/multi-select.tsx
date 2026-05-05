"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Luxe MultiSelect: dropdown with checkboxes — card bg popover, secondary items
// Trigger shows selected count or placeholder; no external dependencies beyond React

export interface MultiSelectOption {
  value: string
  label: string
}

export interface MultiSelectProps {
  options: MultiSelectOption[]
  value?: string[]
  onChange?: (value: string[]) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  maxDisplay?: number
}

function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select options…",
  className,
  disabled = false,
  maxDisplay = 2,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<string[]>(value ?? [])
  const ref = React.useRef<HTMLDivElement>(null)

  const controlled = value !== undefined
  const current = controlled ? value : selected

  const toggle = (val: string) => {
    const next = current.includes(val)
      ? current.filter((v) => v !== val)
      : [...current, val]
    if (!controlled) setSelected(next)
    onChange?.(next)
  }

  // Close on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const displayLabel = () => {
    if (current.length === 0) return null
    const shown = current.slice(0, maxDisplay).map(
      (v) => options.find((o) => o.value === v)?.label ?? v
    )
    const overflow = current.length - maxDisplay
    return shown.join(", ") + (overflow > 0 ? ` +${overflow}` : "")
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-xl border border-border bg-secondary px-4 py-2 text-sm",
          "text-foreground transition-colors duration-200",
          "hover:bg-accent",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          "disabled:cursor-not-allowed disabled:opacity-40"
        )}
      >
        <span className={cn(!displayLabel() && "text-muted-foreground")}>
          {displayLabel() ?? placeholder}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("shrink-0 text-muted-foreground transition-transform duration-200", open && "rotate-180")}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          className={cn(
            "absolute z-50 mt-1 w-full overflow-hidden rounded-xl border border-border bg-card shadow-xl",
            "animate-in fade-in-0 zoom-in-95"
          )}
          role="listbox"
          aria-multiselectable="true"
        >
          <div className="max-h-60 overflow-y-auto p-1">
            {options.map((option) => {
              const checked = current.includes(option.value)
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={checked}
                  onClick={() => toggle(option.value)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground tracking-wide",
                    "transition-colors duration-150 hover:bg-accent",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  )}
                >
                  {/* Checkbox */}
                  <span
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded border border-border transition-colors duration-150",
                      checked ? "bg-primary border-primary" : "bg-secondary"
                    )}
                  >
                    {checked && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary-foreground"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </span>
                  {option.label}
                </button>
              )
            })}
          </div>
          {current.length > 0 && (
            <div className="border-t border-border p-1">
              <button
                type="button"
                onClick={() => { if (!controlled) setSelected([]); onChange?.([]) }}
                className="flex w-full items-center justify-center rounded-lg px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-150"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export { MultiSelect }
