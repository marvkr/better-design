"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

/*
 * Bevel Checkbox — an empty box is a well pressed into the card. Checked,
 * it takes the primary Button's own surface: the same vertical gradient, rim
 * and inset highlight, scaled down, so the two read as one material.
 */

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer size-[1.125rem] shrink-0 rounded-[0.375rem] bg-input",
      "[box-shadow:var(--shadow-inset)]",
      "transition-[box-shadow,background-image] duration-fast ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:text-primary-foreground data-[state=checked]:bg-[linear-gradient(180deg,var(--primary-from)_0%,var(--primary-to)_100%)] data-[state=checked]:[box-shadow:var(--shadow-primary)]",
      "data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:bg-[linear-gradient(180deg,var(--primary-from)_0%,var(--primary-to)_100%)] data-[state=indeterminate]:[box-shadow:var(--shadow-primary)]",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      {props.checked === "indeterminate" ?
        <Icon icon="solar:minus-square-linear" className="size-3" />
      : <Icon icon="solar:check-read-linear" className="size-3" />}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
