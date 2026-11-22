"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// Halo Number Input: translucent pill input with increment/decrement buttons

interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  value?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, value = 0, onChange, min, max, step = 1, disabled, ...props }, ref) => {
    // Local draft lets the field be cleared mid-edit without the controlled
    // numeric value snapping back. It re-syncs whenever `value` changes externally.
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
        onChange?.(parsed)
      }
    }

    return (
      <div
        className={cn(
          "flex h-10 w-full overflow-hidden",
          "rounded-full border border-border backdrop-blur-xl bg-foreground/[0.06]",
          "shadow-[inset_0_0_0.375rem_color-mix(in_oklch,var(--halo)_6%,transparent)]",
          "transition duration-base",
          "focus-within:shadow-[inset_0_0_0.375rem_color-mix(in_oklch,var(--halo)_6%,transparent),0_0_0_0.1875rem_color-mix(in_oklch,var(--primary)_20%,transparent)] focus-within:border-primary/50",
          disabled && "opacity-70 cursor-not-allowed",
          className
        )}
      >
        <button
          type="button"
          onClick={handleDecrement}
          disabled={disabled || (min !== undefined && value <= min)}
          className="flex h-full w-10 shrink-0 items-center justify-center border-r border-border text-foreground/40 transition-colors hover:bg-foreground/[0.08] hover:text-foreground/80 disabled:opacity-40"
        >
          <Icon icon="tabler:minus" className="h-3.5 w-3.5" />
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
          className="flex-1 bg-transparent px-2 text-center text-sm text-foreground/90 focus:outline-none disabled:cursor-not-allowed [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          {...props}
        />
        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled || (max !== undefined && value >= max)}
          className="flex h-full w-10 shrink-0 items-center justify-center border-l border-border text-foreground/40 transition-colors hover:bg-foreground/[0.08] hover:text-foreground/80 disabled:opacity-40"
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
