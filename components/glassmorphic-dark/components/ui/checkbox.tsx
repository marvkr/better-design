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
      "data-[state=checked]:bg-primary/80 data-[state=indeterminate]:bg-primary/80 data-[state=checked]:border-primary/50 data-[state=indeterminate]:border-primary/50 data-[state=checked]:text-primary-foreground data-[state=indeterminate]:text-primary-foreground",
      "data-[state=checked]:shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.15),0_0_0.625rem_oklch(0.65_0.19_250/0.2)] data-[state=indeterminate]:shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.15),0_0_0.625rem_oklch(0.65_0.19_250/0.2)]",
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

// "solar:check-bold" and "solar:minus-bold" from Solar,
// the icon library this system pairs with, drawn inline so the installed
// component loads no icon at runtime. [BD-1029]
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M18.4697 6.46967C18.7626 6.17678 19.2373 6.17678 19.5302 6.46967C19.8231 6.76256 19.8231 7.23732 19.5302 7.53022L9.53022 17.5302C9.23732 17.8231 8.76256 17.8231 8.46967 17.5302L4.46967 13.5302C4.17678 13.2373 4.17678 12.7626 4.46967 12.4697C4.76256 12.1768 5.23732 12.1768 5.53022 12.4697L8.99994 15.9394L18.4697 6.46967Z"/>
    </svg>
  )
}
function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M4 12.75C3.58579 12.75 3.25 12.4142 3.25 12C3.25 11.5858 3.58579 11.25 4 11.25L20 11.25C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75L4 12.75Z"/>
    </svg>
  )
}
