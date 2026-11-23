import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Liquid Glass Badge — the kit site's pill: a 13% wash of its own colour with
 * the colour as text (each clears 4.5:1 on its wash), a quiet outline for
 * facts and versions, and one solid pill. Badges stay flat so the glass
 * around them reads as glass.
 */
const badgeVariants = cva(
  "inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1.5 rounded-full px-2 text-[0.6875rem] font-medium whitespace-nowrap " +
    "[&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary/13 text-primary",
        primary: "bg-primary/13 text-primary",
        solid: "bg-foreground text-background",
        secondary: "bg-foreground/10 text-foreground",
        outline: "border border-foreground/25 font-normal text-muted-foreground",
        success: "bg-success/13 text-success",
        warning: "bg-warning/13 text-warning",
        destructive: "bg-destructive/13 text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface BadgeProps extends React.ComponentProps<"span">, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span data-slot="badge" data-variant={variant ?? "default"} className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
export type { BadgeProps }
