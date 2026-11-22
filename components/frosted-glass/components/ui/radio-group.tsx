"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils"

// Frosted Glass Radio — empty glass ring; checked lights up with the same glass
// material as the primary Button. The dot is a glossy specular orb.

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-5 w-5 rounded-full",
        "backdrop-blur-[var(--fg-blur)] backdrop-saturate-150 bg-[var(--fg-fill)]",
        "border border-[color:var(--fg-border)]",
        "shadow-[inset_0_0.0625rem_0_-0.0313rem_oklch(1_0_0/0.35)]",
        "transition-all duration-base",
        "hover:bg-[var(--fg-fill-hover)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-0",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-[var(--fg-fill-hover)] data-[state=checked]:shadow-[var(--fg-shadow)]",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <div className="h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle_at_35%_30%,oklch(1_0_0),oklch(1_0_0/0.85)_55%,oklch(0.9_0.02_285/0.7))] shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.5),0_0_0.375rem_oklch(1_0_0/0.4)]" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
