"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-[1.125rem] w-[1.125rem] shrink-0 rounded-sm",
      "bg-input border border-border [box-shadow:var(--shadow-well)]",
      "transition-[background,box-shadow,border-color] duration-fast",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      "disabled:cursor-not-allowed disabled:opacity-50",
      // Filled state reuses the primary Button accent material, scaled down.
      "data-[state=checked]:border-transparent data-[state=checked]:[background:var(--accent-fill)] data-[state=checked]:text-primary-foreground data-[state=checked]:[box-shadow:var(--shadow-accent)]",
      "data-[state=indeterminate]:border-transparent data-[state=indeterminate]:[background:var(--accent-fill)] data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:[box-shadow:var(--shadow-accent)]",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <CheckIcon className="h-3 w-3 in-data-[state=indeterminate]:hidden" />
      <MinusIcon className="h-3 w-3 hidden in-data-[state=indeterminate]:block" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

// "feather:check" and "feather:minus" from Feather,
// the icon library this system pairs with, drawn inline so the installed
// component loads no icon at runtime. [BD-1029]
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 6L9 17l-5-5"/>
    </svg>
  )
}
function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14"/>
    </svg>
  )
}
