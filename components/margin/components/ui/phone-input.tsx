"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

/**
 * Margin PhoneInput: one grey filled field split by a hairline into a
 * country code and the number. The whole field turns white with the oxblood
 * halo while either part has focus.
 */
export interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  countryCode?: string;
  onCountryCodeChange?: (code: string) => void;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, countryCode = "+1", onCountryCodeChange, ...props }, ref) => (
    <div
      data-slot="phone-input"
      className={cn(
        formFieldBase,
        formFieldSingleLine,
        "items-stretch gap-0 px-0 py-0",
        "focus-within:border-primary/45 focus-within:bg-card focus-within:ring-3 focus-within:ring-ring",
        "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
        className,
      )}
    >
      <div className="flex items-center gap-1 border-r border-border pl-2.5 pr-1.5 text-muted-foreground">
        <Icon icon="solar:phone-linear" aria-hidden className="size-3.5" />
        <input
          type="tel"
          value={countryCode}
          onChange={(e) => onCountryCodeChange?.(e.target.value)}
          className="w-10 bg-transparent text-sm tabular-nums text-foreground outline-none"
          aria-label="Country code"
        />
      </div>
      <input
        ref={ref}
        type="tel"
        className="min-w-0 flex-1 bg-transparent px-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
        {...props}
      />
    </div>
  ),
);
PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
