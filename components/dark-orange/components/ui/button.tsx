import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Sharp Dark Button — dark landing page style, brand orange #F05023
// Primary: orange fill with multi-layer upward-diffuse orange glow + 1px outer ring + inset highlight
// Neutral: white/light surface with precision layered shadow (same treatment as alignui-light)
// 10px radius (medium), 8px (small)

const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap outline-none transition duration-base ease-out focus-visible:outline-none disabled:pointer-events-none disabled:bg-secondary disabled:text-muted-foreground disabled:shadow-none disabled:ring-0 disabled:hover:shadow-none font-medium",
  {
    variants: {
      variant: {
        // Primary orange: multi-layer upward-diffuse orange glow + 1px outer ring + inset white highlight
        // Mirrors the precision shadow treatment from alignui-light, using orange as the shadow color
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/95 " +
          "shadow-[0_1rem_0.5rem_color-mix(in_oklch,var(--primary)_5%,transparent),0_0.5rem_0.375rem_color-mix(in_oklch,var(--primary)_8%,transparent),0_0.25rem_0.25rem_color-mix(in_oklch,var(--primary)_14%,transparent),0_0.0938rem_0.1875rem_color-mix(in_oklch,var(--primary)_22%,transparent),0_0_0_0.0625rem_color-mix(in_oklch,var(--primary)_85%,transparent),inset_0_0.0625rem_0.125rem_oklch(1_0_0/0.14)] " +
          "hover:shadow-[0_1rem_0.5rem_color-mix(in_oklch,var(--primary)_7%,transparent),0_0.5rem_0.375rem_color-mix(in_oklch,var(--primary)_12%,transparent),0_0.25rem_0.25rem_color-mix(in_oklch,var(--primary)_20%,transparent),0_0.0938rem_0.1875rem_color-mix(in_oklch,var(--primary)_30%,transparent),0_0_0_0.0625rem_color-mix(in_oklch,var(--primary)_90%,transparent),inset_0_0.0625rem_0.125rem_oklch(1_0_0/0.16)] " +
          "focus-visible:ring-2 focus-visible:ring-primary/40",
        // Neutral (white surface on dark) — precision layered shadow matching alignui-light's charcoal button
        neutral:
          "bg-foreground text-background hover:bg-foreground/90 active:bg-foreground/95 " +
          "shadow-[0_1rem_0.5rem_oklch(0.2393_0_0/0.01),0_0.75rem_0.375rem_oklch(0.2393_0_0/0.04),0_0.25rem_0.25rem_oklch(0.2393_0_0/0.07),0_0.0938rem_0.1875rem_oklch(0.2393_0_0/0.08),0_0_0_0.0625rem_oklch(0.1684_0_0),inset_0_0.0625rem_0.125rem_oklch(1_0_0/0.12)] " +
          "hover:shadow-[0_1rem_0.5rem_oklch(0.2393_0_0/0.02),0_0.75rem_0.375rem_oklch(0.2393_0_0/0.06),0_0.25rem_0.25rem_oklch(0.2393_0_0/0.1),0_0.0938rem_0.1875rem_oklch(0.2393_0_0/0.12),0_0_0_0.0625rem_oklch(0.1684_0_0),inset_0_0.0625rem_0.125rem_oklch(1_0_0/0.14)] " +
          "focus-visible:ring-2 focus-visible:ring-foreground/20",
        // Error/destructive red
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/85 active:bg-destructive/90 " +
          "shadow-[0_0.25rem_0.25rem_oklch(0.6471_0.2288_22.467/0.14),0_0.0938rem_0.1875rem_oklch(0.6471_0.2288_22.467/0.22),0_0_0_0.0625rem_oklch(0.4919_0.1898_25.8984/0.8),inset_0_0.0625rem_0.125rem_oklch(1_0_0/0.1)] " +
          "hover:shadow-[0_0.25rem_0.25rem_oklch(0.6471_0.2288_22.467/0.22),0_0.0938rem_0.1875rem_oklch(0.6471_0.2288_22.467/0.3),0_0_0_0.0625rem_oklch(0.4919_0.1898_25.8984/0.9),inset_0_0.0625rem_0.125rem_oklch(1_0_0/0.12)] " +
          "focus-visible:ring-2 focus-visible:ring-destructive/40",
        // Outline: primary ring + subtle surface — gains glow on hover
        outline:
          "ring-1 ring-inset ring-primary bg-background text-primary " +
          "hover:bg-primary/10 hover:shadow-[0_0_0_0.1875rem_color-mix(in_oklch,var(--primary)_12%,transparent)] " +
          "focus-visible:shadow-[0_0_0_0.1875rem_color-mix(in_oklch,var(--primary)_18%,transparent)] focus-visible:ring-2 focus-visible:ring-primary/40",
        // Secondary: dark surface with layered card shadow + subtle white ring
        secondary:
          "bg-secondary text-secondary-foreground " +
          "shadow-[0_0.0625rem_0.0625rem_0.0313rem_oklch(0_0_0/0.2),0_0.1875rem_0.1875rem_-0.0938rem_oklch(0_0_0/0.15),0_0_0_0.0625rem_oklch(1_0_0/0.06),inset_0_0.0625rem_0_oklch(1_0_0/0.06)] " +
          "hover:bg-accent hover:text-foreground hover:shadow-[0_0.0625rem_0.0625rem_0.0313rem_oklch(0_0_0/0.25),0_0.1875rem_0.1875rem_-0.0938rem_oklch(0_0_0/0.2),0_0_0_0.0625rem_oklch(1_0_0/0.08),inset_0_0.0625rem_0_oklch(1_0_0/0.08)] " +
          "focus-visible:ring-1 focus-visible:ring-foreground/20",
        // Ghost
        ghost:
          "bg-transparent text-primary hover:bg-primary/10 focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-primary/40",
        // Link / neutral ghost
        link: "bg-transparent text-foreground/60 hover:bg-secondary hover:text-foreground",
      },
      size: {
        // medium: h-10 rounded-[0.625rem] px-3.5
        default: "h-10 gap-3 rounded-[0.625rem] px-3.5 text-sm",
        // small: h-9 rounded-lg px-3
        sm: "h-9 gap-3 rounded-lg px-3 text-sm",
        // xsmall: h-8 rounded-lg px-2.5
        xs: "h-8 gap-2.5 rounded-lg px-2.5 text-sm",
        // xxsmall: h-7 rounded-lg px-2
        xxs: "h-7 gap-2.5 rounded-lg px-2 text-xs",
        // large
        lg: "h-11 gap-3 rounded-[0.625rem] px-4 text-sm",
        // icon (square)
        icon: "h-10 w-10 rounded-[0.625rem]",
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
        type={asChild ? undefined : "button"}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
