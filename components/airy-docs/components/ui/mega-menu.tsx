import * as React from "react";

import { cn } from "@/lib/utils";
import { menuItemBase, popoverSurface } from "./_shared";

/**
 * Airy docs MegaMenu: a wide white shelf under the docs header, laid out like
 * a docs index.
 *
 * Each group becomes its own equal column from sm up, headed by a small
 * semibold label, the way a docs sidebar heads its sections. Links are
 * compact rows that take the pale tray colour under the pointer or focus.
 */
const MegaMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="mega-menu"
    className={cn(
      popoverSurface,
      "absolute start-0 top-full z-50 mt-1.5 grid w-full gap-6 p-4 sm:auto-cols-fr sm:grid-flow-col",
      className,
    )}
    {...props}
  />
));
MegaMenu.displayName = "MegaMenu";

const MegaMenuGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="mega-menu-group"
    className={cn("flex min-w-0 flex-col gap-0.5", className)}
    {...props}
  />
));
MegaMenuGroup.displayName = "MegaMenuGroup";

const MegaMenuGroupTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="mega-menu-group-title"
    className={cn(
      "px-2.5 pb-1.5 text-xs font-semibold text-foreground",
      className,
    )}
    {...props}
  />
));
MegaMenuGroupTitle.displayName = "MegaMenuGroupTitle";

const MegaMenuItem = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    data-slot="mega-menu-item"
    className={cn(
      menuItemBase,
      "text-(--foreground-secondary) hover:bg-accent hover:text-foreground",
      "focus-visible:ring-3 focus-visible:ring-ring",
      "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
      className,
    )}
    {...props}
  />
));
MegaMenuItem.displayName = "MegaMenuItem";

export { MegaMenu, MegaMenuGroup, MegaMenuGroupTitle, MegaMenuItem };
