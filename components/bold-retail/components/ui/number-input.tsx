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
  "absolute top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-secondary text-foreground",
  "transition-colors duration-fast ease-out",
  "hover:bg-(--secondary-hover)",
  "disabled:pointer-events-none disabled:bg-transparent disabled:text-(--foreground-disabled)",
);

/**
 * Bold retail NumberInput: the quantity picker from the bag. The number sits
 * centred in tabular figures between two round grey buttons, minus at the
 * start and plus at the end. A button goes quiet once the value reaches its
 * limit; the arrow keys still step the value from the keyboard.
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
          className={cn(stepButton, "start-1.5")}
        >
          <Icon icon="mingcute:minimize-line" className="size-4" aria-hidden="true" />
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
            "px-12 text-center font-medium tabular-nums",
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
          className={cn(stepButton, "end-1.5")}
        >
          <Icon icon="mingcute:add-line" className="size-4" aria-hidden="true" />
        </button>
      </div>
    );
  },
);
NumberInput.displayName = "NumberInput";

export { NumberInput };
