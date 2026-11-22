"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

/**
 * Ink mail Sheet: an elevated dark panel that slides in from an edge.
 *
 * The sheet attaches to its edge, so the side it meets stays square and the
 * inner corners take a 1rem radius. A translucent black scrim with a
 * light blur sits behind it. The bottom sheet carries a small grey handle.
 * The slide takes 300ms in and 200ms out, and eases out.
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
      "fixed inset-0 z-50 bg-(--scrim) backdrop-blur-sm",
      "ease-out data-[state=open]:animate-in data-[state=open]:fade-in-0 duration-base",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      className,
    )}
    {...props}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  [
    "fixed z-50 flex flex-col bg-popover text-popover-foreground shadow-(--shadow-overlay) outline-none",
    "ease-out data-[state=open]:animate-in duration-base",
    "data-[state=closed]:animate-out",
  ].join(" "),
  {
    variants: {
      side: {
        top:
          "inset-x-2 top-2 sm:inset-x-3 sm:top-3 max-h-[85dvh] rounded-xl " +
          "data-[state=open]:slide-in-from-top-[calc(100%+1rem)] data-[state=closed]:slide-out-to-top-[calc(100%+1rem)]",
        bottom:
          "inset-x-2 bottom-2 sm:inset-x-3 sm:bottom-3 max-h-[85dvh] rounded-xl " +
          "data-[state=open]:slide-in-from-bottom-[calc(100%+1rem)] data-[state=closed]:slide-out-to-bottom-[calc(100%+1rem)]",
        left:
          "inset-y-2 left-2 sm:inset-y-3 sm:left-3 h-auto w-3/4 max-w-sm rounded-xl " +
          "data-[state=open]:slide-in-from-left-[calc(100%+1rem)] data-[state=closed]:slide-out-to-left-[calc(100%+1rem)]",
        right:
          "inset-y-2 right-2 sm:inset-y-3 sm:right-3 h-auto w-3/4 max-w-sm rounded-xl " +
          "data-[state=open]:slide-in-from-right-[calc(100%+1rem)] data-[state=closed]:slide-out-to-right-[calc(100%+1rem)]",
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
          className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-(--line-strong)"
        />
      ) : null}
      {children}
      <SheetPrimitive.Close
        data-slot="sheet-close"
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon-sm" }),
          "absolute end-3 top-3",
        )}
      >
        <Icon icon="ph:x" className="size-4" aria-hidden="true" />
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
    className={cn("flex flex-col gap-1.5 px-6 pt-5 pb-3 pe-12 text-start", className)}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

/** The footer pins to the bottom of a side sheet and lines its actions up at the end. */
const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="sheet-footer"
    className={cn(
      "mt-auto flex flex-col-reverse gap-2 border-t border-border px-6 pt-4 pb-6 sm:flex-row sm:justify-end",
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
    className={cn(
      "font-sans text-lg font-medium leading-tight tracking-tight text-foreground",
      className,
    )}
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
