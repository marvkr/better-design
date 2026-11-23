"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "@/lib/utils"

/*
 * Sienna Checkbox — a soft recessed pocket when empty (faint inset), and
 * when checked it becomes the same flat near-black fill as the primary Button
 * (bg-primary + --shadow-primary), so the filled control and the button read as
 * one material.
 */

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-border",
      "bg-input [box-shadow:var(--shadow-inset)]",
      "transition-[background-color,box-shadow,border-color] duration-fast",
      "hover:border-ring/40",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground data-[state=checked]:[box-shadow:var(--shadow-primary)]",
      "data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:[box-shadow:var(--shadow-primary)]",
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

// "ph:check-bold" and "ph:minus-bold" from Phosphor,
// the icon library this system pairs with, drawn inline so the installed
// component loads no icon at runtime. [BD-1029]
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" aria-hidden="true" {...props}>
      <path fill="currentColor" d="m232.49 80.49l-128 128a12 12 0 0 1-17 0l-56-56a12 12 0 1 1 17-17L96 183L215.51 63.51a12 12 0 0 1 17 17Z"/>
    </svg>
  )
}
function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M228 128a12 12 0 0 1-12 12H40a12 12 0 0 1 0-24h176a12 12 0 0 1 12 12"/>
    </svg>
  )
}
