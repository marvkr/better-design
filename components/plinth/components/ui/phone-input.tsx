"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"

export interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  countryCode?: string
  onCountryCodeChange?: (code: string) => void
}

/* One recessed well split in two: a mono country-code readout on the left,
   the number on the right. The well, not each half, takes the focus ring. */
const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, countryCode = "+1", onCountryCodeChange, disabled, ...props }, ref) => (
    <div
      className={cn(
        formFieldBase,
        "flex h-9 items-stretch rounded-lg px-0",
        "focus-within:border-ring/70 focus-within:ring-2 focus-within:ring-ring/30",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      <label className="flex shrink-0 items-center gap-1.5 border-r border-border pl-3 pr-2 text-muted-foreground">
        <PhoneIcon className="size-3.5" />
        <input
          type="tel"
          value={countryCode}
          disabled={disabled}
          onChange={(event) => onCountryCodeChange?.(event.target.value)}
          aria-label="Country code"
          className="w-10 bg-transparent font-mono text-[0.8125rem] text-foreground outline-none"
        />
      </label>
      <input
        ref={ref}
        type="tel"
        disabled={disabled}
        className={cn(
          formFieldSingleLine,
          "w-full min-w-0 flex-1 rounded-none bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground",
          className
        )}
        {...props}
      />
    </div>
  )
)
PhoneInput.displayName = "PhoneInput"

// feather:phone
function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M22 16.92v3a2 2 0 0 1-2.18 2a19.8 19.8 0 0 1-8.63-3.07a19.5 19.5 0 0 1-6-6a19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72a12.8 12.8 0 0 0 .7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45a12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 16.92" />
    </svg>
  )
}

export { PhoneInput }
