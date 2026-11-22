import * as React from "react"

import { cn } from "@/lib/utils"

// Control Room MegaMenu: full-width command panel dropping from the
// console header in the shared glow-elevated popover surface.

const MegaMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute left-0 top-full z-50 w-full p-4",
      "rounded-md border border-border bg-popover text-popover-foreground",
      "[box-shadow:var(--shadow-popover)]",
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
      "text-[0.625rem] font-semibold uppercase tracking-widest text-muted-foreground",
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
      "block rounded-xs px-3 py-2 text-xs",
      "transition-colors duration-fast",
      "hover:bg-accent hover:text-foreground",
      "text-muted-foreground",
      className
    )}
    {...props}
  />
))
MegaMenuItem.displayName = "MegaMenuItem"

export { MegaMenu, MegaMenuGroup, MegaMenuGroupTitle, MegaMenuItem }
