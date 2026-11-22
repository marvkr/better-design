"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@iconify/react"

// Halo Phone Input: translucent pill input with country code selector

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
          "flex h-10 items-center gap-1.5 rounded-l-full border border-r-0 border-border backdrop-blur-xl bg-foreground/[0.08] px-3",
          "shadow-[inset_0_0_0.375rem_color-mix(in_oklch,var(--halo)_6%,transparent)]",
          "text-sm font-medium text-foreground/90 transition-colors",
          "hover:bg-foreground/[0.12]",
          "focus-visible:outline-none focus-visible:shadow-[inset_0_0_0.375rem_color-mix(in_oklch,var(--halo)_6%,transparent),0_0_0_0.1875rem_color-mix(in_oklch,var(--primary)_20%,transparent)]",
          disabled && "cursor-not-allowed opacity-60"
        )}
      >
        <span>{country?.dial}</span>
        <Icon icon="tabler:chevron-down" className="h-3.5 w-3.5 text-foreground/40" />
      </button>

      {/* Phone input */}
      <input
        type="tel"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "h-10 flex-1 rounded-r-full border border-border backdrop-blur-xl bg-foreground/[0.06] px-3 text-sm",
          "shadow-[inset_0_0_0.375rem_color-mix(in_oklch,var(--halo)_6%,transparent)]",
          "text-foreground/90 placeholder:text-foreground/40",
          "focus-visible:outline-none focus-visible:shadow-[inset_0_0_0.375rem_color-mix(in_oklch,var(--halo)_6%,transparent),0_0_0_0.1875rem_color-mix(in_oklch,var(--primary)_20%,transparent)] focus-visible:border-primary/50",
          "transition duration-base",
          "hover:bg-foreground/[0.08] hover:border-foreground/[0.15]",
          disabled && "cursor-not-allowed opacity-60"
        )}
      />

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-11 z-50 w-56 rounded-xl border border-border backdrop-blur-3xl backdrop-saturate-200 bg-popover supports-[backdrop-filter]:bg-popover/50 p-1.5 shadow-[0_0.5rem_2rem_color-mix(in_oklch,var(--shade)_40%,transparent),inset_0_0_0.375rem_color-mix(in_oklch,var(--halo)_6%,transparent)]">
          {COUNTRIES.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => handleSelect(c)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm",
                "transition-colors hover:bg-foreground/[0.08]",
                country?.code === c.code
                  ? "text-primary font-medium"
                  : "text-foreground/80"
              )}
            >
              <span className="w-8 font-mono text-xs text-foreground/40">{c.dial}</span>
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
