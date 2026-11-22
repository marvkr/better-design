"use client";

import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { formFieldBase } from "./_shared";

// Talentboard NumberInput: recessed field with raised stepper column.

interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, value, onChange, min, max, step = 1, disabled, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState<number>(value ?? 0);
    const currentValue = value ?? internalValue;

    const update = (next: number) => {
      let clamped = next;
      if (min !== undefined) clamped = Math.max(min, clamped);
      if (max !== undefined) clamped = Math.min(max, clamped);
      setInternalValue(clamped);
      onChange?.(clamped);
    };

    return (
      <div className="relative">
        <input
          ref={ref}
          type="number"
          inputMode="numeric"
          value={currentValue}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onChange={(e) => {
            const parsed = parseFloat(e.target.value);
            if (!Number.isNaN(parsed)) update(parsed);
          }}
          className={cn(
            formFieldBase,
            "flex h-9 rounded-lg px-3 py-1 pr-8 text-sm tabular-nums",
            "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            className
          )}
          {...props}
        />
        <div className="absolute right-1 top-1/2 flex -translate-y-1/2 flex-col">
          <button
            type="button"
            tabIndex={-1}
            disabled={disabled}
            aria-label="Increase value"
            onClick={() => update(currentValue + step)}
            className="flex h-3.5 w-5 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
          >
            <ChevronUp className="h-3 w-3" />
          </button>
          <button
            type="button"
            tabIndex={-1}
            disabled={disabled}
            aria-label="Decrease value"
            onClick={() => update(currentValue - step)}
            className="flex h-3.5 w-5 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
          >
            <ChevronDown className="h-3 w-3" />
          </button>
        </div>
      </div>
    );
  }
);
NumberInput.displayName = "NumberInput";

export { NumberInput };
export type { NumberInputProps };
