"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

// Control Room NumberInput: setpoint stepper. Recessed well flanked by
// square minus/plus keys, like a threshold adjuster.

interface NumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "onChange"
  > {
  value?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    { className, value = 0, onChange, min, max, step = 1, disabled, ...props },
    ref
  ) => {
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
          formFieldBase,
          "flex h-9 w-full overflow-hidden p-0",
          "focus-within:border-ring/70",
          "focus-within:[box-shadow:var(--shadow-inset),0_0_0_0.0625rem_oklch(0.78_0.21_148/0.5),0_0_0.625rem_oklch(0.78_0.21_148/0.25)]",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <button
          type="button"
          onClick={handleDecrement}
          disabled={disabled || (min !== undefined && value <= min)}
          className="flex h-full w-9 shrink-0 items-center justify-center border-r border-border text-muted-foreground transition-colors hover:bg-accent hover:text-primary disabled:opacity-40"
        >
          <Icon icon="tabler:minus" className="size-3.5" />
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
          className="flex-1 bg-transparent px-2 text-center text-sm text-foreground focus:outline-none disabled:cursor-not-allowed [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          {...props}
        />
        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled || (max !== undefined && value >= max)}
          className="flex h-full w-9 shrink-0 items-center justify-center border-l border-border text-muted-foreground transition-colors hover:bg-accent hover:text-primary disabled:opacity-40"
        >
          <Icon icon="tabler:plus" className="size-3.5" />
        </button>
      </div>
    )
  }
)
NumberInput.displayName = "NumberInput"

export { NumberInput }
export type { NumberInputProps }
