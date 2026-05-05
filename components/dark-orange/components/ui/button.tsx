import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Sharp Dark Button — dark landing page style, brand orange #F05023
// Primary: orange fill with multi-layer upward-diffuse orange glow + 1px outer ring + inset highlight
// Neutral: white/light surface with precision layered shadow (same treatment as alignui-light)
// 10px radius (medium), 8px (small)

const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap outline-none transition duration-200 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:bg-secondary disabled:text-muted-foreground disabled:shadow-none disabled:ring-0 disabled:hover:shadow-none font-medium",
  {
    variants: {
      variant: {
        // Primary orange: multi-layer upward-diffuse orange glow + 1px outer ring + inset white highlight
        // Mirrors the precision shadow treatment from alignui-light, using orange as the shadow color
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/95 " +
          "shadow-[0_16px_8px_color-mix(in_oklch,var(--primary)_5%,transparent),0_8px_6px_color-mix(in_oklch,var(--primary)_8%,transparent),0_4px_4px_color-mix(in_oklch,var(--primary)_14%,transparent),0_1.5px_3px_color-mix(in_oklch,var(--primary)_22%,transparent),0_0_0_1px_color-mix(in_oklch,var(--primary)_85%,transparent),inset_0_1px_2px_rgba(255,255,255,0.14)] " +
          "hover:shadow-[0_16px_8px_color-mix(in_oklch,var(--primary)_7%,transparent),0_8px_6px_color-mix(in_oklch,var(--primary)_12%,transparent),0_4px_4px_color-mix(in_oklch,var(--primary)_20%,transparent),0_1.5px_3px_color-mix(in_oklch,var(--primary)_30%,transparent),0_0_0_1px_color-mix(in_oklch,var(--primary)_90%,transparent),inset_0_1px_2px_rgba(255,255,255,0.16)] " +
          "focus-visible:ring-2 focus-visible:ring-primary/40",
        // Neutral (white surface on dark) — precision layered shadow matching alignui-light's charcoal button
        neutral:
          "bg-foreground text-background hover:bg-foreground/90 active:bg-foreground/95 " +
          "shadow-[0_16px_8px_rgba(31,31,31,0.01),0_12px_6px_rgba(31,31,31,0.04),0_4px_4px_rgba(31,31,31,0.07),0_1.5px_3px_rgba(31,31,31,0.08),0_0_0_1px_rgb(15,15,15),inset_0_1px_2px_rgba(255,255,255,0.12)] " +
          "hover:shadow-[0_16px_8px_rgba(31,31,31,0.02),0_12px_6px_rgba(31,31,31,0.06),0_4px_4px_rgba(31,31,31,0.10),0_1.5px_3px_rgba(31,31,31,0.12),0_0_0_1px_rgb(15,15,15),inset_0_1px_2px_rgba(255,255,255,0.14)] " +
          "focus-visible:ring-2 focus-visible:ring-foreground/20",
        // Error/destructive red
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/85 active:bg-destructive/90 " +
          "shadow-[0_4px_4px_rgba(251,55,72,0.14),0_1.5px_3px_rgba(251,55,72,0.22),0_0_0_1px_rgba(180,20,30,0.8),inset_0_1px_2px_rgba(255,255,255,0.10)] " +
          "hover:shadow-[0_4px_4px_rgba(251,55,72,0.22),0_1.5px_3px_rgba(251,55,72,0.30),0_0_0_1px_rgba(180,20,30,0.9),inset_0_1px_2px_rgba(255,255,255,0.12)] " +
          "focus-visible:ring-2 focus-visible:ring-destructive/40",
        // Outline: primary ring + subtle surface — gains glow on hover
        outline:
          "ring-1 ring-inset ring-primary bg-background text-primary " +
          "hover:bg-primary/10 hover:shadow-[0_0_0_3px_color-mix(in_oklch,var(--primary)_12%,transparent)] " +
          "focus-visible:shadow-[0_0_0_3px_color-mix(in_oklch,var(--primary)_18%,transparent)] focus-visible:ring-2 focus-visible:ring-primary/40",
        // Secondary: dark surface with layered card shadow + subtle white ring
        secondary:
          "bg-secondary text-secondary-foreground " +
          "shadow-[0_1px_1px_0.5px_rgba(0,0,0,0.2),0_3px_3px_-1.5px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.06)] " +
          "hover:bg-accent hover:text-foreground hover:shadow-[0_1px_1px_0.5px_rgba(0,0,0,0.25),0_3px_3px_-1.5px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.08)] " +
          "focus-visible:ring-1 focus-visible:ring-foreground/20",
        // Ghost
        ghost:
          "bg-transparent text-primary hover:bg-primary/10 focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-primary/40",
        // Link / neutral ghost
        link: "bg-transparent text-foreground/60 hover:bg-secondary hover:text-foreground",
      },
      size: {
        // medium: h-10 rounded-[10px] px-3.5
        default: "h-10 gap-3 rounded-[10px] px-3.5 text-sm",
        // small: h-9 rounded-lg px-3
        sm: "h-9 gap-3 rounded-lg px-3 text-sm",
        // xsmall: h-8 rounded-lg px-2.5
        xs: "h-8 gap-2.5 rounded-lg px-2.5 text-sm",
        // xxsmall: h-7 rounded-lg px-2
        xxs: "h-7 gap-2.5 rounded-lg px-2 text-xs",
        // large
        lg: "h-11 gap-3 rounded-[10px] px-4 text-sm",
        // icon (square)
        icon: "h-10 w-10 rounded-[10px]",
        "icon-sm": "h-9 w-9 rounded-lg",
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
