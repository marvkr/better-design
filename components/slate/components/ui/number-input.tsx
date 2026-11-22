"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

// Ops Sharp NumberInput - the shared field surface (formFieldBase) framing a
// centered numeric input flanked by hairline-divided minus/plus steppers. The
// well takes the field border + inset; focus is promoted to focus-within so the
// ring lights when the inner input gains focus.

interface NumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "onChange"
  > {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    { className, value = 0, onChange, min, max, step = 1, disabled, ...props },
    ref
  ) => {
    const handleDecrement = () => {
      const newValue = value - step;
      if (min === undefined || newValue >= min) {
        onChange?.(newValue);
      }
    };

    const handleIncrement = () => {
      const newValue = value + step;
      if (max === undefined || newValue <= max) {
        onChange?.(newValue);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = parseFloat(e.target.value);
      if (!isNaN(parsed)) {
        onChange?.(parsed);
      }
    };

    return (
      <div
        className={cn(
          formFieldBase,
          formFieldSingleLine,
          "items-stretch overflow-hidden p-0",
          "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/25",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <button
          type="button"
          onClick={handleDecrement}
          disabled={disabled || (min !== undefined && value <= min)}
          className="flex h-full w-9 shrink-0 items-center justify-center border-r border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-40"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <input
          ref={ref}
          type="number"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          className="flex-1 bg-transparent px-2 text-center text-sm text-foreground focus:outline-none disabled:cursor-not-allowed [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          {...props}
        />
        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled || (max !== undefined && value >= max)}
          className="flex h-full w-9 shrink-0 items-center justify-center border-l border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-40"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }
);
NumberInput.displayName = "NumberInput";

export { NumberInput };
export type { NumberInputProps };
