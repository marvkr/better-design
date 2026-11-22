"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

/*
 * Recessed-well trigger with raised velvet chips; the open list is the
 * shared velvet popover panel (--shadow-l). Checked boxes wear champagne.
 */

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
          "flex min-h-9 flex-wrap items-center gap-1.5 rounded-lg py-1.5 text-left",
          open && "border-ring/60 ring-2 ring-ring/25"
        )}
      >
        <div className="flex flex-1 flex-wrap gap-1">
          {selectedOptions.length > 0 ? (
            selectedOptions.map((opt) => (
              <span
                key={opt.value}
                className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium text-secondary-foreground [background-image:var(--velour-raised)] [box-shadow:var(--shadow-s)]"
              >
                {opt.label}
                <Icon
                  icon="tabler:x"
                  className="h-3 w-3 cursor-pointer text-muted-foreground hover:text-foreground"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation()
                    toggle(opt.value)
                  }}
                />
              </span>
            ))
          ) : (
            <span className="text-muted-foreground/80">{placeholder}</span>
          )}
        </div>
        <Icon
          icon="tabler:chevron-down"
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-lg p-1.5 bg-popover [background-image:var(--velour)] [box-shadow:var(--shadow-l)]">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => toggle(option.value)}
              className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors duration-fast hover:bg-accent"
            >
              <div
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded-sm border transition-[background-color,box-shadow,border-color]",
                  value.includes(option.value)
                    ? "border-transparent [background-image:var(--champagne)] [box-shadow:var(--shadow-primary)]"
                    : "border-border bg-input [box-shadow:var(--shadow-inset)]"
                )}
              >
                {value.includes(option.value) && (
                  <Icon icon="tabler:check" className="h-3 w-3 text-primary-foreground" />
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
