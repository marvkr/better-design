"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"

/*
 * Plinth Number Input: a recessed readout well in Geist Mono, with a pair
 * of small graphite step keys seated at its right end.
 */

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  value?: number
  onValueChange?: (value: number) => void
  step?: number
  min?: number
  max?: number
}

const stepKey =
  "flex size-6 items-center justify-center rounded-md text-secondary-foreground " +
  "[background:var(--graphite-gradient)] [box-shadow:var(--shadow-button)] " +
  "transition-[box-shadow,color] duration-fast hover:text-foreground hover:[box-shadow:var(--shadow-button-hover)] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
  "disabled:pointer-events-none disabled:opacity-40"

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, value = 0, onValueChange, step = 1, min, max, disabled, ...props }, ref) => {
    const clamp = (n: number) => {
      let next = n
      if (min !== undefined) next = Math.max(next, min)
      if (max !== undefined) next = Math.min(next, max)
      return next
    }

    return (
      <div className="relative">
        <input
          ref={ref}
          type="number"
          value={value}
          step={step}
          min={min}
          max={max}
          disabled={disabled}
          onChange={(e) => {
            const parsed = parseFloat(e.target.value)
            if (!Number.isNaN(parsed)) onValueChange?.(clamp(parsed))
          }}
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "pr-16 font-mono tabular-nums [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            className
          )}
          {...props}
        />
        <div className="absolute right-1.5 top-1/2 flex -translate-y-1/2 items-center gap-1">
          <button
            type="button"
            onClick={() => onValueChange?.(clamp(value - step))}
            disabled={disabled || (min !== undefined && value <= min)}
            className={stepKey}
            aria-label="Decrease"
            tabIndex={-1}
          >
            <MinusIcon className="size-3" />
          </button>
          <button
            type="button"
            onClick={() => onValueChange?.(clamp(value + step))}
            disabled={disabled || (max !== undefined && value >= max)}
            className={stepKey}
            aria-label="Increase"
            tabIndex={-1}
          >
            <PlusIcon className="size-3" />
          </button>
        </div>
      </div>
    )
  }
)
NumberInput.displayName = "NumberInput"

// feather:minus
function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14" />
    </svg>
  )
}

// feather:plus
function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m-7-7h14" />
    </svg>
  )
}

export { NumberInput }
