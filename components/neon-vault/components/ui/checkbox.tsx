"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "@/lib/utils"

// Neon Vault Checkbox: a recessed dark square at rest; checked, it adopts the
// hero magenta material (gradient + sheen + rim + glow), the same surface as
// the primary Button, scaled to control size.

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "peer h-4.5 w-4.5 shrink-0 rounded-xs border border-border bg-input",
        "[box-shadow:var(--shadow-inset)]",
        "transition-[background,box-shadow,border-color] duration-fast",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:border-transparent data-[state=indeterminate]:border-transparent data-[state=checked]:bg-primary data-[state=indeterminate]:bg-primary",
        "data-[state=checked]:[background-image:var(--gradient-primary)] data-[state=indeterminate]:[background-image:var(--gradient-primary)]",
        "data-[state=checked]:[box-shadow:var(--shadow-button)] data-[state=indeterminate]:[box-shadow:var(--shadow-button)]",
        "data-[state=checked]:text-primary-foreground data-[state=indeterminate]:text-primary-foreground",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <CheckIcon className="h-3 w-3 in-data-[state=indeterminate]:hidden" />
        <MinusIcon className="h-3 w-3 hidden in-data-[state=indeterminate]:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
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
