"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

/*
 * NumberInput — a recessed well with raised bezel stepper keys at either
 * end, like volume keys set into a carved groove.
 */

interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
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
      if (min === undefined || newValue >= min) {
        onChange?.(newValue)
      }
    }

    const handleIncrement = () => {
      const newValue = value + step
      if (max === undefined || newValue <= max) {
        onChange?.(newValue)
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = parseFloat(e.target.value)
      if (!isNaN(parsed)) {
        onChange?.(parsed)
      }
    }

    return (
      <div
        className={cn(
          formFieldBase,
          "flex h-9 items-stretch overflow-hidden rounded-md p-0",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <button
          type="button"
          onClick={handleDecrement}
          disabled={disabled || (min !== undefined && value <= min)}
          aria-label="Decrease value"
          className="flex w-9 shrink-0 items-center justify-center border-r border-border text-muted-foreground transition-colors hover:text-foreground hover:bg-accent/60 disabled:opacity-40 disabled:pointer-events-none"
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
          className="min-w-0 flex-1 bg-transparent px-2 text-center text-sm text-foreground focus:outline-none disabled:cursor-not-allowed [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          {...props}
        />
        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled || (max !== undefined && value >= max)}
          aria-label="Increase value"
          className="flex w-9 shrink-0 items-center justify-center border-l border-border text-muted-foreground transition-colors hover:text-foreground hover:bg-accent/60 disabled:opacity-40 disabled:pointer-events-none"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    )
  }
)
NumberInput.displayName = "NumberInput"

export { NumberInput }
export type { NumberInputProps }
