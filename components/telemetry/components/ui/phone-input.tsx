"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

// Control Room PhoneInput: dial field with a country-code key fused to a
// recessed well; the picker drops in the console popover surface.

interface Country {
  code: string
  dial: string
  name: string
}

const COUNTRIES: Country[] = [
  { code: "US", dial: "+1", name: "United States" },
  { code: "GB", dial: "+44", name: "United Kingdom" },
  { code: "AU", dial: "+61", name: "Australia" },
  { code: "CA", dial: "+1", name: "Canada" },
  { code: "DE", dial: "+49", name: "Germany" },
  { code: "FR", dial: "+33", name: "France" },
  { code: "IN", dial: "+91", name: "India" },
  { code: "JP", dial: "+81", name: "Japan" },
  { code: "BR", dial: "+55", name: "Brazil" },
  { code: "MX", dial: "+52", name: "Mexico" },
]

interface PhoneInputProps {
  value?: string
  onChange?: (value: string) => void
  defaultCountry?: string
  placeholder?: string
  disabled?: boolean
  className?: string
}

function PhoneInput({
  value = "",
  onChange,
  defaultCountry = "US",
  placeholder = "Phone number",
  disabled,
  className,
}: PhoneInputProps) {
  const [open, setOpen] = React.useState(false)
  const [country, setCountry] = React.useState(
    () => COUNTRIES.find((c) => c.code === defaultCountry) ?? COUNTRIES[0]!
  )
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !(e.target instanceof Node && ref.current.contains(e.target))) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const handleSelect = (c: Country) => {
    setCountry(c)
    setOpen(false)
  }

  return (
    <div ref={ref} className={cn("relative flex", className)}>
      {/* Country selector */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-9 items-center gap-1.5 rounded-l-sm border border-r-0 border-border bg-secondary px-3",
          "text-sm font-medium text-foreground transition-colors",
          "hover:bg-accent",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
          disabled && "cursor-not-allowed opacity-60"
        )}
      >
        <span>{country?.dial}</span>
        <Icon
          icon="tabler:chevron-down"
          className="size-3.5 text-muted-foreground"
        />
      </button>

      {/* Phone input */}
      <input
        type="tel"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          formFieldBase,
          "h-9 flex-1 rounded-l-none rounded-r-sm py-1.5",
          disabled && "cursor-not-allowed opacity-60"
        )}
      />

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-10 z-50 w-56 rounded-md border border-border bg-popover p-1 [box-shadow:var(--shadow-popover)]">
          {COUNTRIES.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => handleSelect(c)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-xs px-2.5 py-1.5 text-xs",
                "transition-colors hover:bg-accent",
                country?.code === c.code
                  ? "font-semibold text-primary"
                  : "text-foreground"
              )}
            >
              <span className="w-8 text-xs text-muted-foreground">
                {c.dial}
              </span>
              <span className="truncate">{c.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export { PhoneInput }
export type { PhoneInputProps }
