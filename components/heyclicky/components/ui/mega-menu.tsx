import * as React from "react";

import { cn } from "@/lib/utils";
import { popoverSurface } from "./_shared";

// Heyclicky MegaMenu: a wide white shelf dropping below the nav on its own shadow.

const MegaMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      popoverSurface,
      "absolute left-0 top-full z-50 w-full p-4",
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
  <div ref={ref} className={cn("space-y-3", className)} {...props} />
));
MegaMenuGroup.displayName = "MegaMenuGroup";

const MegaMenuGroupTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-xs font-medium uppercase tracking-wider text-muted-foreground",
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
    className={cn(
      "block rounded-md px-3 py-2 text-sm",
      "text-muted-foreground transition-colors duration-base",
      "hover:bg-accent hover:text-foreground",
      className,
    )}
    {...props}
  />
));
MegaMenuItem.displayName = "MegaMenuItem";

export { MegaMenu, MegaMenuGroup, MegaMenuGroupTitle, MegaMenuItem };
