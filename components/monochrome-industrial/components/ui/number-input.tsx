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

 const increment = () => onValueChange?.(clamp(value + step))
 const decrement = () => onValueChange?.(clamp(value - step))

 return (
 <div className="relative">
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
 "pr-10 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]",
 className
 )}
 {...props}
 />
 <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col">
 <button
 type="button"
 onClick={increment}
 className={cn(
 "flex h-[14px] w-6 items-center justify-center rounded-none",
 "text-muted-foreground transition-colors duration-150",
 "hover:bg-accent hover:text-foreground",
 "focus:outline-none focus:ring-1 focus:ring-ring/40"
 )}
 aria-label="Increment"
 tabIndex={-1}
 >
 <Icon icon="tabler:chevron-up" className="h-3 w-3" />
 </button>
 <button
 type="button"
 onClick={decrement}
 className={cn(
 "flex h-[14px] w-6 items-center justify-center rounded-none",
 "text-muted-foreground transition-colors duration-150",
 "hover:bg-accent hover:text-foreground",
 "focus:outline-none focus:ring-1 focus:ring-ring/40"
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
