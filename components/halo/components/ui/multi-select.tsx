"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// Halo Multi Select: dropdown with multiple selection

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
          "flex min-h-10 w-full flex-wrap items-center gap-1.5 px-3 py-2 text-sm",
          "rounded-full border border-border backdrop-blur-xl bg-foreground/[0.06]",
          "shadow-[inset_0_0_0.375rem_color-mix(in_oklch,var(--halo)_6%,transparent)]",
          "transition duration-base",
          "hover:bg-foreground/[0.08] hover:border-foreground/[0.15]",
          open && "shadow-[inset_0_0_0.375rem_color-mix(in_oklch,var(--halo)_6%,transparent),0_0_0_0.1875rem_color-mix(in_oklch,var(--primary)_20%,transparent)] border-primary/50",
          "disabled:cursor-not-allowed disabled:opacity-70",
          "text-left"
        )}
      >
        <div className="flex flex-1 flex-wrap gap-1">
          {selectedOptions.length > 0 ? (
            selectedOptions.map((opt) => (
              <span
                key={opt.value}
                className="inline-flex items-center gap-1 rounded-full backdrop-blur-md bg-foreground/[0.1] border border-border px-2 py-0.5 text-xs font-medium text-foreground/90"
              >
                {opt.label}
                <Icon
                  icon="tabler:x"
                  className="h-3 w-3 cursor-pointer text-foreground/50 hover:text-foreground/80"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation()
                    toggle(opt.value)
                  }}
                />
              </span>
            ))
          ) : (
            <span className="text-foreground/40">{placeholder}</span>
          )}
        </div>
        <Icon
          icon="tabler:chevron-down"
          className={cn(
            "h-4 w-4 shrink-0 text-foreground/40 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-xl border border-border backdrop-blur-3xl backdrop-saturate-200 bg-popover supports-[backdrop-filter]:bg-popover/50 p-1.5 shadow-[0_0.5rem_2rem_color-mix(in_oklch,var(--shade)_40%,transparent),inset_0_0_0.375rem_color-mix(in_oklch,var(--halo)_6%,transparent)]">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => toggle(option.value)}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-foreground/[0.08]"
            >
              <div
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded-xs border transition-colors",
                  value.includes(option.value)
                    ? "bg-primary border-primary"
                    : "border-foreground/20 bg-foreground/[0.04]"
                )}
              >
                {value.includes(option.value) && (
                  <Icon icon="tabler:check" className="h-3 w-3 text-primary-foreground" />
                )}
              </div>
              <span className={value.includes(option.value) ? "text-foreground/90" : "text-foreground/60"}>
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
