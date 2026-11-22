"use client";

import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { menuItemBase, popoverSurface } from "./_shared";

/**
 * Playful console ContextMenu: the right-click menu, a white card of bold,
 * compact rows that opens at the pointer.
 *
 * The panel wears the olive hairline and a soft drop. A highlighted row takes
 * a cream wash, a checked row shows a chunky orange tick at its start, and a
 * destructive row turns red on a pale red wash. Labels are small uppercase
 * eyebrows and shortcuts are set in the mono face.
 */
const ContextMenu = ContextMenuPrimitive.Root;
/** The area that opens the menu on right-click. */
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
/** Groups related rows. */
const ContextMenuGroup = ContextMenuPrimitive.Group;
/** Renders the menu into the document body. */
const ContextMenuPortal = ContextMenuPrimitive.Portal;
/** A nested submenu. */
const ContextMenuSub = ContextMenuPrimitive.Sub;
/** Groups radio rows so only one is selected. */
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const menuPanel =
  "z-50 min-w-48 max-h-(--radix-context-menu-content-available-height) overflow-x-hidden overflow-y-auto p-1 " +
  "origin-(--radix-context-menu-content-transform-origin) ease-out " +
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:duration-fast " +
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:duration-fast";

/** Icons in a row default to 1rem in the muted ink unless the caller sizes or colours them. */
const rowIcons =
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 " +
  "[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground";

const destructiveRow =
  "text-(--destructive-text) focus:bg-(--destructive-tint) focus:text-(--destructive-text) " +
  "data-[highlighted]:bg-(--destructive-tint) data-[highlighted]:text-(--destructive-text) " +
  "[&_svg:not([class*='text-'])]:text-(--destructive-text)";

/** A row that opens a submenu, with a caret at its end. */
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
      inset && "ps-8",
      className,
    )}
    {...props}
  >
    {children}
    <Icon
      icon="ph:caret-right-bold"
      className="ms-auto size-3.5 text-muted-foreground rtl:rotate-180"
      aria-hidden="true"
    />
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName =
  ContextMenuPrimitive.SubTrigger.displayName;

/** The submenu panel. */
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

/** The menu panel. */
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

/** One menu row. */
const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
    /** A destructive row turns red and highlights on a pale red wash. */
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
      inset && "ps-8",
      className,
    )}
    {...props}
  />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

/** A row that toggles on and off, with an orange tick at its start. */
const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    data-slot="context-menu-checkbox-item"
    className={cn(menuItemBase, rowIcons, "ps-8", className)}
    checked={checked}
    {...props}
  >
    <span className="pointer-events-none absolute start-2 flex size-4 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Icon icon="ph:check-bold" className="size-4 text-primary" aria-hidden="true" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName;

/** A row in a radio group, with an orange dot at its start. */
const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    data-slot="context-menu-radio-item"
    className={cn(menuItemBase, rowIcons, "ps-8", className)}
    {...props}
  >
    <span className="pointer-events-none absolute start-2 flex size-4 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <span className="block size-2 rounded-full border border-(--primary-rim) bg-primary" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

/** A small uppercase eyebrow over a group of rows. */
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
      "px-2.5 py-1.5 text-xs font-bold uppercase text-muted-foreground",
      inset && "ps-8",
      className,
    )}
    {...props}
  />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

/** A soft rule between groups of rows. */
const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    data-slot="context-menu-separator"
    className={cn("-mx-1 my-1 h-px bg-(--line-soft)", className)}
    {...props}
  />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

/** A keyboard shortcut hint at the end of a row. */
const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    data-slot="context-menu-shortcut"
    className={cn("ms-auto ps-3 font-mono text-xs text-muted-foreground", className)}
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
