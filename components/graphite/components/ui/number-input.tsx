"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  value?: number
  onValueChange?: (value: number) => void
  step?: number
  min?: number
  max?: number
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, value = 0, onValueChange, step = 1, min, max, ...props }, ref) => {
    const clamp = (n: number) => {
      let next = n
      if (min !== undefined) next = Math.max(next, min)
      if (max !== undefined) next = Math.min(next, max)
      return next
    }

    // Mirror the numeric value in a string draft so the field can hold
    // intermediate states ("", "-", "1.") while typing instead of snapping
    // back. Re-sync only when the committed value actually differs.
    const [draft, setDraft] = React.useState(String(value))
    React.useEffect(() => {
      setDraft((d) => (d !== "" && d !== "-" && Number(d) === value ? d : String(value)))
    }, [value])

    const increment = () => {
      if (props.disabled) return
      const next = clamp(value + step)
      setDraft(String(next))
      onValueChange?.(next)
    }
    const decrement = () => {
      if (props.disabled) return
      const next = clamp(value - step)
      setDraft(String(next))
      onValueChange?.(next)
    }

    return (
      <div className="relative">
        <input
          ref={ref}
          {...props}
          type="number"
          value={draft}
          step={step}
          min={min}
          max={max}
          onChange={(e) => {
            const raw = e.target.value
            setDraft(raw)
            if (raw === "" || raw === "-") return
            const parsed = parseFloat(raw)
            if (!Number.isNaN(parsed)) onValueChange?.(clamp(parsed))
          }}
          onBlur={(e) => {
            setDraft(String(value))
            props.onBlur?.(e)
          }}
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "pr-10 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]",
            className
          )}
        />
        <div className="absolute right-1 top-1/2 flex -translate-y-1/2 flex-col gap-px">
          <button
            type="button"
            onClick={increment}
            disabled={props.disabled}
            className={cn(
              "flex h-[0.875rem] w-6 items-center justify-center rounded-sm",
              "text-muted-foreground transition-colors duration-fast",
              "hover:bg-accent hover:text-foreground",
              "disabled:pointer-events-none disabled:opacity-50",
              "focus:outline-none focus-visible:[box-shadow:0_0_0_0.125rem_oklch(1_0_0_/_0.2)]"
            )}
            aria-label="Increment"
            tabIndex={-1}
          >
            <Icon icon="tabler:chevron-up" className="h-3 w-3" />
          </button>
          <button
            type="button"
            onClick={decrement}
            disabled={props.disabled}
            className={cn(
              "flex h-[0.875rem] w-6 items-center justify-center rounded-sm",
              "text-muted-foreground transition-colors duration-fast",
              "hover:bg-accent hover:text-foreground",
              "disabled:pointer-events-none disabled:opacity-50",
              "focus:outline-none focus-visible:[box-shadow:0_0_0_0.125rem_oklch(1_0_0_/_0.2)]"
            )}
            aria-label="Decrement"
            tabIndex={-1}
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
