"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { focusRing, formFieldBase, formFieldSingleLine, pressScale, raisedSurface } from "./_shared";

/**
 * Paddock NumberInput: the white rounded field with two small white steppers
 * side by side at its right edge. The arrow keys step the value too, so the
 * steppers stay out of the tab order.
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
  "flex size-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground",
  raisedSurface,
  pressScale,
  focusRing,
  "disabled:pointer-events-none disabled:opacity-40",
);

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, value = 0, onValueChange, step = 1, min, max, disabled, onKeyDown, ...props }, ref) => {
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
          type="text"
          inputMode="decimal"
          role="spinbutton"
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          value={value}
          disabled={disabled}
          onChange={(e) => {
            const parsed = parseFloat(e.target.value);
            if (!Number.isNaN(parsed)) onValueChange?.(clamp(parsed));
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowUp") {
              e.preventDefault();
              increment();
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              decrement();
            }
            onKeyDown?.(e);
          }}
          className={cn(formFieldBase, formFieldSingleLine, "pr-18 tabular-nums", className)}
          {...props}
        />
        <div className="absolute right-1.5 top-1/2 flex -translate-y-1/2 items-center gap-1">
          <button
            type="button"
            onClick={decrement}
            disabled={disabled || (min !== undefined && value <= min)}
            className={stepper}
            aria-label="Decrement"
            tabIndex={-1}
          >
            <Icon icon="mingcute:minimize-line" aria-hidden className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={increment}
            disabled={disabled || (max !== undefined && value >= max)}
            className={stepper}
            aria-label="Increment"
            tabIndex={-1}
          >
            <Icon icon="mingcute:add-line" aria-hidden className="size-3.5" />
          </button>
        </div>
      </div>
    );
  },
);
NumberInput.displayName = "NumberInput";

export { NumberInput };
