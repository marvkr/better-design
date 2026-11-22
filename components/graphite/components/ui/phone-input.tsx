"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"

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
          "bg-input border-0 [box-shadow:var(--shadow-inset)]",
          "transition-[box-shadow] duration-fast",
          "focus-within:[box-shadow:var(--shadow-inset),0_0_0_0.125rem_oklch(1_0_0_/_0.2)]"
        )}
      >
        <div className="flex items-center gap-1 border-r border-border pl-3 pr-2 text-sm text-muted-foreground">
          <Icon icon="tabler:phone" className="h-4 w-4" />
          <input
            type="tel"
            value={countryCode}
            onChange={(e) => onCountryCodeChange?.(e.target.value)}
            disabled={props.disabled}
            className="w-12 bg-transparent text-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Country code"
          />
        </div>
        <input
          ref={ref}
          type="tel"
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "flex-1 border-0 bg-transparent [box-shadow:none] hover:[box-shadow:none] focus-visible:[box-shadow:none]",
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
