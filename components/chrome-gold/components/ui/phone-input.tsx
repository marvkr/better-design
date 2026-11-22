"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"

/*
 * PhoneInput — one recessed steel channel split by a hairline chrome divider:
 * a country-code well on the left, the number field on the right. The whole
 * group lights its azure focus ring when either field is active.
 */

const PhoneIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
)

export interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  countryCode?: string
  onCountryCodeChange?: (code: string) => void
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, countryCode = "+1", onCountryCodeChange, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex items-stretch overflow-hidden rounded-lg",
          "bg-input border border-white/10 [box-shadow:var(--shadow-inset)]",
          "transition-[border-color,box-shadow] duration-fast",
          "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/40"
        )}
      >
        <div className="flex items-center gap-1 border-r border-white/10 pl-3 pr-2 text-sm text-muted-foreground">
          <PhoneIcon className="h-4 w-4" />
          <input
            type="tel"
            value={countryCode}
            onChange={(e) => onCountryCodeChange?.(e.target.value)}
            className="w-12 bg-transparent text-foreground outline-none"
            aria-label="Country code"
          />
        </div>
        <input
          ref={ref}
          type="tel"
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "flex-1 border-0 bg-transparent [box-shadow:none] focus-visible:border-0 focus-visible:ring-0",
            className
          )}
          {...props}
        />
      </div>
    )
  }
)
PhoneInput.displayName = "PhoneInput"

export { PhoneInput }
