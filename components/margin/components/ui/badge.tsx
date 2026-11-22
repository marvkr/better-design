import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { oxFace, quietFace } from "./_shared";

/**
 * Margin Badge: a rectangular label, as square as a clerk's stamp.
 *
 * The default is the issue tag: oxblood ink on a pale oxblood mark. Pass
 * `onRemove` and it grows a small remove button at its end, whose hit area
 * fills the chip's height. `neutral` is the paper field chip, `outline` a
 * hairline on white, and `primary` and `solid` wear the oxblood face of the
 * primary Button. Status and colour variants are a light tint of their own
 * hue with the text deep in that hue. Size `sm` is the small mark that sits
 * at the end of a navigation row.
 */
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1 whitespace-nowrap font-medium [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-(--mark) text-(--mark-foreground)",
        neutral: "bg-foreground/10 text-foreground",
        primary: oxFace,
        solid: oxFace,
        secondary: quietFace,
        outline: "bg-card text-muted-foreground ring-1 ring-input",
        info: "bg-info/15 text-info-text",
        success: "bg-success/18 text-success-text",
        warning: "bg-warning/26 text-warning-text",
        destructive: "bg-destructive/16 text-destructive-text",
        blue: "bg-(--mark) text-(--mark-foreground)",
        green: "bg-success/18 text-success-text",
        orange: "bg-(--rust)/22 text-(--rust-text)",
        yellow: "bg-(--amber)/34 text-(--amber-text)",
        purple: "bg-(--slate)/15 text-(--slate-text)",
      },
      size: {
        sm: "h-4.5 rounded-sm px-1.5 text-xs [&_svg]:size-3",
        default: "h-6 rounded-md px-2 text-xs [&_svg]:size-3.5",
        lg: "h-7 rounded-lg px-2.5 text-sm font-normal [&_svg]:size-3.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /** Shows a remove button at the chip's end and calls this when pressed. */
  onRemove?: () => void;
  /** The remove button's accessible name. Defaults to "Remove" plus the text. */
  removeLabel?: string;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, onRemove, removeLabel, children, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), onRemove && "gap-0.5 pe-1", className)}
      {...props}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          data-slot="badge-remove"
          onClick={onRemove}
          aria-label={removeLabel ?? "Remove"}
          className={cn(
            "relative grid size-5 place-items-center rounded-sm text-current opacity-55 outline-none",
            "transition duration-fast ease-(--ease-out) hover:bg-primary/12 hover:opacity-100",
            "focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ring",
            "after:absolute after:-inset-1",
          )}
        >
          <Icon icon="solar:close-circle-linear" className="size-3.5" aria-hidden />
        </button>
      )}
    </div>
  ),
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
