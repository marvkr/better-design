"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// Glassmorphic Dark Number Input: glass pill input with increment/decrement buttons

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
          "flex h-10 w-full overflow-hidden",
          "rounded-full border border-white/10 backdrop-blur-xl bg-white/[0.06]",
          "shadow-[inset_0_0_6px_rgba(255,255,255,0.06)]",
          "transition duration-200",
          "focus-within:shadow-[inset_0_0_6px_rgba(255,255,255,0.06),0_0_0_3px_oklch(0.65_0.19_250/0.2)] focus-within:border-primary/50",
          disabled && "opacity-70 cursor-not-allowed",
          className
        )}
      >
        <button
          type="button"
          onClick={handleDecrement}
          disabled={disabled || (min !== undefined && value <= min)}
          className="flex h-full w-10 shrink-0 items-center justify-center border-r border-white/10 text-white/40 transition-colors hover:bg-white/[0.08] hover:text-white/80 disabled:opacity-40"
        >
          <Icon icon="tabler:minus" className="h-3.5 w-3.5" />
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
          className="flex-1 bg-transparent px-2 text-center text-sm text-white/90 focus:outline-none disabled:cursor-not-allowed [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          {...props}
        />
        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled || (max !== undefined && value >= max)}
          className="flex h-full w-10 shrink-0 items-center justify-center border-l border-white/10 text-white/40 transition-colors hover:bg-white/[0.08] hover:text-white/80 disabled:opacity-40"
        >
          <Icon icon="tabler:plus" className="h-3.5 w-3.5" />
        </button>
      </div>
    )
  }
)
NumberInput.displayName = "NumberInput"

export { NumberInput }
export type { NumberInputProps }
