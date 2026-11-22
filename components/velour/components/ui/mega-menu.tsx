import * as React from "react"
import { cn } from "@/lib/utils"

/*
 * A wide floating velvet panel: opaque dark-to-darker gradient, inset top
 * rim + hairline ring + deep ambient drop (--shadow-l). No blur.
 */

const MegaMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute left-0 top-full z-50 w-full p-4",
      "rounded-xl bg-popover [background-image:var(--velour)] text-popover-foreground",
      "[box-shadow:var(--shadow-l)]",
      className
    )}
    {...props}
  />
))
MegaMenu.displayName = "MegaMenu"

const MegaMenuGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-3", className)} {...props} />
))
MegaMenuGroup.displayName = "MegaMenuGroup"

const MegaMenuGroupTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-xs font-medium uppercase tracking-wider text-muted-foreground",
      className
    )}
    {...props}
  />
))
MegaMenuGroupTitle.displayName = "MegaMenuGroupTitle"

const MegaMenuItem = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "block rounded-md px-3 py-2 text-sm text-muted-foreground",
      "transition-colors duration-fast",
      "hover:bg-accent hover:text-accent-foreground",
      className
    )}
    {...props}
  />
))
MegaMenuItem.displayName = "MegaMenuItem"

export { MegaMenu, MegaMenuGroup, MegaMenuGroupTitle, MegaMenuItem }
