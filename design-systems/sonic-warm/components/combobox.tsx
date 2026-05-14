"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// Tactile Minimal Combobox: autocomplete dropdown with search

interface ComboboxOption {
  label: string
  value: string
}

interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  disabled?: boolean
  className?: string
}

function Combobox({
  options,
  value = "",
  onChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  disabled,
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const ref = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  React.useEffect(() => {
    if (open) {
      setSearch("")
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  const filtered = React.useMemo(
    () =>
      options.filter((o) =>
        o.label.toLowerCase().includes(search.toLowerCase())
      ),
    [options, search]
  )

  const selected = options.find((o) => o.value === value)

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue === value ? "" : optionValue)
    setOpen(false)
  }

  return (
    <div ref={ref} className={cn("relative w-full", className)}>
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={cn(
          "flex h-9 w-full items-center justify-between px-3 py-1.5 text-sm",
          "rounded-[6px] border border-border bg-background",
          "transition-all duration-150 active:scale-[0.98]",
          "hover:border-ring/50",
          open && "ring-2 ring-ring ring-offset-2 ring-offset-background border-ring",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "text-left"
        )}
      >
        <span className={cn(selected ? "text-foreground" : "text-muted-foreground", "truncate")}>
          {selected ? selected.label : placeholder}
        </span>
        <Icon
          icon="tabler:chevrons-up-down"
          className="ml-2 h-4 w-4 shrink-0 text-muted-foreground"
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-[10px] border border-border bg-card overflow-hidden">
          <div className="flex items-center gap-2 border-b border-border px-3">
            <Icon icon="tabler:search" className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="flex h-9 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>
          <div className="max-h-60 overflow-auto p-1.5">
            {filtered.length === 0 ? (
              <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </div>
            ) : (
              filtered.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-[6px] px-2 py-1.5 text-sm",
                    "transition-all duration-150",
                    "hover:bg-accent hover:text-accent-foreground",
                    option.value === value ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  <Icon
                    icon="tabler:check"
                    className={cn(
                      "h-4 w-4 shrink-0",
                      option.value === value ? "opacity-100 text-primary" : "opacity-0"
                    )}
                  />
                  <span className="truncate">{option.label}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export { Combobox }
export type { ComboboxProps, ComboboxOption }
