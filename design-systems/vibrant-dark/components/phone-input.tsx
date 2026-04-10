"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

// Dynamic Phone Input: flat dark inputs, pill dropdown

interface Country { code: string; dial: string; name: string }

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

function PhoneInput({ value = "", onChange, defaultCountry = "US", placeholder = "Phone number", disabled, className }: PhoneInputProps) {
  const [open, setOpen] = React.useState(false)
  const [country, setCountry] = React.useState(() => COUNTRIES.find((c) => c.code === defaultCountry) ?? COUNTRIES[0]!)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <div ref={ref} className={cn("relative flex rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-ring", className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-10 items-center gap-1 bg-secondary px-3 text-sm font-medium text-foreground",
          "transition-colors hover:bg-secondary/80 outline-none",
          disabled && "cursor-not-allowed opacity-60"
        )}
      >
        <span>{country?.dial}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>
      <div className="w-px bg-border/50 self-stretch" />
      <input
        type="tel"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "h-10 flex-1 bg-secondary px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none",
          "hover:bg-secondary/80 focus:bg-secondary/80",
          "transition-colors duration-150",
          disabled && "cursor-not-allowed opacity-60"
        )}
      />
      {open && (
        <div className="absolute left-0 top-11 z-50 w-56 rounded-xl bg-card p-1.5 shadow-[0_8px_30px_0_rgba(0,0,0,0.5)]">
          {COUNTRIES.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => { setCountry(c); setOpen(false) }}
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm transition-colors hover:bg-secondary",
                country?.code === c.code ? "text-primary font-medium" : "text-foreground"
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
