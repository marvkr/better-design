"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@iconify/react"
import { formFieldBase } from "./_shared"

// Frosted Glass Phone Input: glass pill input with country code selector

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
          "flex h-12 items-center gap-1.5 rounded-l-full border border-r-0 px-5",
          "backdrop-blur-[var(--fg-blur)] backdrop-saturate-150 bg-[var(--fg-fill)] border-[color:var(--fg-border)] shadow-[var(--fg-shadow)]",
          "text-[0.9375rem] font-medium text-foreground transition-colors",
          "hover:bg-[var(--fg-fill-hover)]",
          "focus-visible:outline-none focus-visible:border-[color:var(--ring)] focus-visible:ring-2 focus-visible:ring-ring/50",
          disabled && "cursor-not-allowed opacity-60"
        )}
      >
        <span>{country?.dial}</span>
        <Icon icon="tabler:chevron-down" className="h-3.5 w-3.5 text-muted-foreground" />
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
          // flex-1 + w-auto override formFieldBase's w-full so the input shares the
          // row with the country pill instead of forcing 100% width.
          "h-12 w-auto flex-1 rounded-r-full px-5 text-[0.9375rem]",
          disabled && "cursor-not-allowed opacity-60"
        )}
      />

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-14 z-50 w-56 rounded-xl border border-border backdrop-blur-2xl bg-[var(--fg-fill-hover)] p-1.5 shadow-[0_0.5rem_2rem_oklch(0_0_0/0.6),inset_0_0_0.375rem_oklch(1_0_0/0.05)]">
          {COUNTRIES.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => handleSelect(c)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[0.9375rem]",
                "transition-colors hover:bg-[oklch(1_0_0/0.07)]",
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
