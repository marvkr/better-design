"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"

// Clay Product Number Input: recessed clay well field (shared formFieldBase) with
// overlaid raised clay stepper chips that reuse the secondary clay material.

interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  value?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, value = 0, onChange, min, max, step = 1, disabled, ...props }, ref) => {
    const handleDecrement = () => {
      const newValue = value - step
      if (min === undefined || newValue >= min) onChange?.(newValue)
    }

    const handleIncrement = () => {
      const newValue = value + step
      if (max === undefined || newValue <= max) onChange?.(newValue)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = parseFloat(e.target.value)
      if (!isNaN(parsed)) onChange?.(parsed)
    }

    const stepClass =
      "flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] bg-secondary text-secondary-foreground [box-shadow:var(--shadow-clay-sm)] transition-[filter] hover:brightness-[1.03] disabled:opacity-40"

    return (
      <div className={cn("relative", disabled && "opacity-50")}>
        <input
          ref={ref}
          type="number"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "pr-[4.5rem] text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            className
          )}
          {...props}
        />
        <div className="absolute right-1.5 top-1/2 flex -translate-y-1/2 items-center gap-1">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={disabled || (min !== undefined && value <= min)}
            className={stepClass}
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={handleIncrement}
            disabled={disabled || (max !== undefined && value >= max)}
            className={stepClass}
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    )
  }
)
NumberInput.displayName = "NumberInput"

export { NumberInput }
export type { NumberInputProps }
