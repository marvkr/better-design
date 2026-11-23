"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "@/lib/utils"

// Ledger Light Checkbox — when checked it becomes a small blue chip that reuses
// the primary Button's exact material (rim + soft blue glow), scaled to 16px.

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm",
      "border border-border bg-input",
      "transition-all duration-fast ease-out",
      "hover:border-ring/45",
      "focus-visible:outline-none focus-visible:ring-[0.1875rem] focus-visible:ring-ring/30",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-primary data-[state=indeterminate]:bg-primary data-[state=checked]:border-[var(--primary-rim)] data-[state=indeterminate]:border-[var(--primary-rim)] data-[state=checked]:text-primary-foreground data-[state=indeterminate]:text-primary-foreground",
      "data-[state=checked]:shadow-[var(--shadow-primary-control)] data-[state=indeterminate]:shadow-[var(--shadow-primary-control)]",
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

// "mingcute:check-line" and "mingcute:minimize-line" from MingCute,
// the icon library this system pairs with, drawn inline so the installed
// component loads no icon at runtime. [BD-1029]
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M9.171 16.072L19.778 5.465c.409-.359 1.01-.404 1.414 0c.404.405.359 1.005 0 1.415L9.878 18.193c-.204.179-.429.293-.707.293s-.503-.114-.707-.293l-5.657-5.657c-.297-.339-.393-.8-.159-1.207c.34-.588 1.092-.629 1.574-.207Z"/>
    </svg>
  )
}
function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M4.741 12.966C3.643 12.672 3.796 11.079 5 11h14c.543.036 1 .428 1 1s-.457.964-1 1H5Z"/>
    </svg>
  )
}
