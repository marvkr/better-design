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
      "peer h-5 w-5 shrink-0 rounded-md",
      "backdrop-blur-xl bg-white/[0.06]",
      "border border-white/[0.15]",
      "shadow-[inset_0_0_0.25rem_oklch(1_0_0/0.06)]",
      "transition-all duration-base",
      "hover:border-white/[0.25] hover:bg-white/[0.1]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-primary data-[state=indeterminate]:bg-primary data-[state=checked]:border-[oklch(1_0_0_/_0.2)] data-[state=indeterminate]:border-[oklch(1_0_0_/_0.2)] data-[state=checked]:text-primary-foreground data-[state=indeterminate]:text-primary-foreground data-[state=checked]:backdrop-saturate-150 data-[state=indeterminate]:backdrop-saturate-150",
      "data-[state=checked]:shadow-[var(--shadow-pillow-primary)] data-[state=indeterminate]:shadow-[var(--shadow-pillow-primary)]",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <CheckIcon className="h-3.5 w-3.5 in-data-[state=indeterminate]:hidden" />
      <MinusIcon className="h-3.5 w-3.5 hidden in-data-[state=indeterminate]:block" />
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
      <path fill="currentColor" d="M8 15h16v2H8z"/>
    </svg>
  )
}
