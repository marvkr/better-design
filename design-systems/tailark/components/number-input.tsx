"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export interface NumberInputProps {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  onValueChange?: (value: number) => void
  className?: string
}

function NumberInput({
  value: controlledValue,
  defaultValue = 0,
  min,
  max,
  step = 1,
  disabled,
  onValueChange,
  className,
}: NumberInputProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  function clamp(v: number) {
    let result = v
    if (min !== undefined) result = Math.max(min, result)
    if (max !== undefined) result = Math.min(max, result)
    return result
  }

  function update(next: number) {
    const clamped = clamp(next)
    if (!isControlled) setInternalValue(clamped)
    onValueChange?.(clamped)
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const parsed = parseFloat(e.target.value)
    if (!isNaN(parsed)) update(parsed)
  }

  const atMin = min !== undefined && value <= min
  const atMax = max !== undefined && value >= max

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-[10px] border border-border bg-secondary overflow-hidden",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      <button
        type="button"
        aria-label="Decrease"
        onClick={() => update(value - step)}
        disabled={disabled || atMin}
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center",
          "text-muted-foreground hover:text-foreground hover:bg-accent transition-colors",
          "disabled:opacity-40 disabled:pointer-events-none"
        )}
      >
        <Minus className="h-4 w-4" />
      </button>

      <input
        type="number"
        value={value}
        onChange={handleInput}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        className={cn(
          "h-10 w-16 bg-card text-center text-sm font-medium text-foreground",
          "border-x border-border",
          "focus:outline-none focus:ring-0",
          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        )}
      />

      <button
        type="button"
        aria-label="Increase"
        onClick={() => update(value + step)}
        disabled={disabled || atMax}
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center",
          "text-muted-foreground hover:text-foreground hover:bg-accent transition-colors",
          "disabled:opacity-40 disabled:pointer-events-none"
        )}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}

export { NumberInput }
