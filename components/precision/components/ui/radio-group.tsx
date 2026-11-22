"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

// Precision Radio - selected ring + dot reuse the primary Button material:
// the checked control reads as the same solid-blue raised surface as the button.

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root className={cn("grid gap-2", className)} {...props} />
  )
}
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-input bg-background ring-offset-background transition-shadow",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:border-transparent data-[state=checked]:bg-primary",
        "data-[state=checked]:shadow-[0_0_0_0.0625rem_oklch(0.5_0.18_268),0_0.0625rem_0.125rem_oklch(0.21_0.006_271/0.12),inset_0_0.0625rem_0_oklch(1_0_0/0.16)]",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-1.5 w-1.5 fill-primary-foreground text-primary-foreground" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
