import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Luxe Badge: pill-shaped, monochromatic — default is dark secondary bg,
// primary is white (the premium accent), outline is border-only, muted is barely there

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center rounded-full",
    "font-medium tracking-wide transition-colors duration-base",
    "border border-transparent",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "text-secondary-foreground border-border hover:bg-accent bg-[color:oklch(0.897_0_180)]",
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "bg-transparent text-foreground hover:bg-accent border border-[color:oklch(0.421_0.01_271.2)]",
        muted:
          "hover:bg-accent hover:text-foreground bg-[color:oklch(0.9_0_188.1)] text-[color:oklch(0.491_0_173.2)]",
      },
      size: {
        sm:      "h-4 px-2 text-[0.625rem]",
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
