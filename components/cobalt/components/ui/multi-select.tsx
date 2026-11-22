"use client"

import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

/*
 * MultiSelect — recessed well trigger, bezel chips for selections, and the
 * shared floating carved panel for the option list.
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

  const selectedLabels = options.filter((o) => value.includes(o.value))

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={cn(
          formFieldBase,
          "flex min-h-9 items-center justify-between gap-2 rounded-md py-1.5 text-left",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <span className="flex flex-1 flex-wrap items-center gap-1.5">
          {selectedLabels.length === 0 && (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          {selectedLabels.map((o) => (
            <span
              key={o.value}
              className={cn(
                "inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-xs font-medium text-foreground",
                "border border-border [background-image:var(--bezel)] [box-shadow:var(--shadow-raised)]"
              )}
            >
              {o.label}
              <span
                role="button"
                tabIndex={0}
                aria-label={`Remove ${o.label}`}
                onClick={(e) => {
                  e.stopPropagation()
                  toggle(o.value)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.stopPropagation()
                    toggle(o.value)
                  }
                }}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </span>
            </span>
          ))}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground opacity-70 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-multiselectable="true"
          className="absolute left-0 top-full z-50 mt-1.5 w-full rounded-lg border border-border bg-popover p-1.5 [box-shadow:var(--shadow-pop)]"
        >
          {options.map((option) => {
            const selected = value.includes(option.value)
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => toggle(option.value)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm",
                  "transition-colors hover:bg-accent",
                  selected ? "text-foreground" : "text-muted-foreground"
                )}
              >
                <span
                  className={cn(
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border",
                    selected
                      ? "border-transparent text-primary-foreground [background-image:var(--cobalt)] [box-shadow:var(--shadow-primary)]"
                      : "border-border bg-input [box-shadow:var(--shadow-inset)]"
                  )}
                >
                  {selected && <Check className="h-3 w-3" strokeWidth={3} />}
                </span>
                <span className="truncate">{option.label}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export { MultiSelect }
export type { MultiSelectProps, MultiSelectOption }
