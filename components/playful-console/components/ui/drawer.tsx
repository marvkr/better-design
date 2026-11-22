"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils";

/**
 * Playful console Drawer: a bottom sheet you can pull down to close.
 *
 * A white card runs edge to edge with the dialog corner on its top edge, the
 * olive hairline along that edge and a chunky grab bar. Its actions stack
 * full width so each key is easy to reach with a thumb.
 */
const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
Drawer.displayName = "Drawer";

/** Opens the drawer. */
const DrawerTrigger = DrawerPrimitive.Trigger;
/** Renders the drawer into the document body. */
const DrawerPortal = DrawerPrimitive.Portal;
/** Closes the drawer from any element inside it. */
const DrawerClose = DrawerPrimitive.Close;

/** The scrim. The drawer library fades it with the drag, so it needs no animation classes. */
const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    data-slot="drawer-overlay"
    className={cn("fixed inset-0 z-50 bg-(--scrim)", className)}
    {...props}
  />
));
DrawerOverlay.displayName = "DrawerOverlay";

/** The drawer panel with its grab bar. */
const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      data-slot="drawer-content"
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto max-h-[85dvh] flex-col",
        "rounded-t-xl border-t border-border bg-card text-card-foreground shadow-(--shadow-overlay) outline-none",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden="true"
        data-slot="drawer-handle"
        className="mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-(--line-strong)"
      />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

/** Holds the title and description. */
const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="drawer-header"
    className={cn(
      "flex flex-col gap-1 px-5 pt-4 pb-3 text-center sm:text-start",
      className,
    )}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";

/** Holds the full-width keys at the bottom. */
const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="drawer-footer"
    className={cn("mt-auto flex flex-col gap-3 px-5 pt-3 pb-6", className)}
    {...props}
  />
);
DrawerFooter.displayName = "DrawerFooter";

/** The drawer title. */
const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    data-slot="drawer-title"
    className={cn("text-xl font-extrabold leading-tight tracking-tight text-foreground", className)}
    {...props}
  />
));
DrawerTitle.displayName = "DrawerTitle";

/** The supporting line under the title. */
const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    data-slot="drawer-description"
    className={cn("text-sm text-(--foreground-secondary)", className)}
    {...props}
  />
));
DrawerDescription.displayName = "DrawerDescription";

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
