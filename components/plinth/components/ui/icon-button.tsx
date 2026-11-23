import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Plinth Icon Button: the square toolbar key. The resting key is graphite,
 * like the editor's undo and theme keys; the primary key takes the ember
 * material with its groove ring. Always pass an `aria-label`.
 */

const iconButtonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center",
    "rounded-lg cursor-pointer select-none",
    "transition-[background,box-shadow,color,scale] duration-fast",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "motion-safe:active:scale-95",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "[background:var(--graphite-gradient)] text-secondary-foreground [box-shadow:var(--shadow-button)] " +
          "hover:text-foreground hover:[box-shadow:var(--shadow-button-hover)]",
        primary:
          "[background:var(--ember-gradient)] text-primary-foreground [box-shadow:var(--shadow-primary)] hover:brightness-105",
        ghost: "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
        outline: "bg-transparent text-foreground border border-border hover:bg-muted",
        destructive:
          "bg-destructive text-destructive-foreground [box-shadow:inset_0_0.0625rem_0_oklch(1_0_0/0.3),0_0_0_0.0625rem_oklch(0.48_0.17_25)] hover:brightness-105",
      },
      size: {
        sm: "size-8 rounded-md [&>svg]:size-3.5",
        default: "size-9 [&>svg]:size-4",
        lg: "size-11 rounded-xl [&>svg]:size-5",
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
      type={props.type ?? "button"}
      className={cn(iconButtonVariants({ variant, size, className }))}
      {...props}
    />
  )
)
IconButton.displayName = "IconButton"

export { IconButton, iconButtonVariants }
