"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  value?: number;
  step?: number;
  min?: number;
  max?: number;
  onValueChange?: (value: number) => void;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    { className, value, step = 1, min, max, onValueChange, ...props },
    ref,
  ) => {
    const [internal, setInternal] = React.useState(value ?? 0);
    const current = value ?? internal;

    const clamp = (next: number) => {
      if (min !== undefined && next < min) return min;
      if (max !== undefined && next > max) return max;
      return next;
    };

    const commit = (next: number) => {
      const clamped = clamp(next);
      setInternal(clamped);
      onValueChange?.(clamped);
    };

    const stepper =
      "inline-flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/[0.05] hover:text-foreground focus-visible:outline-none focus-visible:ring-[0.1875rem] focus-visible:ring-ring/35 disabled:opacity-40";

    return (
      <div className="relative">
        <input
          ref={ref}
          type="number"
          value={current}
          onChange={(event) => commit(Number(event.target.value))}
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "px-11 text-center",
            "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            className,
          )}
          {...props}
        />
        <button
          type="button"
          aria-label="Decrease"
          onClick={() => commit(current - step)}
          disabled={min !== undefined && current <= min}
          className={cn(stepper, "absolute left-1.5 top-1/2 -translate-y-1/2")}
        >
          <Minus className="size-3.5" />
        </button>
        <button
          type="button"
          aria-label="Increase"
          onClick={() => commit(current + step)}
          disabled={max !== undefined && current >= max}
          className={cn(stepper, "absolute right-1.5 top-1/2 -translate-y-1/2")}
        >
          <Plus className="size-3.5" />
        </button>
      </div>
    );
  },
);
NumberInput.displayName = "NumberInput";

export { NumberInput };
