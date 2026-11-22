import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Bevel IconButton — the circular control the spec names: 38px, 42px and
 * 46px, always fully round, never a flat fill. Each variant carries six pixels
 * of inset highlight and a soft drop shadow. Pass `aria-label`, because the
 * glyph is the only content.
 */

const iconButtonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center rounded-full",
    "cursor-pointer select-none",
    "transition-[box-shadow,transform,background-color] duration-fast ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-card text-[var(--strong)] [box-shadow:var(--shadow-button)] hover:[box-shadow:var(--shadow-button-hover)]",
        primary:
          "text-primary-foreground bg-[linear-gradient(180deg,var(--primary-from)_0%,var(--primary-to)_100%)] [box-shadow:var(--shadow-primary)] hover:bg-[linear-gradient(180deg,var(--primary-hover-from)_0%,var(--primary-hover-to)_100%)] hover:[box-shadow:var(--shadow-primary-hover)]",
        ghost:
          "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
        outline:
          "bg-transparent text-foreground [box-shadow:var(--shadow-ring)] hover:bg-muted",
        destructive:
          "text-destructive-foreground bg-[linear-gradient(180deg,var(--destructive-from)_0%,var(--destructive-to)_100%)] [box-shadow:var(--shadow-destructive)] hover:[box-shadow:var(--shadow-destructive-hover)]",
      },
      size: {
        sm: "size-[2.375rem] [&>svg]:size-[1.0625rem]",
        default: "size-[2.625rem] [&>svg]:size-[1.1875rem]",
        lg: "size-[2.875rem] [&>svg]:size-[1.3125rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

/** Props for `IconButton`; `aria-label` is required because there is no text. */
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
  ),
)
IconButton.displayName = "IconButton"

export { IconButton, iconButtonVariants }
