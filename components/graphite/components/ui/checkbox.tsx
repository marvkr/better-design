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
      "bg-input [box-shadow:var(--shadow-inset)]",
      "transition-[background,box-shadow] duration-fast",
      "focus-visible:outline-none focus-visible:[box-shadow:var(--shadow-inset),0_0_0_0.125rem_var(--ring)]",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-[image:var(--pill-gradient)] data-[state=checked]:text-foreground data-[state=checked]:[box-shadow:var(--shadow-pill)]",
      "data-[state=indeterminate]:bg-[image:var(--pill-gradient)] data-[state=indeterminate]:text-foreground data-[state=indeterminate]:[box-shadow:var(--shadow-pill)]",
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

// "carbon:checkmark" and "carbon:subtract" from Carbon Icons,
// the icon library this system pairs with, drawn inline so the installed
// component loads no icon at runtime.
// One unit of stroke keeps the thin Carbon tick readable at 12px. [BD-1029]
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" d="m13 24l-9-9l1.414-1.414L13 21.171L26.586 7.586L28 9z"/>
    </svg>
  )
}
function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" d="M8 15h16v2H8z"/>
    </svg>
  )
}
