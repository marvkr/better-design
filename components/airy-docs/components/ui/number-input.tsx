"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

export interface NumberInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange"
> {
  value?: number;
  onValueChange?: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
}

const stepButton = cn(
  "absolute inset-y-0.25 inline-flex w-9 items-center justify-center text-(--foreground-secondary)",
  "transition-colors duration-fast ease-out",
  "hover:bg-secondary hover:text-foreground",
  "disabled:pointer-events-none disabled:text-(--foreground-disabled)",
);

/**
 * Airy docs NumberInput: the Input box with the value centred in tabular
 * figures between two stepper cells, each split off by a hairline, the way
 * an API playground edits a numeric parameter. A stepper greys out at its
 * limit; the arrow keys still step the value.
 */
const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    { className, value = 0, onValueChange, step = 1, min, max, disabled, ...props },
    ref,
  ) => {
    const clamp = (n: number) => {
      let next = n;
      if (min !== undefined) next = Math.max(next, min);
      if (max !== undefined) next = Math.min(next, max);
      return next;
    };

    const atMin = min !== undefined && value <= min;
    const atMax = max !== undefined && value >= max;

    return (
      <div data-slot="number-input" className="relative">
        <button
          type="button"
          onClick={() => onValueChange?.(clamp(value - step))}
          disabled={disabled || atMin}
          aria-label="Decrease"
          tabIndex={-1}
          className={cn(stepButton, "start-0.25 rounded-s-md border-e border-border")}
        >
          <Icon icon="feather:minus" className="size-3.5" aria-hidden="true" />
        </button>
        <input
          ref={ref}
          type="number"
          inputMode="decimal"
          value={value}
          step={step}
          min={min}
          max={max}
          disabled={disabled}
          onChange={(event) => {
            const parsed = parseFloat(event.target.value);
            if (!Number.isNaN(parsed)) onValueChange?.(clamp(parsed));
          }}
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "px-11 text-center font-mono tabular-nums",
            "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            className,
          )}
          {...props}
        />
        <button
          type="button"
          onClick={() => onValueChange?.(clamp(value + step))}
          disabled={disabled || atMax}
          aria-label="Increase"
          tabIndex={-1}
          className={cn(stepButton, "end-0.25 rounded-e-md border-s border-border")}
        >
          <Icon icon="feather:plus" className="size-3.5" aria-hidden="true" />
        </button>
      </div>
    );
  },
);
NumberInput.displayName = "NumberInput";

export { NumberInput };
