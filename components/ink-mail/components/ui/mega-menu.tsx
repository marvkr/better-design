import * as React from "react";

import { cn } from "@/lib/utils";
import { menuItemBase, popoverSurface } from "./_shared";

/**
 * Ink mail MegaMenu: a wide panel on the elevated step under the site
 * navigation, lifted off the black page by a white hairline ring.
 *
 * Each group becomes its own equal column from sm up, headed by a small
 * muted label. Links are quiet rows in the secondary ink that step up one
 * luminance level under the pointer or keyboard focus.
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
      "absolute start-0 top-full z-50 mt-2 grid w-full gap-6 p-4 sm:auto-cols-fr sm:grid-flow-col",
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
      "px-2.5 pb-1.5 text-xs font-medium text-muted-foreground",
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
