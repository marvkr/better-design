import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Bevel Kbd.
 *
 * A key is the Button's material at the smallest size the system has: the card
 * surface, six pixels of inset highlight and a soft drop, at the 8px chip
 * radius. There is no border, so it reads as a raised key rather than a boxed
 * label.
 */

const Kbd = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <kbd
      ref={ref}
      className={cn(
        "inline-flex h-[1.375rem] min-w-[1.375rem] items-center justify-center gap-1 rounded-[0.5rem] px-1.5",
        "bg-card font-mono text-[0.6875rem] font-semibold text-[var(--strong)]",
        "[box-shadow:var(--shadow-button)]",
        className,
      )}
      {...props}
    />
  ),
)
Kbd.displayName = "Kbd"

export { Kbd }
