"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

// Amber Glass PhoneInput: recessed well with a country dial-code selector.

interface Country {
  code: string
  dial: string
  name: string
}

const COUNTRIES: Country[] = [
  { code: "US", dial: "+1", name: "United States" },
  { code: "GB", dial: "+44", name: "United Kingdom" },
  { code: "DE", dial: "+49", name: "Germany" },
  { code: "FR", dial: "+33", name: "France" },
  { code: "ES", dial: "+34", name: "Spain" },
  { code: "IT", dial: "+39", name: "Italy" },
  { code: "NL", dial: "+31", name: "Netherlands" },
  { code: "AU", dial: "+61", name: "Australia" },
  { code: "JP", dial: "+81", name: "Japan" },
  { code: "ZM", dial: "+260", name: "Zambia" },
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
  value,
  onChange,
  defaultCountry = "US",
  placeholder = "Phone number",
  disabled,
  className,
}: PhoneInputProps) {
  const [country, setCountry] = React.useState<Country>(
    COUNTRIES.find((c) => c.code === defaultCountry) ?? COUNTRIES[0]
  )
  const [number, setNumber] = React.useState(value ?? "")

  const handleNumber = (next: string) => {
    setNumber(next)
    onChange?.(`${country.dial} ${next}`)
  }

  return (
    <div
      className={cn(
        "flex h-9 w-full items-stretch overflow-hidden rounded-lg",
        formFieldBase,
        "p-0",
        className
      )}
    >
      <div className="relative flex items-center border-r border-[color:var(--ag-border)]">
        <select
          aria-label="Country code"
          className="h-full cursor-pointer appearance-none bg-transparent pl-3 pr-7 text-sm text-foreground outline-none disabled:cursor-not-allowed [&>option]:bg-[oklch(0.22_0.006_70)] [&>option]:text-foreground"
          value={country.code}
          disabled={disabled}
          onChange={(e) => {
            const next = COUNTRIES.find((c) => c.code === e.target.value)
            if (next) {
              setCountry(next)
              onChange?.(`${next.dial} ${number}`)
            }
          }}
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.code} {c.dial}
            </option>
          ))}
        </select>
        <Icon
          icon="tabler:chevron-down"
          className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-muted-foreground"
        />
      </div>
      <input
        type="tel"
        inputMode="tel"
        className="w-full flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
        placeholder={placeholder}
        value={number}
        disabled={disabled}
        onChange={(e) => handleNumber(e.target.value)}
      />
    </div>
  )
}

export { PhoneInput }
export type { PhoneInputProps }
