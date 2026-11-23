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
        "data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground data-[state=checked]:[box-shadow:var(--shadow-s)]",
        "data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:[box-shadow:var(--shadow-s)]",
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

// "pixelarticons:check" and "pixelarticons:minus" from Pixelarticons,
// the icon library this system pairs with, drawn inline so the installed
// component loads no icon at runtime. [BD-1029]
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M10 18H8v-2h2zm-2-2H6v-2h2zm4-2v2h-2v-2zm-6 0H4v-2h2zm8 0h-2v-2h2zm2-2h-2v-2h2zm2-2h-2V8h2zm2-2h-2V6h2z"/>
    </svg>
  )
}
function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M4 11h16v2H4z"/>
    </svg>
  )
}
