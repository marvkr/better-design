"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
 React.ElementRef<typeof RadioGroupPrimitive.Root>,
 React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
 <RadioGroupPrimitive.Root ref={ref} className={cn("grid gap-2", className)} {...props} />
))
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
 React.ElementRef<typeof RadioGroupPrimitive.Item>,
 React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
 <RadioGroupPrimitive.Item
 ref={ref}
 className={cn(
 "aspect-square h-4 w-4 shrink-0 rounded-full border border-border",
 "bg-input ",
 "transition-[background-color,box-shadow,border-color] duration-150",
 "hover:border-ring/40",
 "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
 "disabled:cursor-not-allowed disabled:opacity-50",
 "data-[state=checked]:border-primary",
 className
 )}
 {...props}
 >
 <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
 <span className="h-2 w-2 rounded-full bg-primary " />
 </RadioGroupPrimitive.Indicator>
 </RadioGroupPrimitive.Item>
))
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
