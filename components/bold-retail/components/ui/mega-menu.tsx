import * as React from "react";

import { cn } from "@/lib/utils";
import { menuItemBase, popoverSurface } from "./_shared";

/**
 * Bold retail MegaMenu: the wide department shelf that drops under the
 * store header. Each group becomes its own equal column from sm up, headed
 * by a black medium label such as Shoes or Clothing. Links below it are
 * grey rows that turn black on a soft grey fill under the pointer.
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
      "absolute start-0 top-full z-50 mt-2 grid w-full gap-8 p-6 sm:auto-cols-fr sm:grid-flow-col",
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
      "px-3 pb-2 text-base font-medium text-foreground",
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
      "text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:text-accent-foreground",
      "[&_svg]:size-4 [&_svg]:shrink-0",
      className,
    )}
    {...props}
  />
));
MegaMenuItem.displayName = "MegaMenuItem";

export { MegaMenu, MegaMenuGroup, MegaMenuGroupTitle, MegaMenuItem };
