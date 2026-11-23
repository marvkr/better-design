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
      "peer h-5 w-5 shrink-0 rounded-xs",
      "backdrop-blur-xl bg-foreground/[0.06]",
      "border border-foreground/[0.15]",
      "shadow-[inset_0_0_0.25rem_color-mix(in_oklch,var(--halo)_6%,transparent)]",
      "transition-all duration-base",
      "hover:border-foreground/[0.25] hover:bg-foreground/[0.1]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-gradient-to-t data-[state=indeterminate]:bg-gradient-to-t data-[state=checked]:from-primary data-[state=indeterminate]:from-primary data-[state=checked]:to-primary/85 data-[state=indeterminate]:to-primary/85 data-[state=checked]:text-primary-foreground data-[state=indeterminate]:text-primary-foreground",
      "data-[state=checked]:border-primary-foreground/20 data-[state=indeterminate]:border-primary-foreground/20",
      "data-[state=checked]:shadow-[0_0.125rem_0.25rem_-0.0625rem_color-mix(in_oklch,var(--shade)_30%,transparent),inset_0_0.0625rem_0_oklch(1_0_0/0.22)] data-[state=indeterminate]:shadow-[0_0.125rem_0.25rem_-0.0625rem_color-mix(in_oklch,var(--shade)_30%,transparent),inset_0_0.0625rem_0_oklch(1_0_0/0.22)]",
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

// "solar:check-linear" and "solar:minus-linear" from Solar,
// the icon library this system pairs with, drawn inline so the installed
// component loads no icon at runtime. [BD-1029]
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13L9 17L19 7"/>
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
