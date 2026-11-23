"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "@/lib/utils"

/*
 * Bevel Checkbox — an empty box is a well pressed into the card. Checked,
 * it takes the primary Button's own surface: the same vertical gradient, rim
 * and inset highlight, scaled down, so the two read as one material.
 */

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer size-[1.125rem] shrink-0 rounded-[0.375rem] bg-input",
      "[box-shadow:var(--shadow-inset)]",
      "transition-[box-shadow,background-image] duration-fast ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:text-primary-foreground data-[state=checked]:bg-[linear-gradient(180deg,var(--primary-from)_0%,var(--primary-to)_100%)] data-[state=checked]:[box-shadow:var(--shadow-primary)]",
      "data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:bg-[linear-gradient(180deg,var(--primary-from)_0%,var(--primary-to)_100%)] data-[state=indeterminate]:[box-shadow:var(--shadow-primary)]",
      className,
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

export { Checkbox }

// "solar:check-read-linear" and "solar:minus-linear" from Solar,
// the icon library this system pairs with, drawn inline so the installed
// component loads no icon at runtime. [BD-1029]
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M4 12.9L7.14286 16.5L15 7.5"/><path d="M20 7.5625L11.4283 16.5625L11 16"/></g>
    </svg>
  )
}
function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M20 12L4 12"/>
    </svg>
  )
}
