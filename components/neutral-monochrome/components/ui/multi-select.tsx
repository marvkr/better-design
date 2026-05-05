"use client"

import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface MultiSelectOption {
  label: string
  value: string
}

export interface MultiSelectProps {
  options: MultiSelectOption[]
  value?: string[]
  onValueChange?: (value: string[]) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

function MultiSelect({
  options,
  value: controlledValue,
  onValueChange,
  placeholder = "Select options…",
  disabled,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState<string[]>([])
  const containerRef = React.useRef<HTMLDivElement>(null)

  const isControlled = controlledValue !== undefined
  const selected = isControlled ? controlledValue : internalValue

  function update(next: string[]) {
    if (!isControlled) setInternalValue(next)
    onValueChange?.(next)
  }

  function toggle(val: string) {
    if (selected.includes(val)) {
      update(selected.filter((v) => v !== val))
    } else {
      update([...selected, val])
    }
  }

  function remove(val: string, e: React.MouseEvent) {
    e.stopPropagation()
    update(selected.filter((v) => v !== val))
  }

  // Close on outside click
  React.useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener("mousedown", onOutside)
    return () => document.removeEventListener("mousedown", onOutside)
  }, [open])

  const selectedLabels = options.filter((o) => selected.includes(o.value))

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {/* Trigger */}
      <button
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex min-h-10 w-full items-center justify-between rounded-[10px] border border-border bg-card px-3 py-2 text-sm",
          "ring-offset-background transition-colors text-left",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          open && "ring-1 ring-ring",
          disabled && "opacity-50 pointer-events-none"
        )}
      >
        <div className="flex flex-1 flex-wrap gap-1 min-w-0">
          {selectedLabels.length === 0 ? (
            <span className="text-muted-foreground/60">{placeholder}</span>
          ) : (
            selectedLabels.map((opt) => (
              <span
                key={opt.value}
                className="inline-flex items-center gap-1 rounded-full bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 text-xs font-medium"
              >
                {opt.label}
                <button
                  type="button"
                  aria-label={`Remove ${opt.label}`}
                  onClick={(e) => remove(opt.value, e)}
                  className="hover:text-primary/70 focus:outline-none"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))
          )}
        </div>
        <ChevronDown
          className={cn(
            "ml-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-150",
            open && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="listbox"
          aria-multiselectable="true"
          className={cn(
            "absolute z-50 mt-1 w-full rounded-[10px] border border-border bg-card shadow-lg",
            "max-h-60 overflow-y-auto py-1"
          )}
        >
          {options.length === 0 ? (
            <div className="px-3 py-2 text-sm text-muted-foreground">
              No options.
            </div>
          ) : (
            options.map((opt) => {
              const checked = selected.includes(opt.value)
              return (
                <div
                  key={opt.value}
                  role="option"
                  aria-selected={checked}
                  onClick={() => toggle(opt.value)}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 px-3 py-2 text-sm transition-colors",
                    "hover:bg-accent text-foreground"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                      checked
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-border bg-card"
                    )}
                  >
                    {checked && <Check className="h-3 w-3" />}
                  </div>
                  {opt.label}
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}

export { MultiSelect }
