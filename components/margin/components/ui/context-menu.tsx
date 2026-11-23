"use client";

import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";

import { cn } from "@/lib/utils";
import { menuItemBase, popoverSurface } from "./_shared";

/**
 * Margin ContextMenu: the shared paper panel with a light drop,
 * opened at the pointer on right-click. Rows turn field grey on focus, a
 * checked row shows an oxblood check and a picked radio row a small oxblood dot.
 */
/** The menu root; wrap the area that opens it on right-click.
 */
const ContextMenu = ContextMenuPrimitive.Root;
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
const ContextMenuGroup = ContextMenuPrimitive.Group;
const ContextMenuPortal = ContextMenuPrimitive.Portal;
const ContextMenuSub = ContextMenuPrimitive.Sub;
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const panel = cn(
  popoverSurface,
  "z-50 min-w-44 overflow-hidden p-1",
  "duration-fast ease-(--ease-out) data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
  "data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
);

const indicatorSlot = "absolute left-2.5 flex size-4 items-center justify-center";

/** A row that opens a nested menu, with a chevron at its end. */
const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    data-slot="context-menu-sub-trigger"
    className={cn(
      menuItemBase,
      "data-[state=open]:bg-(--field) data-[state=open]:text-accent-foreground",
      inset && "pl-8.5",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className="ml-auto size-3.5 text-muted-foreground" aria-hidden />
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

/** The nested panel, in the same white surface as the menu. */
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

/** The floating white panel that holds the rows. */
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

/** One action row; it turns field grey under the pointer or keyboard. */
const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    data-slot="context-menu-item"
    className={cn(menuItemBase, inset && "pl-8.5", className)}
    {...props}
  />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

/** A row that toggles on and off, with an oxblood check when on. */
const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    data-slot="context-menu-checkbox-item"
    className={cn(menuItemBase, "pl-8.5", className)}
    checked={checked}
    {...props}
  >
    <span className={indicatorSlot}>
      <ContextMenuPrimitive.ItemIndicator>
        <CheckIcon className="size-3.5 text-(--primary-text)" aria-hidden />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

/** One choice in a radio group, marked with a small oxblood dot. */
const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    data-slot="context-menu-radio-item"
    className={cn(menuItemBase, "pl-8.5", className)}
    {...props}
  >
    <span className={indicatorSlot}>
      <ContextMenuPrimitive.ItemIndicator>
        <span className="block size-1.5 rounded-full bg-primary" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

/** A small grey heading over a group of rows. */
const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    data-slot="context-menu-label"
    className={cn("px-2.5 py-1.5 text-xs font-medium text-muted-foreground", inset && "pl-8.5", className)}
    {...props}
  />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

/** A hairline between groups of rows. */
const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    data-slot="context-menu-separator"
    className={cn("-mx-1 my-1 h-[0.0625rem] bg-border", className)}
    {...props}
  />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

/** The grey key hint at the end of a row. */
const ContextMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    data-slot="context-menu-shortcut"
    className={cn("ml-auto text-xs tabular-nums text-muted-foreground", className)}
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

// Solar, the icon library this system pairs with, drawn inline
// so the installed component loads no icon at runtime:
// "solar:unread-linear" "solar:alt-arrow-right-linear"
// [BD-1029]
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 12.9L10.1429 16.5L18 7.5"/>
    </svg>
  );
}
function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5L15 12L9 19"/>
    </svg>
  );
}
