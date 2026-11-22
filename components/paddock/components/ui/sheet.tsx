"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { focusRing } from "./_shared";

/**
 * Paddock Sheet: the white window sliding in from an edge. The corners that
 * face the page take the 1.5rem window radius; the edge it enters from
 * stays square against the viewport.
 */
const Sheet = SheetPrimitive.Root;

/** The element that opens the sheet. */
const SheetTrigger = SheetPrimitive.Trigger;

/** Any element that closes the sheet. */
const SheetClose = SheetPrimitive.Close;

/** Portals the sheet above the page. */
const SheetPortal = SheetPrimitive.Portal;

/** The light slate scrim behind the sheet. */
const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    data-slot="sheet-overlay"
    className={cn(
      "fixed inset-0 z-50 bg-(--scrim)",
      "duration-base data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  [
    "fixed z-50 flex flex-col gap-5 p-6 outline-none",
    "bg-card text-card-foreground shadow-(--shadow-overlay)",
    "duration-slow ease-out data-[state=open]:animate-in data-[state=closed]:animate-out",
  ].join(" "),
  {
    variants: {
      side: {
        top: "inset-x-2 top-2 sm:inset-x-3 sm:top-3 rounded-3xl data-[state=closed]:slide-out-to-top-[calc(100%+1rem)] data-[state=open]:slide-in-from-top-[calc(100%+1rem)]",
        bottom:
          "inset-x-2 bottom-2 sm:inset-x-3 sm:bottom-3 rounded-3xl data-[state=closed]:slide-out-to-bottom-[calc(100%+1rem)] data-[state=open]:slide-in-from-bottom-[calc(100%+1rem)]",
        left: "inset-y-2 left-2 sm:inset-y-3 sm:left-3 h-auto w-3/4 rounded-3xl data-[state=closed]:slide-out-to-left-[calc(100%+1rem)] data-[state=open]:slide-in-from-left-[calc(100%+1rem)] sm:max-w-sm",
        right:
          "inset-y-2 right-2 sm:inset-y-3 sm:right-3 h-auto w-3/4 rounded-3xl data-[state=closed]:slide-out-to-right-[calc(100%+1rem)] data-[state=open]:slide-in-from-right-[calc(100%+1rem)] sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

/** The sliding white panel, with a round close button in its corner. */
const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      data-slot="sheet-content"
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close
        data-slot="sheet-close"
        className={cn(
          "absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-md text-muted-foreground",
          "transition-colors duration-fast hover:bg-accent hover:text-foreground",
          focusRing,
          "disabled:pointer-events-none",
        )}
      >
        <Icon icon="mingcute:close-line" className="size-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

/** The title and description block at the top of a sheet. */
const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="sheet-header"
    className={cn("flex flex-col gap-1.5 pr-8 text-left", className)}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

/** The action row, pushed to the bottom of the sheet. */
const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="sheet-footer"
    className={cn("mt-auto flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

/** The sheet's accessible title. */
const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    data-slot="sheet-title"
    className={cn("text-lg font-semibold tracking-tight text-foreground", className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

/** The sheet's accessible description, in muted type. */
const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    data-slot="sheet-description"
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
