import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Dynamic Button: vibrant colors, pill shapes, active:scale-[0.97] press animation
// Colors: primary(blue), secondary(purple), success, warning, destructive, neutral
// Variants: default(solid), flat, bordered/outline, ghost, light

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap select-none",
    "overflow-hidden outline-none subpixel-antialiased",
    "transition-[transform,opacity] duration-150",
    "active:scale-[0.97]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        // Solid filled
        default:
          // Real Dynamic shadow: two-layer upward color bloom (browser-extracted)
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_10px_15px_-3px_hsl(212_100%_47%/0.4),0_4px_6px_-4px_hsl(212_100%_47%/0.4)]",
        secondary:
          "bg-accent text-accent-foreground hover:bg-accent/90 shadow-[0_10px_15px_-3px_hsl(270_59%_58%/0.4),0_4px_6px_-4px_hsl(270_59%_58%/0.4)]",
        success:
          "bg-[hsl(var(--success))] text-white hover:opacity-90 shadow-[0_10px_15px_-3px_hsl(146_80%_44%/0.4),0_4px_6px_-4px_hsl(146_80%_44%/0.4)]",
        warning:
          "bg-[hsl(var(--warning))] text-black hover:opacity-90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-[0_10px_15px_-3px_hsl(339_90%_51%/0.4),0_4px_6px_-4px_hsl(339_90%_51%/0.4)]",
        neutral:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // Flat — tinted bg, colored text (no shadow)
        flat:
          "bg-primary/20 text-primary hover:bg-primary/30",
        // Bordered — transparent with colored border
        outline:
          "border border-primary bg-transparent text-primary hover:bg-primary/10",
        // Ghost — no bg, hover shows secondary
        ghost:
          "bg-transparent text-foreground hover:bg-secondary",
        link:
          "text-primary underline-offset-4 hover:underline bg-transparent",
      },
      size: {
        sm:      "h-8 px-3 text-xs rounded-lg",
        default: "h-10 px-4 text-sm rounded-xl",
        lg:      "h-12 px-6 text-base rounded-[14px]",
        icon:    "h-10 w-10 rounded-xl",
      },
      pill: {
        true:  "!rounded-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      pill: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, pill, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, pill, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
