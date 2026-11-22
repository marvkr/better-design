"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { formFieldBase, popoverSurface } from "./_shared"

// Leather Luxe Phone Input: one recessed well shared by the dial-code
// selector and the number field; the country list floats as a glass panel.

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
    <div ref={ref} className={cn("relative", className)}>
      <div
        className={cn(
          formFieldBase,
          "flex h-10 items-stretch p-0 overflow-hidden",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        {/* Country selector */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "flex items-center gap-1.5 border-r border-border px-3",
            "text-sm font-medium text-foreground transition-colors",
            "hover:bg-accent",
            "focus-visible:outline-none focus-visible:bg-accent",
            disabled && "cursor-not-allowed"
          )}
        >
          <span>{country?.dial}</span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </button>

        {/* Phone number field */}
        <input
          type="tel"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "h-full flex-1 bg-transparent px-3 text-sm text-foreground",
            "placeholder:text-muted-foreground/70",
            "focus:outline-none",
            disabled && "cursor-not-allowed"
          )}
        />
      </div>

      {/* Country dropdown */}
      {open && (
        <div className={cn(popoverSurface, "absolute left-0 top-11 z-50 w-56 p-1.5")}>
          {COUNTRIES.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => handleSelect(c)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-sm px-2.5 py-1.5 text-sm",
                "transition-colors hover:bg-accent",
                country?.code === c.code
                  ? "font-medium text-primary"
                  : "text-foreground/85"
              )}
            >
              <span className="w-8 font-mono text-xs text-muted-foreground">
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
