"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

import { cn } from "@/lib/utils";
import { menuItemBase, popoverSurface } from "./_shared";

/**
 * Ink mail DropdownMenu: the elevated panel on the black page.
 *
 * The panel sits one luminance step above its surroundings, edged by a
 * translucent white ring. A highlighted row lifts one more step, icons rest in
 * the muted ink, shortcuts are set in mono, and a checked row shows its tick
 * at the end. A destructive row reads in the red status ink. The panel fades
 * and scales in over 150ms.
 */
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const menuPanel =
  "z-50 min-w-48 max-h-(--radix-dropdown-menu-content-available-height) overflow-x-hidden overflow-y-auto p-1 " +
  "origin-(--radix-dropdown-menu-content-transform-origin) duration-fast ease-out " +
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 " +
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95";

/** Icons in a row default to 1rem in the muted ink unless the caller sizes or colours them. */
const rowIcons =
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 " +
  "[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground";

const destructiveRow =
  "text-(--destructive-text) focus:bg-(--destructive-tint) focus:text-(--destructive-text) " +
  "data-[highlighted]:bg-(--destructive-tint) data-[highlighted]:text-(--destructive-text) " +
  "[&_svg:not([class*='text-'])]:text-(--destructive-text)";

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    data-slot="dropdown-menu-sub-trigger"
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
    <ChevronRightIcon
      className="ms-auto size-3.5 text-muted-foreground rtl:rotate-180"
      aria-hidden="true"
    />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    data-slot="dropdown-menu-sub-content"
    className={cn(popoverSurface, menuPanel, "min-w-40", className)}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      data-slot="dropdown-menu-content"
      className={cn(popoverSurface, menuPanel, className)}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
    /** A destructive row reads in the red status ink and highlights on its tint. */
    variant?: "default" | "destructive";
  }
>(({ className, inset, variant = "default", ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    data-slot="dropdown-menu-item"
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
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    data-slot="dropdown-menu-checkbox-item"
    className={cn(menuItemBase, rowIcons, "pe-8", className)}
    checked={checked}
    {...props}
  >
    {children}
    <span className="pointer-events-none absolute end-2 flex size-4 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon className="size-4 text-foreground" aria-hidden="true" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    data-slot="dropdown-menu-radio-item"
    className={cn(menuItemBase, rowIcons, "pe-8", className)}
    {...props}
  >
    {children}
    <span className="pointer-events-none absolute end-2 flex size-4 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <span className="block size-1.5 rounded-full bg-foreground" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    data-slot="dropdown-menu-label"
    data-inset={inset ? "" : undefined}
    className={cn(
      "px-2.5 py-1.5 text-xs font-medium text-muted-foreground",
      inset && "ps-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    data-slot="dropdown-menu-separator"
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    data-slot="dropdown-menu-shortcut"
    className={cn("ms-auto ps-3 font-mono text-xs text-muted-foreground", className)}
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

// Phosphor, the icon library this system pairs with, drawn inline
// so the installed component loads no icon at runtime:
// "ph:check" "ph:caret-right"
// [BD-1029]
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" aria-hidden="true" {...props}>
      <path fill="currentColor" d="m229.66 77.66l-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69L218.34 66.34a8 8 0 0 1 11.32 11.32"/>
    </svg>
  );
}
function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" aria-hidden="true" {...props}>
      <path fill="currentColor" d="m181.66 133.66l-80 80a8 8 0 0 1-11.32-11.32L164.69 128L90.34 53.66a8 8 0 0 1 11.32-11.32l80 80a8 8 0 0 1 0 11.32"/>
    </svg>
  );
}
