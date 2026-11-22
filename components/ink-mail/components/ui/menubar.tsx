"use client";

import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { menuItemBase, popoverSurface } from "./_shared";

/**
 * Ink mail Menubar: a row of menu names on a hairline tray, like a desktop
 * app bar in a developer console.
 *
 * The tray is the elevated step with a 0.75rem corner. Its triggers sit in
 * the muted ink, and the open one takes the white wash with full ink, the
 * same mark as a selected chip. Each menu drops a panel on the elevated step,
 * lifted by a white hairline ring, with lighter highlighted rows inside.
 */
const MenubarMenu = MenubarPrimitive.Menu;
const MenubarGroup = MenubarPrimitive.Group;
const MenubarPortal = MenubarPrimitive.Portal;
const MenubarSub = MenubarPrimitive.Sub;
const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

const menuPanel =
  "z-50 min-w-48 max-h-(--radix-menubar-content-available-height) overflow-x-hidden overflow-y-auto p-1 " +
  "origin-(--radix-menubar-content-transform-origin) ease-out " +
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-98 data-[state=open]:duration-fast " +
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-98 data-[state=closed]:duration-fast";

/** Icons in a row default to 1rem in the muted ink unless the caller sizes or colours them. */
const rowIcons =
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 " +
  "[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground";

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
    className={cn(
      "flex h-10 w-fit items-center gap-0.5 rounded-lg border border-border bg-secondary p-1",
      className,
    )}
    {...props}
  />
));
Menubar.displayName = MenubarPrimitive.Root.displayName;

/** A menu name. The open one takes the white wash, like a selected chip. */
const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    data-slot="menubar-trigger"
    className={cn(
      "flex h-8 cursor-default select-none items-center rounded-md px-3 text-sm font-medium text-muted-foreground",
      "outline-none transition-colors duration-fast ease-out",
      "hover:text-foreground data-[highlighted]:text-foreground",
      "focus-visible:ring-3 focus-visible:ring-ring",
      "data-[state=open]:bg-(--wash) data-[state=open]:text-foreground",
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
      inset && "ps-8",
      className,
    )}
    {...props}
  >
    {children}
    <Icon
      icon="ph:caret-right"
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
    /** A destructive row turns red and highlights on a red tint. */
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
      inset && "ps-8",
      className,
    )}
    {...props}
  />
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    data-slot="menubar-checkbox-item"
    className={cn(menuItemBase, rowIcons, "pe-8", className)}
    checked={checked}
    {...props}
  >
    {children}
    <span className="pointer-events-none absolute end-2 flex size-4 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Icon icon="ph:check" className="size-4 text-foreground" aria-hidden="true" />
      </MenubarPrimitive.ItemIndicator>
    </span>
  </MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName =
  MenubarPrimitive.CheckboxItem.displayName;

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    data-slot="menubar-radio-item"
    className={cn(menuItemBase, rowIcons, "pe-8", className)}
    {...props}
  >
    {children}
    <span className="pointer-events-none absolute end-2 flex size-4 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <span className="block size-1.5 rounded-full bg-foreground" />
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
      "px-2.5 py-1.5 text-xs font-medium text-muted-foreground",
      inset && "ps-8",
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
    className={cn("-mx-1 my-1 h-px bg-border", className)}
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
    className={cn("ms-auto ps-3 font-mono text-xs text-muted-foreground", className)}
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
