import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Dynamic Badge: rounded-full pill, vibrant solid colors, small text

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 rounded-full font-medium select-none",
  {
    variants: {
      variant: {
        default:     "bg-secondary text-secondary-foreground",
        primary:     "bg-primary text-primary-foreground",
        secondary:   "bg-accent text-accent-foreground",
        success:     "bg-[hsl(var(--success))] text-white",
        warning:     "bg-[hsl(var(--warning))] text-black",
        destructive: "bg-destructive text-destructive-foreground",
        flat:        "bg-primary/20 text-primary",
        outline:     "border border-border bg-transparent text-foreground",
      },
      size: {
        sm:      "h-4 px-1.5 text-[10px]",
        default: "h-5 px-2 text-xs",
        lg:      "h-6 px-2.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
