"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "@/lib/utils"

// Leather Luxe Checkbox: unchecked it is a recessed well; checked it fills
// with the exact cognac leather material of the primary Button, scaled down.

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer relative h-5 w-5 shrink-0 rounded-sm",
      "border border-border bg-well [box-shadow:var(--shadow-well)]",
      "transition-[background,box-shadow,border-color] duration-base",
      "hover:border-highlight",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:[background-image:var(--gradient-leather)] data-[state=indeterminate]:[background-image:var(--gradient-leather)]",
      "data-[state=checked]:border-[oklch(0.68_0.115_58/0.55)] data-[state=indeterminate]:border-[oklch(0.68_0.115_58/0.55)]",
      "data-[state=checked]:[box-shadow:var(--shadow-leather-sm)] data-[state=indeterminate]:[box-shadow:var(--shadow-leather-sm)]",
      "data-[state=checked]:text-primary-foreground data-[state=indeterminate]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <CheckIcon className="h-3.5 w-3.5 in-data-[state=indeterminate]:hidden" />
      <MinusIcon className="h-3.5 w-3.5 hidden in-data-[state=indeterminate]:block" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

// "iconoir:check" and "iconoir:minus" from Iconoir,
// the icon library this system pairs with, drawn inline so the installed
// component loads no icon at runtime. [BD-1029]
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m5 13l4 4L19 7"/>
    </svg>
  )
}
function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 12h12"/>
    </svg>
  )
}
