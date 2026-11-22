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
  "absolute top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-sm text-(--foreground-secondary)",
  "transition-colors duration-fast ease-out",
  "hover:bg-secondary hover:text-foreground active:bg-muted",
  "disabled:pointer-events-none disabled:text-(--foreground-disabled)",
);

/**
 * Cream editorial NumberInput: a paper field with the number centred in
 * tabular figures between two quiet steppers, minus at the start and plus at
 * the end. A stepper fades once the value reaches its limit; the arrow keys
 * still step the value from the keyboard.
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
          className={cn(stepButton, "start-1")}
        >
          <Icon icon="ph:minus" className="size-4" aria-hidden="true" />
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
            "px-11 text-center tabular-nums",
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
          className={cn(stepButton, "end-1")}
        >
          <Icon icon="ph:plus" className="size-4" aria-hidden="true" />
        </button>
      </div>
    );
  },
);
NumberInput.displayName = "NumberInput";

export { NumberInput };
