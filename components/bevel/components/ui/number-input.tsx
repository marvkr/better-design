"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"

/*
 * Bevel NumberInput.
 *
 * The shared field well with a stepper parked in the right gutter. The
 * browser spinners are stripped so the two Solar chevrons are the only way
 * up and down, and they stay out of the tab order because the field itself
 * already takes typed input.
 */

/** Props for `NumberInput`; the value is a number, not a string. */
export interface NumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "onChange"
  > {
  value?: number
  onValueChange?: (value: number) => void
  step?: number
  min?: number
  max?: number
}

const stepperButton = cn(
  "flex h-[0.9375rem] w-6 items-center justify-center rounded-[0.375rem]",
  "text-muted-foreground transition-colors duration-fast ease-out",
  "hover:bg-muted hover:text-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
)

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    { className, value = 0, onValueChange, step = 1, min, max, ...props },
    ref,
  ) => {
    const clamp = (n: number) => {
      let next = n
      if (min !== undefined) next = Math.max(next, min)
      if (max !== undefined) next = Math.min(next, max)
      return next
    }

    const increment = () => onValueChange?.(clamp(value + step))
    const decrement = () => onValueChange?.(clamp(value - step))

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          type="number"
          value={value}
          step={step}
          min={min}
          max={max}
          onChange={(e) => {
            const parsed = parseFloat(e.target.value)
            if (!Number.isNaN(parsed)) onValueChange?.(clamp(parsed))
          }}
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "pr-11 text-[0.9063rem] leading-[1.125rem] tracking-[0.0188rem]",
            "[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]",
            className,
          )}
          {...props}
        />
        <div className="absolute top-1/2 right-2 flex -translate-y-1/2 flex-col gap-0.5">
          <button
            type="button"
            onClick={increment}
            className={stepperButton}
            aria-label="Increment"
            tabIndex={-1}
          >
            <Icon icon="solar:alt-arrow-up-linear" className="size-3" />
          </button>
          <button
            type="button"
            onClick={decrement}
            className={stepperButton}
            aria-label="Decrement"
            tabIndex={-1}
          >
            <Icon icon="solar:alt-arrow-down-linear" className="size-3" />
          </button>
        </div>
      </div>
    )
  },
)
NumberInput.displayName = "NumberInput"

export { NumberInput }
