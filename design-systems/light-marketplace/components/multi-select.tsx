"use client"

import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface MultiSelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface MultiSelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: MultiSelectOption[]
  value?: string[]
  onChange?: (values: string[]) => void
  placeholder?: string
  disabled?: boolean
  maxItems?: number
}

const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      options,
      value: controlledValue,
      onChange,
      placeholder = "Select options…",
      disabled = false,
      maxItems,
      className,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [internalValue, setInternal] = React.useState<string[]>([])
    const containerRef = React.useRef<HTMLDivElement>(null)
    const selected = controlledValue ?? internalValue

    const setSelected = (next: string[]) => {
      setInternal(next)
      onChange?.(next)
    }

    const toggle = (val: string) => {
      if (selected.includes(val)) {
        setSelected(selected.filter((v) => v !== val))
      } else {
        if (maxItems !== undefined && selected.length >= maxItems) return
        setSelected([...selected, val])
      }
    }

    const remove = (val: string, e: React.MouseEvent) => {
      e.stopPropagation()
      setSelected(selected.filter((v) => v !== val))
    }

    React.useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false)
        }
      }
      document.addEventListener("mousedown", handler)
      return () => document.removeEventListener("mousedown", handler)
    }, [])

    const selectedLabels = options.filter((o) => selected.includes(o.value))

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <div ref={containerRef}>
          {/* Trigger */}
          <button
            type="button"
            disabled={disabled}
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={open}
            className={cn(
              "flex min-h-[44px] w-full items-center justify-between gap-2",
              "rounded-xl border border-border bg-background px-3 py-2 text-sm",
              "focus-visible:outline-none focus-visible:border-ring transition-colors",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            <div className="flex flex-1 flex-wrap gap-1.5">
              {selectedLabels.length === 0 ? (
                <span className="text-muted-foreground">{placeholder}</span>
              ) : (
                selectedLabels.map((opt) => (
                  <span
                    key={opt.value}
                    className="inline-flex items-center gap-1 rounded-lg bg-foreground px-2 py-0.5 text-xs font-medium text-background"
                  >
                    {opt.label}
                    <button
                      type="button"
                      onClick={(e) => remove(opt.value, e)}
                      aria-label={`Remove ${opt.label}`}
                      className="opacity-70 hover:opacity-100 transition-opacity focus-visible:outline-none"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))
              )}
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-150",
                open && "rotate-180",
              )}
            />
          </button>

          {/* Dropdown */}
          {open && (
            <div
              role="listbox"
              aria-multiselectable="true"
              className={cn(
                "absolute z-50 mt-1.5 w-full rounded-[14px] border border-border",
                "bg-background shadow-md py-1 max-h-60 overflow-y-auto",
              )}
            >
              {options.map((opt) => {
                const isSelected = selected.includes(opt.value)
                return (
                  <div
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={opt.disabled}
                    onClick={() => !opt.disabled && toggle(opt.value)}
                    className={cn(
                      "flex cursor-pointer items-center gap-2.5 px-3 py-2 text-sm transition-colors",
                      "hover:bg-secondary text-foreground",
                      opt.disabled && "opacity-50 cursor-not-allowed",
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded border border-border transition-colors shrink-0",
                        isSelected && "bg-primary border-primary",
                      )}
                    >
                      {isSelected && <Check className="h-2.5 w-2.5 text-primary-foreground" />}
                    </div>
                    {opt.label}
                  </div>
                )
              })}
              {options.length === 0 && (
                <div className="px-3 py-4 text-center text-sm text-muted-foreground">
                  No options available.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
)
MultiSelect.displayName = "MultiSelect"

export { MultiSelect }
