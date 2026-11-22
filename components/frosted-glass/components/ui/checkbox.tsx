"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

// Frosted Glass Checkbox — unchecked is empty glass; checked lights up with the
// SAME material as the primary glass Button (--fg-fill-hover + --fg-shadow rim).

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-5 w-5 shrink-0 rounded-[0.5rem]",
      "backdrop-blur-[var(--fg-blur)] backdrop-saturate-150 bg-[var(--fg-fill)]",
      "border border-[color:var(--fg-border)]",
      "shadow-[inset_0_0.0625rem_0_-0.0313rem_oklch(1_0_0/0.35)]",
      "transition-all duration-base",
      "hover:bg-[var(--fg-fill-hover)]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-0",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-[var(--fg-fill-hover)] data-[state=checked]:text-foreground",
      "data-[state=checked]:shadow-[var(--fg-shadow)]",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Icon icon="tabler:check" className="h-3.5 w-3.5" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
