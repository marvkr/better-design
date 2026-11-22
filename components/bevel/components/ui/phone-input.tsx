"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"

/*
 * Bevel PhoneInput.
 *
 * One field well split into a country code and a number. The outer well
 * carries the surface and the focus ring, so typing in either half lights
 * the whole control. One pixel of the track token parts the two, which is
 * how every other split row in the system is divided.
 */

/** Props for `PhoneInput`; the country code is held separately from the number. */
export interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  countryCode?: string
  onCountryCodeChange?: (code: string) => void
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    { className, countryCode = "+1", onCountryCodeChange, disabled, ...props },
    ref,
  ) => (
    <div
      className={cn(
        formFieldBase,
        formFieldSingleLine,
        "items-stretch overflow-hidden px-0 py-0",
        "focus-within:[box-shadow:var(--shadow-inset),0_0_0_0.125rem_var(--ring)]",
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center gap-1.5 pr-2.5 pl-3.5",
          "text-[0.9063rem] leading-[1.125rem] tracking-[0.0188rem] text-muted-foreground",
          "[box-shadow:0.0625rem_0_0_0_var(--track)]",
          disabled && "cursor-not-allowed opacity-60",
        )}
      >
        <Icon icon="solar:phone-linear" className="size-4 shrink-0" />
        <input
          type="tel"
          value={countryCode}
          onChange={(e) => onCountryCodeChange?.(e.target.value)}
          disabled={disabled}
          className="w-11 bg-transparent text-foreground outline-none disabled:cursor-not-allowed"
          aria-label="Country code"
        />
      </div>
      <input
        ref={ref}
        type="tel"
        disabled={disabled}
        className={cn(
          "min-w-0 flex-1 bg-transparent px-3.5 outline-none",
          "text-[0.9063rem] leading-[1.125rem] tracking-[0.0188rem] text-foreground",
          "placeholder:text-muted-foreground",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    </div>
  ),
)
PhoneInput.displayName = "PhoneInput"

export { PhoneInput }
