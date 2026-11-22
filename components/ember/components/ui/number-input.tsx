"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

// Amber Glass NumberInput: recessed well with glass stepper buttons.

interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  value?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    { className, value, onChange, min, max, step = 1, disabled, ...props },
    ref
  ) => {
    const [internal, setInternal] = React.useState<number>(value ?? 0)
    const current = value ?? internal

    const clamp = (n: number) => {
      let next = n
      if (min !== undefined) next = Math.max(min, next)
      if (max !== undefined) next = Math.min(max, next)
      return next
    }

    const update = (n: number) => {
      const next = clamp(n)
      setInternal(next)
      onChange?.(next)
    }

    return (
      <div
        className={cn(
          "flex h-9 w-full items-stretch overflow-hidden rounded-lg",
          formFieldBase,
          "p-0",
          className
        )}
      >
        <input
          ref={ref}
          type="number"
          inputMode="numeric"
          className="w-full flex-1 bg-transparent px-3 py-2 text-sm outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          value={current}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onChange={(e) => update(Number(e.target.value))}
          {...props}
        />
        <div className="flex flex-col border-l border-[color:var(--ag-border)]">
          <button
            type="button"
            tabIndex={-1}
            aria-label="Increment"
            disabled={disabled || (max !== undefined && current >= max)}
            onClick={() => update(current + step)}
            className="flex flex-1 items-center justify-center px-2 text-muted-foreground transition-colors hover:bg-[var(--ag-fill)] hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          >
            <Icon icon="tabler:chevron-up" className="h-3 w-3" />
          </button>
          <button
            type="button"
            tabIndex={-1}
            aria-label="Decrement"
            disabled={disabled || (min !== undefined && current <= min)}
            onClick={() => update(current - step)}
            className="flex flex-1 items-center justify-center border-t border-[color:var(--ag-border)] px-2 text-muted-foreground transition-colors hover:bg-[var(--ag-fill)] hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          >
            <Icon icon="tabler:chevron-down" className="h-3 w-3" />
          </button>
        </div>
      </div>
    )
  }
)
NumberInput.displayName = "NumberInput"

export { NumberInput }
export type { NumberInputProps }
