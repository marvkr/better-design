"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Luxe NumberInput: +/- stepper buttons flanking the value
// Secondary bg on buttons, no arrow spinners, clean integer/decimal input

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
      className,
      value,
      onChange,
      min = -Infinity,
      max = Infinity,
      step = 1,
      disabled,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<number>(
      (value as number) ?? 0
    )

    const current = value !== undefined ? value : internalValue

    const update = (next: number) => {
      const clamped = Math.min(max, Math.max(min, next))
      setInternalValue(clamped)
      onChange?.(clamped)
    }

    const decrement = () => update(current - step)
    const increment = () => update(current + step)

    const buttonBase = cn(
      "flex h-10 w-10 shrink-0 items-center justify-center",
      "bg-secondary border border-border text-muted-foreground",
      "transition-all duration-200 hover:bg-accent hover:text-foreground",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      "disabled:pointer-events-none disabled:opacity-40",
      "active:scale-[0.96]"
    )

    return (
      <div className={cn("flex items-center", className)}>
        <button
          type="button"
          onClick={decrement}
          disabled={disabled || current <= min}
          aria-label="Decrement"
          className={cn(buttonBase, "rounded-l-xl border-r-0")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
          </svg>
        </button>
        <input
          ref={ref}
          type="number"
          value={current}
          onChange={(e) => update(parseFloat(e.target.value))}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          className={cn(
            "h-10 w-16 border border-border bg-secondary px-2 py-2",
            "text-center text-sm font-medium text-foreground",
            "transition-colors duration-200 hover:bg-accent",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:z-10",
            "disabled:cursor-not-allowed disabled:opacity-40",
            // Hide native spinners
            "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          )}
          {...props}
        />
        <button
          type="button"
          onClick={increment}
          disabled={disabled || current >= max}
          aria-label="Increment"
          className={cn(buttonBase, "rounded-r-xl border-l-0")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
        </button>
      </div>
    )
  }
)
NumberInput.displayName = "NumberInput"

export { NumberInput }
