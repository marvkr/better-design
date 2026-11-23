"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

import { cn } from "@/lib/utils";
import { menuItemBase, popoverSurface } from "./_shared";

/**
 * Paddock DropdownMenu: a white floating panel with a 1px cool border and a
 * faint drop; rows turn cool grey on focus. A ticked row shows a slate check,
 * and a picked radio row a small slate dot.
 */
const DropdownMenu = DropdownMenuPrimitive.Root;

/** The element that opens the menu. */
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

/** Groups related rows. */
const DropdownMenuGroup = DropdownMenuPrimitive.Group;

/** Portals a menu part above the page. */
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

/** A nested submenu: wraps a sub trigger and its content. */
const DropdownMenuSub = DropdownMenuPrimitive.Sub;

/** Groups radio rows so one stays picked. */
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const panel = cn(
  popoverSurface,
  "z-50 min-w-44 overflow-hidden",
  "duration-fast ease-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
  "data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
);

const indicatorSlot = "absolute left-2.5 flex size-4 items-center justify-center";

/** A row that opens a submenu, with a chevron at its end. */
const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    data-slot="dropdown-menu-sub-trigger"
    className={cn(
      menuItemBase,
      "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-9",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className="ml-auto size-4 text-muted-foreground" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

/** The panel a submenu opens. */
const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    data-slot="dropdown-menu-sub-content"
    className={cn(panel, "origin-(--radix-dropdown-menu-content-transform-origin)", className)}
    {...props}
  />
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

/** The white menu panel, portalled above the page. */
const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      data-slot="dropdown-menu-content"
      className={cn(panel, "origin-(--radix-dropdown-menu-content-transform-origin)", className)}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

/** One action row. */
const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    data-slot="dropdown-menu-item"
    className={cn(
      menuItemBase,
      "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
      inset && "pl-9",
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

/** A row that toggles on and off, ticked with a slate check. */
const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    data-slot="dropdown-menu-checkbox-item"
    className={cn(menuItemBase, "pl-9", className)}
    checked={checked}
    {...props}
  >
    <span className={indicatorSlot}>
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon className="size-4 text-foreground" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

/** A row in a radio group, marked with a small slate dot when picked. */
const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    data-slot="dropdown-menu-radio-item"
    className={cn(menuItemBase, "pl-9", className)}
    {...props}
  >
    <span className={indicatorSlot}>
      <DropdownMenuPrimitive.ItemIndicator>
        <span className="block size-2 rounded-full bg-primary" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

/** A small muted heading over a group of rows. */
const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    data-slot="dropdown-menu-label"
    className={cn("px-2.5 pb-1 pt-1.5 text-xs font-medium text-muted-foreground", inset && "pl-9", className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

/** A 1px cool line between groups of rows. */
const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    data-slot="dropdown-menu-separator"
    className={cn("-mx-1.5 my-1.5 border-t border-border", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

/** A keyboard shortcut hint at the end of a row. */
const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    data-slot="dropdown-menu-shortcut"
    className={cn("ml-auto font-mono text-xs text-muted-foreground", className)}
    {...props}
  />
);
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};

// MingCute, the icon library this system pairs with, drawn inline
// so the installed component loads no icon at runtime:
// "mingcute:check-line" "mingcute:right-line"
// [BD-1029]
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M9.171 16.072L19.778 5.465c.409-.359 1.01-.404 1.414 0c.404.405.359 1.005 0 1.415L9.878 18.193c-.204.179-.429.293-.707.293s-.503-.114-.707-.293l-5.657-5.657c-.297-.339-.393-.8-.159-1.207c.34-.588 1.092-.629 1.574-.207Z"/>
    </svg>
  );
}
function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="m13.586 12l-4.95-4.95c-.574-.654-.22-1.707.707-1.707c.278 0 .503.114.707.293l5.657 5.657c.179.204.293.429.293.707s-.114.503-.293.707l-5.657 5.657c-.339.298-.8.394-1.207.159c-.588-.34-.629-1.092-.207-1.573Z"/>
    </svg>
  );
}
