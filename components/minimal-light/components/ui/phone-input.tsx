"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Luxe PhoneInput: phone number field with country code selector
// Country dropdown opens a compact scrollable list — no external dependency
// Monochromatic: consistent with secondary bg, border styling

export interface Country {
  code: string   // e.g. "US"
  dial: string   // e.g. "+1"
  flag: string   // e.g. "🇺🇸"
  name: string
}

const DEFAULT_COUNTRIES: Country[] = [
  { code: "US", dial: "+1",   flag: "🇺🇸", name: "United States" },
  { code: "GB", dial: "+44",  flag: "🇬🇧", name: "United Kingdom" },
  { code: "CA", dial: "+1",   flag: "🇨🇦", name: "Canada" },
  { code: "AU", dial: "+61",  flag: "🇦🇺", name: "Australia" },
  { code: "DE", dial: "+49",  flag: "🇩🇪", name: "Germany" },
  { code: "FR", dial: "+33",  flag: "🇫🇷", name: "France" },
  { code: "IN", dial: "+91",  flag: "🇮🇳", name: "India" },
  { code: "JP", dial: "+81",  flag: "🇯🇵", name: "Japan" },
  { code: "BR", dial: "+55",  flag: "🇧🇷", name: "Brazil" },
  { code: "ZA", dial: "+27",  flag: "🇿🇦", name: "South Africa" },
  { code: "NG", dial: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "MX", dial: "+52",  flag: "🇲🇽", name: "Mexico" },
  { code: "SG", dial: "+65",  flag: "🇸🇬", name: "Singapore" },
  { code: "AE", dial: "+971", flag: "🇦🇪", name: "UAE" },
]

export interface PhoneInputProps {
  value?: { country: Country; number: string }
  onChange?: (value: { country: Country; number: string }) => void
  countries?: Country[]
  defaultCountry?: string // country code e.g. "US"
  placeholder?: string
  disabled?: boolean
  className?: string
}

function PhoneInput({
  value,
  onChange,
  countries = DEFAULT_COUNTRIES,
  defaultCountry = "US",
  placeholder = "Phone number",
  disabled = false,
  className,
}: PhoneInputProps) {
  const defaultC = countries.find((c) => c.code === defaultCountry) ?? countries[0]

  const [selectedCountry, setSelectedCountry] = React.useState<Country>(
    value?.country ?? defaultC
  )
  const [number, setNumber] = React.useState(value?.number ?? "")
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const ref = React.useRef<HTMLDivElement>(null)

  const controlled = value !== undefined
  const currentCountry = controlled ? value.country : selectedCountry
  const currentNumber = controlled ? value.number : number

  const filtered = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dial.includes(search) ||
      c.code.toLowerCase().includes(search.toLowerCase())
  )

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch("")
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const handleCountrySelect = (country: Country) => {
    if (!controlled) setSelectedCountry(country)
    onChange?.({ country, number: currentNumber })
    setOpen(false)
    setSearch("")
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = e.target.value
    if (!controlled) setNumber(n)
    onChange?.({ country: currentCountry, number: n })
  }

  return (
    <div ref={ref} className={cn("relative flex", className)}>
      {/* Country selector */}
      <button
        type="button"
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Country: ${currentCountry.name}`}
        className={cn(
          "flex h-10 shrink-0 items-center gap-1.5 rounded-l-xl border border-r-0 border-border bg-secondary px-3",
          "text-sm text-foreground transition-colors duration-200 hover:bg-accent",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:z-10",
          "disabled:cursor-not-allowed disabled:opacity-40"
        )}
      >
        <span className="text-base leading-none">{currentCountry.flag}</span>
        <span className="text-xs text-muted-foreground font-mono">{currentCountry.dial}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("text-muted-foreground transition-transform duration-200", open && "rotate-180")}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Phone number input */}
      <input
        type="tel"
        value={currentNumber}
        onChange={handleNumberChange}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "flex h-10 w-full rounded-r-xl border border-border bg-secondary px-4 py-2 text-sm",
          "text-foreground placeholder:text-muted-foreground",
          "transition-colors duration-200 hover:bg-accent",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0",
          "focus-visible:border-primary/30",
          "disabled:cursor-not-allowed disabled:opacity-40"
        )}
      />

      {/* Dropdown */}
      {open && (
        <div
          className={cn(
            "absolute left-0 top-full z-50 mt-1 w-64 overflow-hidden rounded-xl border border-border bg-card shadow-xl",
            "animate-in fade-in-0 zoom-in-95"
          )}
          role="listbox"
          aria-label="Select country"
        >
          {/* Search */}
          <div className="border-b border-border p-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search countries…"
              autoFocus
              className={cn(
                "w-full rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs text-foreground",
                "placeholder:text-muted-foreground",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              )}
            />
          </div>
          <div className="max-h-52 overflow-y-auto p-1">
            {filtered.length === 0 ? (
              <p className="px-3 py-2 text-xs text-muted-foreground">No countries found</p>
            ) : (
              filtered.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  role="option"
                  aria-selected={currentCountry.code === country.code}
                  onClick={() => handleCountrySelect(country)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground",
                    "transition-colors duration-150 hover:bg-accent",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    currentCountry.code === country.code && "bg-accent"
                  )}
                >
                  <span className="text-base leading-none">{country.flag}</span>
                  <span className="flex-1 truncate text-left">{country.name}</span>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {country.dial}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export { PhoneInput, DEFAULT_COUNTRIES }
