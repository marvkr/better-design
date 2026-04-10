import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Luxe Button — browser-extracted from the original site (2026)
// Light theme: #f5f5f5 bg, #4a4c52 text, black primary buttons
// Key trait: NO box-shadows on buttons — clean minimal border-only styling
// Primary: black fill (site uses oklab(0 0 0/0.8) ~ near-black), white text, fontWeight 600
// Secondary: light gray bg, dark text, 1px border, no shadow
// Radius: 12px throughout
// Transitions smooth (200ms)

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-semibold",
    "outline-none transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:scale-[0.98]",
  ].join(" "),
  {
    variants: {
      variant: {
        // Primary: black fill — no shadow (luxeui's clean signature)
        default:
          "rounded-xl bg-primary text-primary-foreground " +
          "hover:bg-primary/80 active:bg-primary/70",

        // Secondary: light gray, 1px border, no shadow
        secondary:
          "rounded-xl bg-secondary text-secondary-foreground border border-border " +
          "hover:bg-accent hover:border-border/60",

        // Outline: border only — luxeui's minimal style
        outline:
          "rounded-xl border border-border bg-transparent text-foreground " +
          "hover:bg-accent hover:border-border/80",

        // Ghost: no border, no shadow
        ghost:
          "rounded-xl text-muted-foreground " +
          "hover:bg-accent hover:text-foreground",

        // Destructive
        destructive:
          "rounded-xl bg-destructive text-destructive-foreground " +
          "hover:bg-destructive/90",

        // Link
        link:
          "text-foreground underline-offset-4 hover:underline",

        // Muted
        muted:
          "rounded-xl bg-muted text-muted-foreground " +
          "hover:bg-accent hover:text-foreground",
      },
      size: {
        sm:      "h-8 px-4 text-xs rounded-lg",
        default: "h-[38px] px-4",
        lg:      "h-[44px] px-4 text-base",
        xl:      "h-14 px-10 text-base",
        icon:    "h-[38px] w-[38px] rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
