"use client"

import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

// Retro-Playful Multi Select: dropdown with multiple selection

interface MultiSelectOption {
  label: string
  value: string
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  value?: string[]
  onChange?: (value: string[]) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder = "Select options...",
  disabled,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !(e.target instanceof Node && ref.current.contains(e.target))) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange?.(value.filter((v) => v !== optionValue))
    } else {
      onChange?.([...value, optionValue])
    }
  }

  const selectedLabels = options
    .filter((o) => value.includes(o.value))
    .map((o) => o.label)

  return (
    <div ref={ref} className={cn("relative w-full", className)}>
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={cn(
          formFieldBase,
          "flex min-h-10 flex-wrap items-center gap-1.5 py-2 text-left",
          open && "-translate-x-px -translate-y-px shadow-[var(--shadow-hard)]"
        )}
      >
        <div className="flex flex-1 flex-wrap gap-1">
          {selectedLabels.length > 0 ? (
            selectedLabels.map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
              >
                {label}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-primary/60"
                  onClick={(e) => {
                    e.stopPropagation()
                    const opt = options.find((o) => o.label === label)
                    if (opt) toggle(opt.value)
                  }}
                />
              </span>
            ))
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border-2 border-border bg-popover p-1.5 shadow-[var(--shadow-hard)]">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => toggle(option.value)}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-secondary"
            >
              <div
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded-sm border-2 border-border transition-colors",
                  value.includes(option.value) && "bg-primary border-primary shadow-[var(--shadow-hard-sm)]"
                )}
              >
                {value.includes(option.value) && (
                  <Check className="h-3 w-3 text-primary-foreground" />
                )}
              </div>
              <span className={value.includes(option.value) ? "text-foreground" : "text-muted-foreground"}>
                {option.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export { MultiSelect }
export type { MultiSelectProps, MultiSelectOption }
