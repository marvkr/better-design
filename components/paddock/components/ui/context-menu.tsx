"use client";

import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";

import { cn } from "@/lib/utils";
import { menuItemBase, popoverSurface } from "./_shared";

/**
 * Paddock ContextMenu: the white menu panel, opened at the pointer on
 * right-click. Rows turn light grey on focus; a ticked row shows a dark
 * check, and a picked radio row a small dark dot.
 */
const ContextMenu = ContextMenuPrimitive.Root;

/** The area that opens the menu on right-click or long-press. */
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

/** Groups related rows. */
const ContextMenuGroup = ContextMenuPrimitive.Group;

/** Portals a menu part above the page. */
const ContextMenuPortal = ContextMenuPrimitive.Portal;

/** A nested submenu: wraps a sub trigger and its content. */
const ContextMenuSub = ContextMenuPrimitive.Sub;

/** Groups radio rows so one stays picked. */
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const panel = cn(
  popoverSurface,
  "z-50 min-w-44 overflow-hidden",
  "duration-fast ease-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
  "data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
);

const indicatorSlot = "absolute left-2.5 flex size-4 items-center justify-center";

/** A row that opens a submenu, with a chevron at its end. */
const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    data-slot="context-menu-sub-trigger"
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
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

/** The panel a submenu opens. */
const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    data-slot="context-menu-sub-content"
    className={cn(panel, "origin-(--radix-context-menu-content-transform-origin)", className)}
    {...props}
  />
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

/** The white menu panel, portalled above the page. */
const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      data-slot="context-menu-content"
      className={cn(panel, "origin-(--radix-context-menu-content-transform-origin)", className)}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

/** One action row. */
const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    data-slot="context-menu-item"
    className={cn(
      menuItemBase,
      "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
      inset && "pl-9",
      className,
    )}
    {...props}
  />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

/** A row that toggles on and off, ticked with a dark check. */
const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    data-slot="context-menu-checkbox-item"
    className={cn(menuItemBase, "pl-9", className)}
    checked={checked}
    {...props}
  >
    <span className={indicatorSlot}>
      <ContextMenuPrimitive.ItemIndicator>
        <CheckIcon className="size-4 text-foreground" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

/** A row in a radio group, marked with a small dark dot when picked. */
const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    data-slot="context-menu-radio-item"
    className={cn(menuItemBase, "pl-9", className)}
    {...props}
  >
    <span className={indicatorSlot}>
      <ContextMenuPrimitive.ItemIndicator>
        <span className="block size-2 rounded-full bg-primary" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

/** A small muted heading over a group of rows. */
const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    data-slot="context-menu-label"
    className={cn("px-2.5 pb-1 pt-1.5 text-xs font-medium text-muted-foreground", inset && "pl-9", className)}
    {...props}
  />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

/** A 1px line between groups of rows. */
const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    data-slot="context-menu-separator"
    className={cn("-mx-1.5 my-1.5 border-t border-border", className)}
    {...props}
  />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

/** A keyboard shortcut hint at the end of a row. */
const ContextMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    data-slot="context-menu-shortcut"
    className={cn("ml-auto font-mono text-xs text-muted-foreground", className)}
    {...props}
  />
);
ContextMenuShortcut.displayName = "ContextMenuShortcut";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
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
