"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

// Control Room MultiSelect: multi-channel selector. Recessed trigger well
// holding square status chips; the list drops in the console popover
// surface with mini signal-green checkboxes.

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
          "flex min-h-9 flex-wrap items-center gap-1.5 py-2 text-left",
          open &&
            "border-ring/70 [box-shadow:var(--shadow-inset),0_0_0_0.0625rem_oklch(0.78_0.21_148/0.5),0_0_0.625rem_oklch(0.78_0.21_148/0.25)]"
        )}
      >
        <div className="flex flex-1 flex-wrap gap-1">
          {selectedOptions.length > 0 ? (
            selectedOptions.map((opt) => (
              <span
                key={opt.value}
                className="inline-flex items-center gap-1 rounded-xs border border-primary/30 bg-primary/15 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider text-primary"
              >
                {opt.label}
                <Icon
                  icon="tabler:x"
                  className="size-3 cursor-pointer text-primary/60 hover:text-destructive"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation()
                    toggle(opt.value)
                  }}
                />
              </span>
            ))
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </div>
        <Icon
          icon="tabler:chevron-down"
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-border bg-popover p-1 [box-shadow:var(--shadow-popover)]">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => toggle(option.value)}
              className="flex w-full items-center gap-2 rounded-xs px-2 py-1.5 text-xs transition-colors hover:bg-accent"
            >
              <div
                className={cn(
                  "flex size-4 items-center justify-center rounded-xs border transition-all",
                  value.includes(option.value)
                    ? "border-transparent bg-primary [box-shadow:var(--shadow-control)]"
                    : "border-border bg-input"
                )}
              >
                {value.includes(option.value) && (
                  <Icon
                    icon="tabler:check"
                    className="size-3 text-primary-foreground"
                  />
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
