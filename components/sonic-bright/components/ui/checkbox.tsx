"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "@/lib/utils"
import { useSound } from "./sound-provider"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, onCheckedChange, ...props }, ref) => {
  const { playClick } = useSound()
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded border border-border",
        "bg-input [box-shadow:var(--shadow-inset)]",
        "transition-[background-color,box-shadow,border-color] duration-fast",
        "hover:border-ring/40",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground data-[state=checked]:[box-shadow:var(--shadow-primary)]",
        "data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:[box-shadow:var(--shadow-primary)]",
        className
      )}
      onCheckedChange={(checked) => {
        playClick()
        onCheckedChange?.(checked)
      }}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <CheckIcon className="h-3 w-3 in-data-[state=indeterminate]:hidden" />
        <MinusIcon className="h-3 w-3 hidden in-data-[state=indeterminate]:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})
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
