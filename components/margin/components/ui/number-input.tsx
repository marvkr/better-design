"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { focusRing, formFieldBase, formFieldSingleLine, pressScale } from "./_shared";

/**
 * Margin NumberInput: the grey filled field with two tiny white stepper
 * pills stacked inside its right edge.
 */
export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  value?: number;
  onValueChange?: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
}

const stepper = cn(
  "flex h-3 w-5 items-center justify-center rounded-sm bg-card text-muted-foreground shadow-sm",
  "hover:bg-muted hover:text-foreground",
  pressScale,
  focusRing,
  "disabled:pointer-events-none disabled:opacity-40",
);

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, value = 0, onValueChange, step = 1, min, max, disabled, ...props }, ref) => {
    const clamp = (n: number) => {
      let next = n;
      if (min !== undefined) next = Math.max(next, min);
      if (max !== undefined) next = Math.min(next, max);
      return next;
    };

    const increment = () => onValueChange?.(clamp(value + step));
    const decrement = () => onValueChange?.(clamp(value - step));

    return (
      <div data-slot="number-input" className="relative">
        <input
          ref={ref}
          type="number"
          inputMode="decimal"
          value={value}
          step={step}
          min={min}
          max={max}
          disabled={disabled}
          onChange={(e) => {
            const parsed = parseFloat(e.target.value);
            if (!Number.isNaN(parsed)) onValueChange?.(clamp(parsed));
          }}
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "pr-8 tabular-nums [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            className,
          )}
          {...props}
        />
        <div className="absolute right-1.5 top-1/2 flex -translate-y-1/2 flex-col gap-0.5">
          <button
            type="button"
            onClick={increment}
            disabled={disabled || (max !== undefined && value >= max)}
            className={stepper}
            aria-label="Increment"
            tabIndex={-1}
          >
            <Icon icon="solar:alt-arrow-up-linear" className="size-2.5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={decrement}
            disabled={disabled || (min !== undefined && value <= min)}
            className={stepper}
            aria-label="Decrement"
            tabIndex={-1}
          >
            <Icon icon="solar:alt-arrow-down-linear" className="size-2.5" aria-hidden />
          </button>
        </div>
      </div>
    );
  },
);
NumberInput.displayName = "NumberInput";

export { NumberInput };
