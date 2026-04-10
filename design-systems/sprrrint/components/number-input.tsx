"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  value?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      value: controlledValue,
      onChange,
      min = -Infinity,
      max = Infinity,
      step = 1,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(controlledValue ?? 0)
    const value = controlledValue ?? internalValue

    const set = (next: number) => {
      const clamped = Math.min(max, Math.max(min, next))
      setInternalValue(clamped)
      onChange?.(clamped)
    }

    const decrement = () => set(value - step)
    const increment = () => set(value + step)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = parseFloat(e.target.value)
      if (!isNaN(parsed)) set(parsed)
    }

    const btnClass = cn(
      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
      "bg-background text-foreground border border-border",
      "hover:bg-secondary transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
      "disabled:opacity-50 disabled:pointer-events-none",
      "active:scale-[0.96]",
    )

    return (
      <div
        className={cn(
          "inline-flex items-center gap-2 rounded-[14px] border border-border bg-background px-2 py-1.5",
          className
        )}
      >
        <button
          type="button"
          onClick={decrement}
          disabled={disabled || value <= min}
          aria-label="Decrease"
          className={btnClass}
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <input
          ref={ref}
          type="number"
          value={value}
          onChange={handleInputChange}
          disabled={disabled}
          className={cn(
            "w-16 bg-transparent text-center text-sm font-semibold text-foreground",
            "focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          )}
          {...props}
        />
        <button
          type="button"
          onClick={increment}
          disabled={disabled || value >= max}
          aria-label="Increase"
          className={btnClass}
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    )
  }
)
NumberInput.displayName = "NumberInput"

export { NumberInput }
