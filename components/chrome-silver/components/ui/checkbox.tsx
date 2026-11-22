"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "@/lib/utils"

/*
 * Chrome Azure Checkbox — a recessed steel channel that fills with the azure
 * alloy when checked, matching the primary button material so filled controls
 * read as one metal.
 */

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-[0.3125rem] border-[0.0938rem] border-white/10 bg-origin-border",
      "bg-input [box-shadow:var(--shadow-inset)]",
      "transition-[background,box-shadow,border-color] duration-fast",
      "hover:border-ring/40",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
      "disabled:cursor-not-allowed disabled:opacity-50",
      // Checked/indeterminate = the primary button material: metal-rim border + azure alloy fill.
      "data-[state=checked]:border-transparent data-[state=checked]:[background:var(--surface-on)_padding-box,var(--metal-rim)_border-box] data-[state=checked]:text-primary-foreground data-[state=checked]:[box-shadow:var(--shadow-primary)]",
      "data-[state=indeterminate]:border-transparent data-[state=indeterminate]:[background:var(--surface-on)_padding-box,var(--metal-rim)_border-box] data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:[box-shadow:var(--shadow-primary)]",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      {props.checked === "indeterminate" ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" className="h-3 w-3">
          <path d="M5 12h14" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
          <path d="M5 12l5 5L20 7" />
        </svg>
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
