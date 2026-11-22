"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Icon } from "@iconify/react"

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
        "data-[state=checked]:border-transparent data-[state=checked]:bg-primary",
        "data-[state=checked]:[background-image:var(--gradient-primary)]",
        "data-[state=checked]:[box-shadow:var(--shadow-button)]",
        "data-[state=checked]:text-primary-foreground",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <Icon icon="ph:check-bold" className="h-3 w-3" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
