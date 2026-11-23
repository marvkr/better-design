"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "@/lib/utils"

// Retro-Playful Checkbox — when checked it becomes a mini poster-blue slab:
// the SAME fill + chunky ink border-2 + hard offset shadow as the primary Button,
// scaled down. Reads as one material with the CTA.

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "peer h-5 w-5 shrink-0 rounded-sm border-2 border-border bg-card ring-offset-background transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-primary data-[state=indeterminate]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:text-primary-foreground data-[state=checked]:shadow-[var(--shadow-hard-sm)] data-[state=indeterminate]:shadow-[var(--shadow-hard-sm)]",
        "active:translate-x-[0.1875rem] active:translate-y-[0.1875rem] active:shadow-none",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <CheckIcon className="h-3.5 w-3.5 in-data-[state=indeterminate]:hidden" />
        <MinusIcon className="h-3.5 w-3.5 hidden in-data-[state=indeterminate]:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
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
