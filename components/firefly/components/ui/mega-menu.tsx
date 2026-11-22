import * as React from "react";

import { cn } from "@/lib/utils";
import { menuItemBase, popoverSurface } from "./_shared";

/**
 * Firefly MegaMenu: a wide raised white shelf under the site navigation.
 *
 * The shelf has a 1rem corner, a soft far shadow and no border. Each group
 * becomes its own equal column from sm up, headed by a small muted label in
 * sentence case. Links are quiet rows that take a warm surface under the
 * pointer or keyboard focus.
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
      "absolute start-0 top-full z-50 mt-2 grid w-full gap-6 p-5 sm:auto-cols-fr sm:grid-flow-col",
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
      "px-3 pb-1.5 text-xs font-medium text-muted-foreground",
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
      "text-foreground hover:bg-accent hover:text-accent-foreground",
      "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
      className,
    )}
    {...props}
  />
));
MegaMenuItem.displayName = "MegaMenuItem";

export { MegaMenu, MegaMenuGroup, MegaMenuGroupTitle, MegaMenuItem };
