"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

// Neon Vault MultiSelect: a recessed track that fills with magenta-tinted
// chips; the menu floats as a vault panel and checks light magenta. The trigger
// consumes the shared formFieldBase surface so it matches Input and the other
// field triggers.

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
          "flex min-h-9 flex-wrap items-center gap-1.5 rounded-2xl py-2 text-left",
          open && "border-ring/60 ring-2 ring-ring/40"
        )}
      >
        <div className="flex flex-1 flex-wrap gap-1">
          {selectedLabels.length > 0 ? (
            selectedLabels.map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary-bright"
              >
                {label}
                <Icon
                  icon="ph:x"
                  className="h-3 w-3 cursor-pointer hover:text-primary-bright/60"
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
        <Icon
          icon="ph:caret-down"
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-1.5 w-full rounded-xl border border-border bg-popover p-1.5 [box-shadow:var(--shadow-popover)]">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => toggle(option.value)}
              className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-sm transition-colors hover:bg-accent"
            >
              <div
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded-xs border border-border bg-input transition-all",
                  value.includes(option.value) &&
                    "border-transparent bg-primary [background-image:var(--gradient-primary)] [box-shadow:var(--shadow-button)]"
                )}
              >
                {value.includes(option.value) && (
                  <Icon icon="ph:check-bold" className="h-2.5 w-2.5 text-primary-foreground" />
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
