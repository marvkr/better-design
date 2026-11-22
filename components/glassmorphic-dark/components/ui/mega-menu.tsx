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
      "rounded-xl border border-white/10",
      "backdrop-blur-3xl backdrop-saturate-200 bg-zinc-900/80 supports-[backdrop-filter]:bg-zinc-900/45",
      "shadow-[0_0.5rem_2rem_oklch(0_0_0/0.5),inset_0_0_0.5rem_oklch(1_0_0/0.06)]",
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
      "transition-all duration-base",
      "hover:bg-white/[0.06] hover:text-foreground",
      "text-muted-foreground",
      className
    )}
    {...props}
  />
))
MegaMenuItem.displayName = "MegaMenuItem"

export { MegaMenu, MegaMenuGroup, MegaMenuGroupTitle, MegaMenuItem }
