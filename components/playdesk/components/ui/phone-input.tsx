"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

export interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  countryCode?: string;
  onCountryCodeChange?: (code: string) => void;
}

const codes = ["+1", "+44", "+33", "+49", "+61", "+81"];

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, countryCode, onCountryCodeChange, ...props }, ref) => {
    // Controlled when a countryCode is passed, uncontrolled otherwise, so the
    // select still changes when a caller supplies neither prop.
    const [internal, setInternal] = React.useState(countryCode ?? "+44");
    const current = countryCode ?? internal;

    return (
      <div
        className={cn(
          "flex h-10 w-full items-stretch overflow-hidden rounded-lg",
          "border border-border bg-input",
          "[box-shadow:var(--shadow-inset)]",
          "transition-[box-shadow,border-color] duration-fast ease-out",
          "focus-within:border-ring focus-within:ring-[0.1875rem] focus-within:ring-ring/25",
          className,
        )}
      >
        <select
          aria-label="Country code"
          value={current}
          onChange={(event) => {
            if (countryCode === undefined) setInternal(event.target.value);
            onCountryCodeChange?.(event.target.value);
          }}
          className="shrink-0 appearance-none border-r border-border bg-muted px-3 text-sm text-muted-foreground outline-none"
        >
          {codes.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
        <input
          ref={ref}
          type="tel"
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "rounded-none border-0 [box-shadow:none] focus-visible:ring-0",
          )}
          {...props}
        />
      </div>
    );
  },
);
PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
