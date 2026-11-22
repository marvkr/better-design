"use client";

import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { menuItemBase, popoverSurface } from "./_shared";

/**
 * Bold retail Menubar: a row of plain menu names, like a store's top bar.
 *
 * The bar has no track and no frame. Each name is medium Inter on the white
 * page; hover and the open menu put it on a soft grey pill. Each menu drops
 * the floating white panel with plain rows inside.
 */
const MenubarMenu = MenubarPrimitive.Menu;
const MenubarGroup = MenubarPrimitive.Group;
const MenubarPortal = MenubarPrimitive.Portal;
const MenubarSub = MenubarPrimitive.Sub;
const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

const menuPanel =
  "z-50 min-w-48 max-h-(--radix-menubar-content-available-height) overflow-x-hidden overflow-y-auto p-1.5 " +
  "origin-(--radix-menubar-content-transform-origin) duration-fast ease-out " +
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 " +
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95";

/** Row icons default to 1rem in the muted ink unless the caller sizes or colours them. */
const rowIcons =
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 " +
  "[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground";

/** A row that removes something: red words on a red tint, the only red in the panel. */
const destructiveRow =
  "text-(--destructive-text) focus:bg-(--destructive-tint) focus:text-(--destructive-text) " +
  "data-[highlighted]:bg-(--destructive-tint) data-[highlighted]:text-(--destructive-text) " +
  "[&_svg:not([class*='text-'])]:text-(--destructive-text)";

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    data-slot="menubar"
    className={cn("flex h-11 w-fit items-center gap-1 bg-background", className)}
    {...props}
  />
));
Menubar.displayName = MenubarPrimitive.Root.displayName;

/** A menu name. Hover and the open menu set it on the soft grey pill. */
const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    data-slot="menubar-trigger"
    className={cn(
      "flex h-9 cursor-default select-none items-center rounded-full px-4 text-sm font-medium text-foreground",
      "transition-colors duration-fast ease-out",
      "hover:bg-secondary data-[highlighted]:bg-secondary data-[state=open]:bg-secondary",
      "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "data-[disabled]:cursor-not-allowed data-[disabled]:text-(--foreground-disabled)",
      className,
    )}
    {...props}
  />
));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    data-slot="menubar-sub-trigger"
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
    <Icon
      icon="mingcute:right-line"
      className="ms-auto size-4 text-muted-foreground rtl:rotate-180"
      aria-hidden="true"
    />
  </MenubarPrimitive.SubTrigger>
));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    data-slot="menubar-sub-content"
    className={cn(popoverSurface, menuPanel, "min-w-40", className)}
    {...props}
  />
));
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref,
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        data-slot="menubar-content"
        className={cn(popoverSurface, menuPanel, className)}
        {...props}
      />
    </MenubarPrimitive.Portal>
  ),
);
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
    /** A destructive row sets its words in red on a red tint. */
    variant?: "default" | "destructive";
  }
>(({ className, inset, variant = "default", ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    data-slot="menubar-item"
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
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

/** A checked row shows a black tick at its end. */
const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    data-slot="menubar-checkbox-item"
    className={cn(menuItemBase, rowIcons, "pe-9", className)}
    checked={checked}
    {...props}
  >
    {children}
    <span className="pointer-events-none absolute end-3 flex size-4 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Icon icon="mingcute:check-line" className="size-4 text-foreground" aria-hidden="true" />
      </MenubarPrimitive.ItemIndicator>
    </span>
  </MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

/** The chosen row in a group shows a small black dot at its end. */
const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    data-slot="menubar-radio-item"
    className={cn(menuItemBase, rowIcons, "pe-9", className)}
    {...props}
  >
    {children}
    <span className="pointer-events-none absolute end-3 flex size-4 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <span className="block size-2 rounded-full bg-foreground" />
      </MenubarPrimitive.ItemIndicator>
    </span>
  </MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    data-slot="menubar-label"
    data-inset={inset ? "" : undefined}
    className={cn(
      "px-3 py-1.5 text-xs font-medium text-muted-foreground",
      inset && "ps-9",
      className,
    )}
    {...props}
  />
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    data-slot="menubar-separator"
    className={cn("-mx-1.5 my-1.5 h-px bg-border", className)}
    {...props}
  />
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    data-slot="menubar-shortcut"
    className={cn("ml-auto ps-3 text-xs text-muted-foreground", className)}
    {...props}
  />
);
MenubarShortcut.displayName = "MenubarShortcut";

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
};
