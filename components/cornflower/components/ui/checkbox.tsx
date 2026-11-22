"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Icon } from "@iconify/react"

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
      "data-[state=checked]:bg-primary data-[state=checked]:border-[var(--primary-rim)] data-[state=checked]:text-primary-foreground",
      "data-[state=checked]:shadow-[var(--shadow-primary-control)]",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Icon icon="tabler:check" className="h-3.5 w-3.5" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
