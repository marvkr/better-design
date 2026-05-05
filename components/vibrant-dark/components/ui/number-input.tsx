"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface NumberInputProps {
  value?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  className?: string
}

function NumberInput({
  value = 0,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  disabled,
  className,
}: NumberInputProps) {
  const handleDecrement = () => onChange?.(Math.max(min, value - step))
  const handleIncrement = () => onChange?.(Math.min(max, value + step))

  const btnCls = cn(
    "flex h-full w-9 shrink-0 items-center justify-center",
    "text-muted-foreground transition-colors hover:text-foreground active:scale-[0.97]",
    "disabled:pointer-events-none disabled:opacity-40"
  )

  return (
    <div
      className={cn(
        "inline-flex h-10 overflow-hidden rounded-xl bg-secondary",
        "focus-within:ring-2 focus-within:ring-ring",
        "transition-shadow duration-150",
        disabled && "cursor-not-allowed opacity-60",
        className
      )}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        className={btnCls}
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange?.(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className="w-14 bg-transparent text-center text-sm text-foreground outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        className={btnCls}
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

export { NumberInput }
export type { NumberInputProps }
