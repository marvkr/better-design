"use client";

import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { popoverSurface } from "./_shared";

/**
 * Playful console NavigationMenu: the top bar of a developer-tools site.
 *
 * Each top-level item is a bold label that takes a cream wash under the
 * pointer, and lifts into a white tab with a hairline while its panel is
 * open. The panels share one white card that resizes as you move between
 * items while the content slides across.
 */
const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    data-slot="navigation-menu"
    className={cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      className,
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

/** The row of top-level items. */
const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    data-slot="navigation-menu-list"
    className={cn(
      "group flex flex-1 list-none items-center justify-center gap-0.5",
      className,
    )}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

/** One top-level item. */
const NavigationMenuItem = NavigationMenuPrimitive.Item;

/** The look of a top-level item. Also use it on a plain link that sits in the same row. */
const navigationMenuTriggerStyle = cva(
  [
    "group inline-flex h-9 w-max items-center justify-center gap-1 rounded-md border border-transparent px-3 text-sm font-semibold text-foreground",
    "transition-colors duration-fast ease-out",
    "hover:bg-secondary",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "data-[state=open]:border-border data-[state=open]:bg-card data-[active]:text-primary",
    "disabled:cursor-not-allowed disabled:text-(--foreground-disabled) disabled:hover:bg-transparent",
  ].join(" "),
);

/** A top-level item that opens a panel, with a caret that flips when open. */
const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    data-slot="navigation-menu-trigger"
    className={cn(navigationMenuTriggerStyle(), className)}
    {...props}
  >
    {children}
    <Icon
      icon="ph:caret-down-bold"
      className="size-3 text-muted-foreground transition-transform duration-fast ease-out group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

/** The content of one panel; it slides in from the side you moved from. */
const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    data-slot="navigation-menu-content"
    className={cn(
      "left-0 top-0 w-full p-2 md:absolute md:w-auto",
      "duration-fast ease-out",
      "data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out",
      "data-[motion=from-end]:slide-in-from-right-12 data-[motion=from-start]:slide-in-from-left-12",
      "data-[motion=to-end]:slide-out-to-right-12 data-[motion=to-start]:slide-out-to-left-12",
      className,
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

/** A link inside a panel: a block that takes a cream wash under the pointer. */
const NavigationMenuLink = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Link>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Link
    ref={ref}
    data-slot="navigation-menu-link"
    className={cn(
      "block rounded-md p-3 text-sm font-medium text-foreground outline-none",
      "transition-colors duration-fast ease-out",
      "hover:bg-accent focus-visible:bg-accent data-[active]:bg-(--primary-wash)",
      className,
    )}
    {...props}
  />
));
NavigationMenuLink.displayName = NavigationMenuPrimitive.Link.displayName;

/** The shared white card the panels render into. */
const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className="absolute left-0 top-full flex justify-center">
    <NavigationMenuPrimitive.Viewport
      ref={ref}
      data-slot="navigation-menu-viewport"
      className={cn(
        popoverSurface,
        "relative mt-2 h-(--radix-navigation-menu-viewport-height) w-full origin-top overflow-hidden",
        "md:w-(--radix-navigation-menu-viewport-width)",
        "transition-[width,height] duration-fast ease-out",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:duration-fast",
        className,
      )}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

/** A small orange notch under the active trigger that points at the panel. */
const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    data-slot="navigation-menu-indicator"
    className={cn(
      "top-full z-1 flex h-1.5 items-end justify-center overflow-hidden",
      "duration-fast ease-out data-[state=visible]:animate-in data-[state=visible]:fade-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out",
      className,
    )}
    {...props}
  >
    <div className="h-1 w-6 rounded-full bg-primary" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
