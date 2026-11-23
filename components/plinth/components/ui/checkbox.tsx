"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "@/lib/utils"

/*
 * Plinth Checkbox: a small recessed well. Checked, it takes the ember
 * Button material: the gradient, the catch-light and the ember rim.
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer size-[1.125rem] shrink-0 rounded-[0.375rem]",
      "bg-input border border-[oklch(1_0_0/0.1)] [box-shadow:var(--shadow-inset)]",
      "transition-[background,box-shadow,border-color] duration-fast",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:border-[oklch(0.5_0.16_39)] data-[state=checked]:[background:var(--ember-gradient)] data-[state=checked]:text-primary-foreground data-[state=checked]:[box-shadow:inset_0_0.0625rem_0_oklch(1_0_0/0.4)]",
      "data-[state=indeterminate]:border-[oklch(0.5_0.16_39)] data-[state=indeterminate]:[background:var(--ember-gradient)] data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:[box-shadow:inset_0_0.0625rem_0_oklch(1_0_0/0.4)]",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <CheckIcon className="size-3 in-data-[state=indeterminate]:hidden" />
      <MinusIcon className="size-3 hidden in-data-[state=indeterminate]:block" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

// feather:check
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 6L9 17l-5-5" />
    </svg>
  )
}

// feather:minus
function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 12h14" />
    </svg>
  )
}

export { Checkbox }
