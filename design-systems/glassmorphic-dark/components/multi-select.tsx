"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// Glassmorphic Dark Multi Select: dropdown with multiple selection

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
      if (ref.current && !ref.current.contains(e.target as Node)) {
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
          "flex min-h-10 w-full flex-wrap items-center gap-1.5 px-3 py-2 text-sm",
          "rounded-full border border-white/10 backdrop-blur-xl bg-white/[0.06]",
          "shadow-[inset_0_0_6px_rgba(255,255,255,0.06)]",
          "transition duration-200",
          "hover:bg-white/[0.08] hover:border-white/[0.15]",
          open && "shadow-[inset_0_0_6px_rgba(255,255,255,0.06),0_0_0_3px_oklch(0.65_0.19_250/0.2)] border-primary/50",
          "disabled:cursor-not-allowed disabled:opacity-70",
          "text-left"
        )}
      >
        <div className="flex flex-1 flex-wrap gap-1">
          {selectedLabels.length > 0 ? (
            selectedLabels.map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1 rounded-full backdrop-blur-md bg-white/[0.1] border border-white/10 px-2 py-0.5 text-xs font-medium text-white/90"
              >
                {label}
                <Icon
                  icon="tabler:x"
                  className="h-3 w-3 cursor-pointer text-white/50 hover:text-white/80"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation()
                    const opt = options.find((o) => o.label === label)
                    if (opt) toggle(opt.value)
                  }}
                />
              </span>
            ))
          ) : (
            <span className="text-white/40">{placeholder}</span>
          )}
        </div>
        <Icon
          icon="tabler:chevron-down"
          className={cn(
            "h-4 w-4 shrink-0 text-white/40 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-xl border border-white/10 backdrop-blur-2xl bg-white/[0.08] p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_0_6px_rgba(255,255,255,0.06)]">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => toggle(option.value)}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-white/[0.08]"
            >
              <div
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded-[4px] border transition-colors",
                  value.includes(option.value)
                    ? "bg-primary border-primary"
                    : "border-white/20 bg-white/[0.04]"
                )}
              >
                {value.includes(option.value) && (
                  <Icon icon="tabler:check" className="h-3 w-3 text-primary-foreground" />
                )}
              </div>
              <span className={value.includes(option.value) ? "text-white/90" : "text-white/60"}>
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
