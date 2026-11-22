"use client"

import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"

// Apple Multi Select: dropdown with multiple selection

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

  const selectedOptions = options.filter((o) => value.includes(o.value))

  return (
    <div ref={ref} className={cn("relative w-full", className)}>
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={cn(
          "flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-[calc(0.625rem*var(--corner-factor,1))] border border-border bg-background px-3 py-2 text-sm",
          "shadow-[0_0.0625rem_0.125rem_0_oklch(0_0_0/0.04)]",
          "transition duration-base hover:border-foreground/30",
          open && "border-foreground shadow-[0_0_0_0.1875rem_oklch(0_0_0/0.06)]",
          "disabled:cursor-not-allowed disabled:opacity-70",
          "text-left"
        )}
      >
        <div className="flex flex-1 flex-wrap gap-1">
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option) => (
              <span
                key={option.value}
                className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
              >
                {option.label}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-primary/60"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggle(option.value)
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
        <div className="absolute z-50 mt-1 w-full rounded-[calc(0.75rem*var(--corner-factor,1))] bg-popover backdrop-blur-xl p-1.5 shadow-[0_0.25rem_1rem_0_oklch(0_0_0/0.08),0_0_0_0.0625rem_oklch(0_0_0/0.06),inset_0_0.0625rem_0_oklch(1_0_0/0.5)]">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => toggle(option.value)}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-secondary"
            >
              <div
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded-[calc(0.25rem*var(--corner-factor,1))] border border-border transition-colors",
                  value.includes(option.value) && "bg-primary border-primary"
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
