"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-5 w-5 shrink-0 rounded-md",
      "backdrop-blur-xl bg-white/[0.05]",
      "border border-white/[0.15]",
      "shadow-[inset_0_0_0.25rem_oklch(1_0_0/0.05)]",
      "transition-all duration-base",
      "hover:border-white/[0.25] hover:bg-white/[0.08]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:backdrop-blur-xl data-[state=checked]:bg-white/[0.15] data-[state=checked]:border-white/[0.25] data-[state=checked]:text-white",
      "data-[state=checked]:shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.2),0_0_1rem_oklch(1_0_0/0.08)]",
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
