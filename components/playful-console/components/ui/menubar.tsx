"use client";

import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { menuItemBase, popoverSurface } from "./_shared";

/**
 * Playful console Menubar: a cream tray of menu names that each drop a
 * white card of bold, compact rows.
 *
 * The panel wears the olive hairline and a soft drop. A highlighted row takes
 * a cream wash, a checked row shows a chunky orange tick at its start, and a
 * destructive row turns red on a pale red wash. Labels are small uppercase
 * eyebrows and shortcuts are set in the mono face.
 */
/** One menu inside the bar. */
const MenubarMenu = MenubarPrimitive.Menu;
/** Groups related rows. */
const MenubarGroup = MenubarPrimitive.Group;
/** Renders the menu into the document body. */
const MenubarPortal = MenubarPrimitive.Portal;
/** A nested submenu. */
const MenubarSub = MenubarPrimitive.Sub;
/** Groups radio rows so only one is selected. */
const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

/**
 * The bar: a cream tray holding the menu names, like an app's top menu.
 */
const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    data-slot="menubar"
    className={cn(
      "flex h-10 w-fit items-center gap-1 rounded-lg border border-border bg-secondary p-1",
      className,
    )}
    {...props}
  />
));
Menubar.displayName = MenubarPrimitive.Root.displayName;

/** A menu name. The open one lifts into a white tab with a hairline. */
const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    data-slot="menubar-trigger"
    className={cn(
      "flex h-8 cursor-default select-none items-center rounded-md border border-transparent px-3 text-sm font-semibold text-(--foreground-secondary)",
      "transition-colors duration-fast ease-out",
      "hover:text-foreground data-[highlighted]:text-foreground",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
      "data-[state=open]:border-border data-[state=open]:bg-card data-[state=open]:text-foreground data-[state=open]:shadow-(--shadow-control-off)",
      "data-[disabled]:cursor-not-allowed data-[disabled]:text-(--foreground-disabled)",
      className,
    )}
    {...props}
  />
));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

const menuPanel =
  "z-50 min-w-48 max-h-(--radix-menubar-content-available-height) overflow-x-hidden overflow-y-auto p-1 " +
  "origin-(--radix-menubar-content-transform-origin) ease-out " +
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
      icon="ph:caret-right-bold"
      className="ms-auto size-3.5 text-muted-foreground rtl:rotate-180"
      aria-hidden="true"
    />
  </MenubarPrimitive.SubTrigger>
));
MenubarSubTrigger.displayName =
  MenubarPrimitive.SubTrigger.displayName;

/** The submenu panel. */
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
MenubarSubContent.displayName =
  MenubarPrimitive.SubContent.displayName;

/** The menu panel. */
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

/** One menu row. */
const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
    /** A destructive row turns red and highlights on a pale red wash. */
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

/** A row that toggles on and off, with an orange tick at its start. */
const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    data-slot="menubar-checkbox-item"
    className={cn(menuItemBase, rowIcons, "ps-8", className)}
    checked={checked}
    {...props}
  >
    <span className="pointer-events-none absolute start-2 flex size-4 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Icon icon="ph:check-bold" className="size-4 text-primary" aria-hidden="true" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName =
  MenubarPrimitive.CheckboxItem.displayName;

/** A row in a radio group, with an orange dot at its start. */
const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    data-slot="menubar-radio-item"
    className={cn(menuItemBase, rowIcons, "ps-8", className)}
    {...props}
  >
    <span className="pointer-events-none absolute start-2 flex size-4 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <span className="block size-2 rounded-full border border-(--primary-rim) bg-primary" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

/** A small uppercase eyebrow over a group of rows. */
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
      "px-2.5 py-1.5 text-xs font-bold uppercase text-muted-foreground",
      inset && "ps-8",
      className,
    )}
    {...props}
  />
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

/** A soft rule between groups of rows. */
const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    data-slot="menubar-separator"
    className={cn("-mx-1 my-1 h-px bg-(--line-soft)", className)}
    {...props}
  />
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

/** A keyboard shortcut hint at the end of a row. */
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
