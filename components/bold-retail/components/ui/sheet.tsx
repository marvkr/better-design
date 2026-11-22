"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

/**
 * Bold retail Sheet: a square white panel that slides in from an edge, the
 * way a store opens its bag, its filters or its menu.
 *
 * Every sheet runs flush to the screen edge with square corners. The side
 * sheets are full height and up to 28rem wide; the bottom sheet carries a
 * small grey handle. The close control is the grey icon circle.
 */
const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    data-slot="sheet-overlay"
    className={cn(
      "fixed inset-0 z-50 bg-(--scrim) ease-out",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0 duration-base",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      className,
    )}
    {...props}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  [
    "fixed z-50 flex flex-col rounded-none bg-background text-foreground shadow-(--shadow-overlay) outline-none ease-out",
    "data-[state=open]:animate-in duration-base",
    "data-[state=closed]:animate-out",
  ].join(" "),
  {
    variants: {
      side: {
        top:
          "inset-x-0 top-0 max-h-[85dvh] border-b border-border " +
          "data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top",
        bottom:
          "inset-x-0 bottom-0 max-h-[85dvh] border-t border-border " +
          "data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
        left:
          "inset-y-0 left-0 h-full w-full max-w-md " +
          "data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left",
        right:
          "inset-y-0 right-0 h-full w-full max-w-md " +
          "data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

interface SheetContentProps
  extends
    React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      data-slot="sheet-content"
      data-side={side}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {side === "bottom" ? (
        <div
          aria-hidden="true"
          data-slot="sheet-handle"
          className="mx-auto mt-3 h-1 w-12 shrink-0 rounded-full bg-border"
        />
      ) : null}
      {children}
      <SheetPrimitive.Close
        data-slot="sheet-close"
        className={cn(
          buttonVariants({ variant: "secondary", size: "icon" }),
          "absolute end-4 top-4",
        )}
      >
        <Icon icon="mingcute:close-line" className="size-5" aria-hidden="true" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="sheet-header"
    className={cn("flex flex-col gap-2 p-6 pe-16 text-start", className)}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

/** The footer pins to the bottom of the sheet behind a hairline, with its pills at the end. */
const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="sheet-footer"
    className={cn(
      "mt-auto flex flex-col-reverse gap-3 border-t border-border p-6 sm:flex-row sm:justify-end",
      className,
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    data-slot="sheet-title"
    className={cn("font-sans text-2xl font-medium leading-tight text-foreground", className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    data-slot="sheet-description"
    className={cn("text-base text-muted-foreground", className)}
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
