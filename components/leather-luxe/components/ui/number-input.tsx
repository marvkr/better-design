"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

// Leather Luxe Number Input: a recessed well flanked by raised stepper coins.

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
    // Local draft lets the field be cleared mid-edit without the controlled
    // numeric value snapping back; re-syncs when `value` changes externally.
    const [draft, setDraft] = React.useState(String(value))

    React.useEffect(() => {
      setDraft(String(value))
    }, [value])

    const clamp = (n: number) => {
      const lower = min !== undefined ? Math.max(min, n) : n
      return max !== undefined ? Math.min(max, lower) : lower
    }

    const handleDecrement = () => {
      onChange?.(clamp(value - step))
    }

    const handleIncrement = () => {
      onChange?.(clamp(value + step))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setDraft(e.target.value)
      const parsed = parseFloat(e.target.value)
      if (!isNaN(parsed)) {
        onChange?.(clamp(parsed))
      }
    }

    const stepperButton = cn(
      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
      "[background-image:var(--gradient-raised)] border border-highlight",
      "[box-shadow:var(--shadow-raised-sm)]",
      "text-muted-foreground transition-[filter,color] duration-base",
      "hover:brightness-125 hover:text-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
      "disabled:pointer-events-none disabled:opacity-40"
    )

    return (
      <div
        className={cn(
          formFieldBase,
          "flex h-10 items-center gap-1 px-1.5",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <button
          type="button"
          aria-label="Decrease value"
          onClick={handleDecrement}
          disabled={disabled || (min !== undefined && value <= min)}
          className={stepperButton}
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <input
          ref={ref}
          type="number"
          value={draft}
          onChange={handleChange}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          className={cn(
            "flex-1 bg-transparent px-1 text-center text-sm text-foreground",
            "focus:outline-none disabled:cursor-not-allowed",
            "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          )}
          {...props}
        />
        <button
          type="button"
          aria-label="Increase value"
          onClick={handleIncrement}
          disabled={disabled || (max !== undefined && value >= max)}
          className={stepperButton}
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
