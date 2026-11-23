"use client";

import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";

import { cn } from "@/lib/utils";
import { menuItemBase, popoverSurface } from "./_shared";

/**
 * Firefly ContextMenu: the right-click menu, opened where the pointer is.
 *
 * It is the same raised white panel as the dropdown, with a 1rem corner, a
 * soft far shadow and no border, and it grows out of the pointer position.
 * Highlighted rows take a warm surface, a checked row shows its tick at the
 * end, and a destructive row turns red on a pale red tint.
 */
const ContextMenu = ContextMenuPrimitive.Root;
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
const ContextMenuGroup = ContextMenuPrimitive.Group;
const ContextMenuPortal = ContextMenuPrimitive.Portal;
const ContextMenuSub = ContextMenuPrimitive.Sub;
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const menuPanel =
  "z-50 min-w-48 max-h-(--radix-context-menu-content-available-height) overflow-x-hidden overflow-y-auto p-1 " +
  "origin-(--radix-context-menu-content-transform-origin) ease-out " +
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-97 data-[state=open]:duration-base " +
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-97 data-[state=closed]:duration-fast";

/** Icons in a row default to 1rem in the muted ink unless the caller sizes or colours them. */
const rowIcons =
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 " +
  "[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground";

const destructiveRow =
  "text-(--destructive-text) focus:bg-(--destructive-tint) focus:text-(--destructive-text) " +
  "data-[highlighted]:bg-(--destructive-tint) data-[highlighted]:text-(--destructive-text) " +
  "[&_svg:not([class*='text-'])]:text-(--destructive-text)";

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    data-slot="context-menu-sub-trigger"
    data-inset={inset ? "" : undefined}
    className={cn(
      menuItemBase,
      rowIcons,
      "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "ps-9",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon
      className="ms-auto size-4 text-muted-foreground rtl:rotate-180"
      aria-hidden="true"
    />
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName =
  ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    data-slot="context-menu-sub-content"
    className={cn(popoverSurface, menuPanel, "min-w-40", className)}
    {...props}
  />
));
ContextMenuSubContent.displayName =
  ContextMenuPrimitive.SubContent.displayName;

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      data-slot="context-menu-content"
      className={cn(popoverSurface, menuPanel, className)}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
    /** A destructive row turns red and highlights on a pale red tint. */
    variant?: "default" | "destructive";
  }
>(({ className, inset, variant = "default", ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    data-slot="context-menu-item"
    data-inset={inset ? "" : undefined}
    data-variant={variant}
    className={cn(
      menuItemBase,
      rowIcons,
      variant === "destructive" && destructiveRow,
      inset && "ps-9",
      className,
    )}
    {...props}
  />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    data-slot="context-menu-checkbox-item"
    className={cn(menuItemBase, rowIcons, "pe-8", className)}
    checked={checked}
    {...props}
  >
    {children}
    <span className="pointer-events-none absolute end-2 flex size-4 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <CheckIcon className="size-4 text-foreground" aria-hidden="true" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    data-slot="context-menu-radio-item"
    className={cn(menuItemBase, rowIcons, "pe-8", className)}
    {...props}
  >
    {children}
    <span className="pointer-events-none absolute end-2 flex size-4 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <span className="block size-2 rounded-full bg-foreground" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    data-slot="context-menu-label"
    data-inset={inset ? "" : undefined}
    className={cn(
      "px-3 py-1.5 text-xs font-medium text-muted-foreground",
      inset && "ps-9",
      className,
    )}
    {...props}
  />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    data-slot="context-menu-separator"
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    data-slot="context-menu-shortcut"
    className={cn("ms-auto ps-3 text-xs text-muted-foreground", className)}
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

// Carbon Icons, the icon library this system pairs with, drawn inline
// so the installed component loads no icon at runtime:
// "carbon:checkmark" "carbon:chevron-right"
// One unit of stroke keeps the thin Carbon tick readable at small sizes.
// [BD-1029]
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" d="m13 24l-9-9l1.414-1.414L13 21.171L26.586 7.586L28 9z"/>
    </svg>
  );
}
function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M22 16L12 26l-1.4-1.4l8.6-8.6l-8.6-8.6L12 6z"/>
    </svg>
  );
}
