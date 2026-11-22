"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check, Minus } from "lucide-react"

import { cn } from "@/lib/utils"

/* Checked state reuses the primary Button's neon material, scaled down. */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-[1.125rem] w-[1.125rem] shrink-0 rounded-[0.375rem] border border-border",
      "bg-input [box-shadow:inset_0_0.0625rem_0.125rem_oklch(0_0_0_/_0.4)]",
      "transition-[background,box-shadow,border-color] duration-fast",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:[background:var(--neon-gradient)] data-[state=checked]:text-primary-foreground data-[state=checked]:border-transparent data-[state=checked]:[box-shadow:var(--shadow-neon)]",
      "data-[state=indeterminate]:[background:var(--neon-gradient)] data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:border-transparent data-[state=indeterminate]:[box-shadow:var(--shadow-neon)]",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      {props.checked === "indeterminate" ? (
        <Minus className="h-3 w-3" strokeWidth={3} />
      ) : (
        <Check className="h-3 w-3" strokeWidth={3} />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
