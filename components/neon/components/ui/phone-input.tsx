"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"

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
          "flex h-9 items-center gap-1.5 rounded-l-[0.625rem] border border-r-0 border-border bg-secondary px-3",
          "text-sm font-medium text-foreground transition-colors hover:bg-accent",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "[box-shadow:inset_0_0.0625rem_0.125rem_oklch(0_0_0_/_0.4)]",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <span>{country?.dial}</span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </button>

      {/* Phone input */}
      <input
        type="tel"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(formFieldBase, formFieldSingleLine, "flex-1 rounded-l-none")}
      />

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-11 z-50 w-56 rounded-[0.75rem] border border-border bg-popover p-1.5 text-popover-foreground [box-shadow:var(--shadow-popover)]">
          {COUNTRIES.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => handleSelect(c)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-[0.5rem] px-2.5 py-1.5 text-sm",
                "transition-colors hover:bg-accent hover:text-accent-foreground",
                country?.code === c.code
                  ? "text-primary font-medium"
                  : "text-foreground"
              )}
            >
              <span className="w-8 font-mono text-xs text-muted-foreground">{c.dial}</span>
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
