import * as React from "react"
import { cn } from "@/lib/utils"

const MegaMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute left-0 top-full z-50 w-full p-4",
      "rounded-xl border border-white/[0.08]",
      "backdrop-blur-2xl bg-white/[0.05]",
      "shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_0_8px_rgba(255,255,255,0.05)]",
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
  <div
    ref={ref}
    className={cn("space-y-3", className)}
    {...props}
  />
))
MegaMenuGroup.displayName = "MegaMenuGroup"

const MegaMenuGroupTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs font-medium uppercase tracking-wider text-muted-foreground", className)}
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
      "block rounded-lg px-3 py-2 text-sm",
      "transition-all duration-300",
      "hover:bg-white/[0.05] hover:text-foreground",
      "text-muted-foreground",
      className
    )}
    {...props}
  />
))
MegaMenuItem.displayName = "MegaMenuItem"

export { MegaMenu, MegaMenuGroup, MegaMenuGroupTitle, MegaMenuItem }
