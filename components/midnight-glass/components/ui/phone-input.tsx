"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@iconify/react"

// Midnight Glass Phone Input: glass pill input with country code selector

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
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
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
          "flex h-12 items-center gap-1.5 rounded-l-full border border-r-0 border-white/[0.08] backdrop-blur-xl bg-white/[0.07] px-5",
          "shadow-[inset_0_0_6px_rgba(255,255,255,0.05)]",
          "text-[15px] font-medium text-white/90 transition-colors",
          "hover:bg-white/[0.1]",
          "focus-visible:outline-none focus-visible:shadow-[inset_0_0_6px_rgba(255,255,255,0.05),0_0_0_3px_rgba(255,255,255,0.2)]",
          disabled && "cursor-not-allowed opacity-60"
        )}
      >
        <span>{country?.dial}</span>
        <Icon icon="tabler:chevron-down" className="h-3.5 w-3.5 text-white/40" />
      </button>

      {/* Phone input */}
      <input
        type="tel"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "h-12 flex-1 rounded-r-full border border-white/[0.08] backdrop-blur-xl bg-white/[0.05] px-5 text-[15px]",
          "shadow-[inset_0_0_6px_rgba(255,255,255,0.05)]",
          "text-white/90 placeholder:text-white/40",
          "focus-visible:outline-none focus-visible:shadow-[inset_0_0_6px_rgba(255,255,255,0.05),0_0_0_3px_rgba(255,255,255,0.2)] focus-visible:border-primary/50",
          "transition duration-300",
          "hover:bg-white/[0.07] hover:border-white/[0.12]",
          disabled && "cursor-not-allowed opacity-60"
        )}
      />

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-14 z-50 w-56 rounded-xl border border-white/[0.08] backdrop-blur-2xl bg-white/[0.07] p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_0_6px_rgba(255,255,255,0.05)]">
          {COUNTRIES.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => handleSelect(c)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[15px]",
                "transition-colors hover:bg-white/[0.07]",
                country?.code === c.code
                  ? "text-primary font-medium"
                  : "text-white/80"
              )}
            >
              <span className="w-8 font-mono text-xs text-white/40">{c.dial}</span>
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
