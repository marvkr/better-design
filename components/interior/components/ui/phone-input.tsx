"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

/*
 * Interior PhoneInput — one well with two compartments. The wrapper owns the
 * field recipe (2px border, tinted fill, inset shadow; accent border on a
 * white fill when entered), so the seam between the code select and the
 * number never breaks the slot.
 */

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
          "flex h-10 w-full items-stretch overflow-hidden rounded-[0.625rem]",
          "border-2 border-border bg-input",
          "shadow-[var(--shadow-well)]",
          "transition-[background-color,border-color,box-shadow] duration-fast",
          "focus-within:border-ring focus-within:bg-card focus-within:shadow-none",
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
          className="shrink-0 appearance-none border-r border-border bg-secondary px-3 text-[0.8125rem] text-muted-foreground outline-none"
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
            "rounded-none border-0 bg-transparent shadow-none",
            "focus-visible:bg-transparent focus-visible:shadow-none",
          )}
          {...props}
        />
      </div>
    );
  },
);
PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
