"use client"

import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

// Dark Neon AI Multi Select: dropdown with multiple selection

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
          open &&
            "border-[oklch(0.86_0.22_145_/_0.6)] [box-shadow:inset_0_0.0625rem_0.125rem_oklch(0_0_0_/_0.4),0_0_0_0.1875rem_oklch(0.86_0.22_145_/_0.18),0_0.25rem_0.875rem_-0.25rem_oklch(0.86_0.22_145_/_0.22)]"
        )}
      >
        <div className="flex flex-1 flex-wrap gap-1">
          {selectedLabels.length > 0 ? (
            selectedLabels.map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground"
              >
                {label}
                <X
                  className="h-3 w-3 cursor-pointer hover:opacity-70"
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
        <div className="absolute z-50 mt-1 w-full rounded-[0.75rem] border border-border bg-popover p-1.5 text-popover-foreground [box-shadow:var(--shadow-popover)]">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => toggle(option.value)}
              className="flex w-full items-center gap-2 rounded-[0.5rem] px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <div
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded-[0.375rem] border border-border transition-colors",
                  value.includes(option.value) &&
                    "[background:var(--neon-gradient)] border-[oklch(0.86_0.22_145_/_0.55)] [box-shadow:var(--shadow-neon)]"
                )}
              >
                {value.includes(option.value) && (
                  <Check className="h-3 w-3 text-primary-foreground" />
                )}
              </div>
              <span
                className={
                  value.includes(option.value)
                    ? "text-foreground"
                    : "text-muted-foreground"
                }
              >
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
