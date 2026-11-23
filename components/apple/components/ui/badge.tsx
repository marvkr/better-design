import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Badge — pill-shaped, minimal
// Default: light gray bg, very subtle
// Primary: blue (#0071e3)

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-normal tracking-[-0.022em] transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "bg-[color:oklch(0.906_0.003_286.3)] text-[color:oklch(0.496_0.01_286)]",
        primary: "bg-primary text-primary-foreground",
        secondary: "text-[oklch(0.2316_0.0038_286.0989)] bg-[color:oklch(0.905_0.003_286.4)]",
        destructive: "text-destructive-foreground bg-[color:oklch(0.586_0.208_25.4)]",
        "destructive-light": "text-[color:oklch(0.505_0.213_27.518)] bg-[color:oklch(0.905_0.013_17.4)]",
        success: "bg-[color:oklch(0.9_0.021_166.1)] text-[color:oklch(0.478_0.1_165.6)]",
        "success-light": "bg-[color:oklch(0.9_0.01_171.8)] text-[color:oklch(0.478_0.1_165.6)]",
        warning: "bg-[color:oklch(0.905_0.016_73.7)] text-[color:oklch(0.513_0.166_38.4)]",
        "warning-light": "bg-[color:oklch(0.905_0.007_69)] text-[color:oklch(0.513_0.166_38.4)]",
        outline: "border border-border text-foreground bg-transparent",
      },
      size: {
        sm: "h-4 gap-1 px-1.5 text-[0.625rem]",
        default: "h-5 gap-1.5 px-2.5 text-xs",
        lg: "h-6 gap-1.5 px-3 text-xs",
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
