"use client"

import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { formFieldBase, popoverSurface } from "./_shared"

// Leather Luxe Multi Select: a recessed well of raised chips; the option
// list floats as a glass panel with leather-checked marks.

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
          formFieldBase,
          "flex min-h-10 w-full flex-wrap items-center gap-1.5 py-2 text-left",
          open &&
            "border-primary/60 [box-shadow:var(--shadow-well),0_0_0_0.1875rem_oklch(0.55_0.115_52/0.25)]"
        )}
      >
        <span className="flex flex-1 flex-wrap gap-1">
          {selectedOptions.length > 0 ? (
            selectedOptions.map((opt) => (
              <span
                key={opt.value}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5",
                  "[background-image:var(--gradient-raised)] border border-highlight",
                  "[box-shadow:var(--shadow-raised-sm)]",
                  "text-xs font-medium text-foreground"
                )}
              >
                {opt.label}
                <X
                  role="button"
                  aria-label={`Remove ${opt.label}`}
                  className="h-3 w-3 cursor-pointer text-muted-foreground hover:text-foreground"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation()
                    toggle(opt.value)
                  }}
                />
              </span>
            ))
          ) : (
            <span className="text-muted-foreground/70">{placeholder}</span>
          )}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className={cn(popoverSurface, "absolute z-50 mt-1 w-full p-1.5")}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => toggle(option.value)}
              className="flex w-full items-center gap-2 rounded-sm px-2.5 py-1.5 text-sm transition-colors hover:bg-accent"
            >
              <span
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded-xs border transition-[background,border-color]",
                  value.includes(option.value)
                    ? "[background-image:var(--gradient-leather)] border-[oklch(0.68_0.115_58/0.55)] [box-shadow:var(--shadow-leather-sm)]"
                    : "border-border bg-well"
                )}
              >
                {value.includes(option.value) && (
                  <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3} />
                )}
              </span>
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
