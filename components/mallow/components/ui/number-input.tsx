"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { focusRing, formFieldBase, formFieldSingleLine, pressScale, softPanel } from "./_shared";

/**
 * Mallow NumberInput: the white form field with two small violet-tinted steppers stacked
 * at its trailing edge. Figures stay tabular so the value never shifts.
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
  softPanel,
  "flex h-4.5 w-7 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground hover:shadow-(--option-edge-hover)",
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
            "appearance-none pe-12 tabular-nums [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            className,
          )}
          {...props}
        />
        <div className="absolute end-2 top-1/2 flex -translate-y-1/2 flex-col gap-1">
          <button
            type="button"
            onClick={increment}
            disabled={disabled || (max !== undefined && value >= max)}
            className={stepper}
            aria-label="Increment"
            tabIndex={-1}
          >
            <Icon icon="iconoir:nav-arrow-up" className="size-3" />
          </button>
          <button
            type="button"
            onClick={decrement}
            disabled={disabled || (min !== undefined && value <= min)}
            className={stepper}
            aria-label="Decrement"
            tabIndex={-1}
          >
            <Icon icon="iconoir:nav-arrow-down" className="size-3" />
          </button>
        </div>
      </div>
    );
  },
);
NumberInput.displayName = "NumberInput";

export { NumberInput };
