"use client"

import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface Option {
  value: string
  label: string
}

interface MultiSelectProps {
  options: Option[]
  value?: string[]
  onChange?: (value: string[]) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

function MultiSelect({ options, value = [], onChange, placeholder = "Select options...", disabled, className }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const toggle = (v: string) => {
    onChange?.(value.includes(v) ? value.filter((x) => x !== v) : [...value, v])
  }

  const selectedLabels = options.filter((o) => value.includes(o.value))

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex min-h-10 w-full items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-sm",
          "transition-all duration-150 focus-visible:ring-2 focus-visible:ring-ring outline-none",
          "hover:bg-secondary/80",
          disabled && "cursor-not-allowed opacity-60"
        )}
      >
        <div className="flex flex-1 flex-wrap gap-1">
          {selectedLabels.length > 0 ? (
            selectedLabels.map((o) => (
              <span key={o.value} className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                {o.label}
                <span
                  role="button"
                  onClick={(e) => { e.stopPropagation(); toggle(o.value) }}
                  className="cursor-pointer text-primary/70 hover:text-primary"
                >
                  <X className="h-3 w-3" />
                </span>
              </span>
            ))
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </div>
        <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute top-11 z-50 w-full rounded-xl bg-card p-1.5 shadow-[0_8px_30px_0_rgba(0,0,0,0.5)]">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => toggle(option.value)}
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm text-foreground transition-colors hover:bg-secondary"
            >
              <div className={cn("flex h-4 w-4 items-center justify-center rounded-md border border-border", value.includes(option.value) && "bg-primary border-primary")}>
                {value.includes(option.value) && <Check className="h-3 w-3 text-primary-foreground" />}
              </div>
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export { MultiSelect }
export type { MultiSelectProps }
