"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils"
import { useSound } from "./sound-provider"

// Clicky Radio Group — circular flat radio with centered dot
// Plays click sound on selection

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, onValueChange, ...props }, ref) => {
  const { playClick } = useSound()
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      onValueChange={(value) => {
        playClick()
        onValueChange?.(value)
      }}
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
        "aspect-square h-4 w-4 rounded-full",
        "border border-border bg-background text-primary",
        "transition-all duration-base ease-out",
        "active:translate-y-px",
        "hover:border-ring/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:border-[var(--primary-rim)] data-[state=checked]:bg-primary",
        "data-[state=checked]:shadow-[var(--shadow-tactile-control)]",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        className={cn("flex items-center justify-center")}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
