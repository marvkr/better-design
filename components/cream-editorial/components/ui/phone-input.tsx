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
 * Cream editorial PhoneInput: one paper field split by a warm hairline. The
 * country code sits at the start on an oat tray, the number fills the rest,
 * and the whole shell turns its edge terracotta with the soft halo while
 * either part has focus.
 */
const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, countryCode = "+1", onCountryCodeChange, disabled, ...props }, ref) => (
    <div
      data-slot="phone-input"
      className={cn(
        formFieldBase,
        "flex h-10 items-stretch overflow-hidden px-0",
        "focus-within:border-primary focus-within:ring-3 focus-within:ring-ring",
        "has-[[aria-invalid=true]]:border-destructive",
        "has-[:disabled]:cursor-not-allowed has-[:disabled]:bg-secondary has-[:disabled]:text-(--foreground-disabled) has-[:disabled]:hover:border-(--line-strong)",
        className,
      )}
    >
      <div className="flex shrink-0 items-center gap-1.5 border-e border-(--line-strong) bg-secondary ps-3 pe-2 text-muted-foreground">
        <Icon icon="ph:hash" className="size-3.5" aria-hidden="true" />
        <input
          type="tel"
          value={countryCode}
          onChange={(event) => onCountryCodeChange?.(event.target.value)}
          disabled={disabled}
          aria-label="Country code"
          className="w-10 bg-transparent text-sm tabular-nums text-foreground outline-none disabled:cursor-not-allowed disabled:text-(--foreground-disabled)"
        />
      </div>
      <input
        ref={ref}
        type="tel"
        autoComplete="tel-national"
        disabled={disabled}
        className="min-w-0 flex-1 bg-transparent px-3.5 text-sm tabular-nums text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:text-(--foreground-disabled) disabled:placeholder:text-(--foreground-disabled)"
        {...props}
      />
    </div>
  ),
);
PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
