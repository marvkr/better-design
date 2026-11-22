import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { glassHover, primaryMaterial, primaryMaterialHover } from "./_shared"

// Amber Glass IconButton: square glass chip; primary carries the amber material.

const iconButtonVariants = cva(
  "inline-flex items-center justify-center rounded-lg transition-all duration-fast ease-out " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
    "disabled:pointer-events-none disabled:opacity-40 active:translate-y-px",
  {
    variants: {
      variant: {
        default: cn(
          "backdrop-blur-[var(--ag-blur)] bg-[var(--ag-fill)] text-foreground",
          "border border-[color:var(--ag-border)]",
          "shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.06)]",
          glassHover
        ),
        primary: cn(primaryMaterial, primaryMaterialHover),
        ghost:
          "bg-transparent text-muted-foreground hover:bg-[var(--ag-fill)] hover:text-foreground",
        destructive:
          "bg-destructive/15 text-[oklch(0.74_0.16_27)] border border-[color:oklch(0.6_0.21_27/0.3)] hover:bg-destructive/25",
      },
      size: {
        sm: "h-7 w-7 [&>svg]:h-3.5 [&>svg]:w-3.5",
        default: "h-9 w-9 [&>svg]:h-4 [&>svg]:w-4",
        lg: "h-10 w-10 [&>svg]:h-5 [&>svg]:w-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  "aria-label": string
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(iconButtonVariants({ variant, size, className }))}
      {...props}
    />
  )
)
IconButton.displayName = "IconButton"

export { IconButton, iconButtonVariants }
