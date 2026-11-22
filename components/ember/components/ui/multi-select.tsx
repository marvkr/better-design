"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase, popoverSurface } from "./_shared"

// Amber Glass MultiSelect: recessed well collecting glass chips,
// floating glass option list.

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
  value,
  onChange,
  placeholder = "Select options...",
  disabled,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [internal, setInternal] = React.useState<string[]>(value ?? [])
  const selected = value ?? internal
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !(e.target instanceof Node && containerRef.current.contains(e.target))) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const commit = (next: string[]) => {
    setInternal(next)
    onChange?.(next)
  }

  const toggle = (optionValue: string) => {
    commit(
      selected.includes(optionValue)
        ? selected.filter((v) => v !== optionValue)
        : [...selected, optionValue]
    )
  }

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-lg px-2 py-1.5 text-left text-sm",
          formFieldBase
        )}
      >
        {selected.length === 0 && (
          <span className="px-1 text-muted-foreground">{placeholder}</span>
        )}
        {selected.map((v) => {
          const option = options.find((o) => o.value === v)
          return (
            <span
              key={v}
              className="inline-flex items-center gap-1 rounded-full bg-[var(--ag-fill-hover)] border border-[color:var(--ag-border)] px-2 py-0.5 text-xs font-semibold"
            >
              {option?.label ?? v}
              <span
                role="button"
                tabIndex={0}
                aria-label={`Remove ${option?.label ?? v}`}
                onClick={(e) => {
                  e.stopPropagation()
                  toggle(v)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    e.stopPropagation()
                    toggle(v)
                  }
                }}
                className="rounded-full text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon icon="tabler:x" className="h-3 w-3" />
              </span>
            </span>
          )
        })}
        <Icon
          icon="tabler:chevron-down"
          className="ml-auto h-3.5 w-3.5 shrink-0 text-muted-foreground"
        />
      </button>
      {open && (
        <ul
          role="listbox"
          aria-multiselectable
          className={cn(
            "absolute z-50 mt-1.5 max-h-56 w-full overflow-y-auto rounded-lg p-1",
            popoverSurface
          )}
        >
          {options.map((option) => {
            const isSelected = selected.includes(option.value)
            return (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => toggle(option.value)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                    isSelected
                      ? "bg-primary/10 font-semibold text-primary"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon
                    icon="tabler:check"
                    className={cn("h-4 w-4", isSelected ? "opacity-100" : "opacity-0")}
                  />
                  {option.label}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export { MultiSelect }
export type { MultiSelectProps, MultiSelectOption }
