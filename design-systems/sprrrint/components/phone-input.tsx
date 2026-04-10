"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CountryCode {
  code: string
  dial: string
  flag: string
  name: string
}

const DEFAULT_COUNTRIES: CountryCode[] = [
  { code: "US", dial: "+1",   flag: "🇺🇸", name: "United States" },
  { code: "GB", dial: "+44",  flag: "🇬🇧", name: "United Kingdom" },
  { code: "CA", dial: "+1",   flag: "🇨🇦", name: "Canada" },
  { code: "AU", dial: "+61",  flag: "🇦🇺", name: "Australia" },
  { code: "DE", dial: "+49",  flag: "🇩🇪", name: "Germany" },
  { code: "FR", dial: "+33",  flag: "🇫🇷", name: "France" },
  { code: "IN", dial: "+91",  flag: "🇮🇳", name: "India" },
  { code: "JP", dial: "+81",  flag: "🇯🇵", name: "Japan" },
  { code: "BR", dial: "+55",  flag: "🇧🇷", name: "Brazil" },
  { code: "MX", dial: "+52",  flag: "🇲🇽", name: "Mexico" },
  { code: "ZA", dial: "+27",  flag: "🇿🇦", name: "South Africa" },
  { code: "NG", dial: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "KE", dial: "+254", flag: "🇰🇪", name: "Kenya" },
  { code: "SG", dial: "+65",  flag: "🇸🇬", name: "Singapore" },
  { code: "AE", dial: "+971", flag: "🇦🇪", name: "UAE" },
]

export interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: string
  onChange?: (value: string) => void
  countryCode?: string
  onCountryChange?: (code: string) => void
  countries?: CountryCode[]
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      value = "",
      onChange,
      countryCode: controlledCountry,
      onCountryChange,
      countries = DEFAULT_COUNTRIES,
      className,
      disabled,
      placeholder = "Phone number",
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [internalCountry, setInternalCountry] = React.useState("US")
    const containerRef = React.useRef<HTMLDivElement>(null)

    const selectedCode = controlledCountry ?? internalCountry
    const selectedCountry = countries.find((c) => c.code === selectedCode) ?? countries[0]

    const handleCountrySelect = (code: string) => {
      setInternalCountry(code)
      onCountryChange?.(code)
      setOpen(false)
    }

    React.useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false)
        }
      }
      document.addEventListener("mousedown", handler)
      return () => document.removeEventListener("mousedown", handler)
    }, [])

    return (
      <div
        ref={containerRef}
        className={cn("relative flex w-full", className)}
      >
        {/* Country selector */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label="Select country code"
          className={cn(
            "flex shrink-0 items-center gap-1.5 rounded-l-xl border-2 border-r-0 border-input bg-secondary",
            "px-3 py-2 text-sm font-medium text-foreground transition-colors",
            "hover:bg-accent focus-visible:outline-none focus-visible:border-ring",
            "disabled:opacity-50 disabled:cursor-not-allowed",
          )}
        >
          <span className="text-base leading-none">{selectedCountry.flag}</span>
          <span className="text-sm text-muted-foreground">{selectedCountry.dial}</span>
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-150",
              open && "rotate-180"
            )}
          />
        </button>

        {/* Phone number input */}
        <input
          ref={ref}
          type="tel"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            "flex h-11 min-w-0 flex-1 rounded-r-xl border-2 border-input bg-background",
            "px-3 py-2 text-sm placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-0 transition-colors",
            "disabled:cursor-not-allowed disabled:opacity-50",
          )}
          {...props}
        />

        {/* Dropdown */}
        {open && (
          <div
            role="listbox"
            aria-label="Country codes"
            className={cn(
              "absolute left-0 top-full z-50 mt-1 w-64 rounded-[14px]",
              "border border-border bg-background shadow-md py-1",
              "max-h-60 overflow-y-auto",
            )}
          >
            {countries.map((country) => (
              <div
                key={country.code}
                role="option"
                aria-selected={country.code === selectedCode}
                onClick={() => handleCountrySelect(country.code)}
                className={cn(
                  "flex cursor-pointer items-center gap-2.5 px-3 py-2 text-sm transition-colors",
                  "hover:bg-secondary",
                  country.code === selectedCode && "bg-secondary font-medium",
                )}
              >
                <span className="text-base">{country.flag}</span>
                <span className="flex-1 truncate text-foreground">{country.name}</span>
                <span className="shrink-0 text-muted-foreground">{country.dial}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
)
PhoneInput.displayName = "PhoneInput"

export { PhoneInput, DEFAULT_COUNTRIES }
