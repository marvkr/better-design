import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Luxe Badge: pill-shaped, monochromatic — default is dark secondary bg,
// primary is white (the premium accent), outline is border-only, muted is barely there

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center rounded-full",
    "font-medium tracking-wide transition-colors duration-200",
    "border border-transparent",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-secondary text-secondary-foreground border-border hover:bg-accent",
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "border-border bg-transparent text-foreground hover:bg-accent",
        muted:
          "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground",
      },
      size: {
        sm:      "h-4 px-2 text-[10px]",
        default: "h-5 px-2.5 text-xs",
        lg:      "h-6 px-3 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size, className }))} {...props} />
  )
}

export { Badge, badgeVariants }
