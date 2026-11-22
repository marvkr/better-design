"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase } from "./_shared";

export interface PhoneInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  countryCode?: string;
  onCountryCodeChange?: (code: string) => void;
}

/**
 * Bold retail PhoneInput: one checkout field split by a grey rule. The
 * country code sits at the start behind a phone icon and the number fills
 * the rest. The whole shell takes the black edge and grey halo while either
 * part has focus.
 */
const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, countryCode = "+1", onCountryCodeChange, disabled, ...props }, ref) => (
    <div
      data-slot="phone-input"
      className={cn(
        formFieldBase,
        "flex h-12 items-stretch overflow-hidden px-0",
        "focus-within:border-foreground focus-within:ring-4 focus-within:ring-(--halo)",
        "has-[[aria-invalid=true]]:border-destructive",
        "has-[:disabled]:cursor-not-allowed has-[:disabled]:bg-secondary has-[:disabled]:text-(--foreground-disabled) has-[:disabled]:hover:border-(--line-strong)",
        className,
      )}
    >
      <div className="flex shrink-0 items-center gap-2 border-e border-(--line-strong) ps-4 pe-3 text-muted-foreground">
        <Icon icon="mingcute:phone-line" className="size-4" aria-hidden="true" />
        <input
          type="tel"
          value={countryCode}
          onChange={(event) => onCountryCodeChange?.(event.target.value)}
          disabled={disabled}
          aria-label="Country code"
          className="w-10 bg-transparent text-base tabular-nums text-foreground outline-none disabled:cursor-not-allowed disabled:text-(--foreground-disabled)"
        />
      </div>
      <input
        ref={ref}
        type="tel"
        autoComplete="tel-national"
        disabled={disabled}
        className="min-w-0 flex-1 bg-transparent px-4 text-base tabular-nums text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:text-(--foreground-disabled) disabled:placeholder:text-(--foreground-disabled)"
        {...props}
      />
    </div>
  ),
);
PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
