"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

/**
 * Playful console Sheet: a white panel that slides in from one edge.
 *
 * Side sheets run the full height with a hairline on their inner edge, like
 * a docked app panel. Top and bottom sheets run edge to edge and round only
 * their inner corners; the bottom sheet carries a small olive grab bar.
 */
const Sheet = SheetPrimitive.Root;
/** Opens the sheet. */
const SheetTrigger = SheetPrimitive.Trigger;
/** Closes the sheet from any element inside it. */
const SheetClose = SheetPrimitive.Close;
/** Renders the sheet into the document body. */
const SheetPortal = SheetPrimitive.Portal;

/** The scrim behind the sheet. */
const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    data-slot="sheet-overlay"
    className={cn(
      "fixed inset-0 z-50 bg-(--scrim)",
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
    "fixed z-50 flex flex-col border-border bg-card text-card-foreground shadow-(--shadow-overlay) outline-none",
    "ease-out data-[state=open]:animate-in duration-base",
    "data-[state=closed]:animate-out",
  ].join(" "),
  {
    variants: {
      side: {
        top:
          "inset-x-2 top-2 sm:inset-x-3 sm:top-3 max-h-[85dvh] rounded-xl border " +
          "data-[state=open]:slide-in-from-top-[calc(100%+1rem)] data-[state=closed]:slide-out-to-top-[calc(100%+1rem)]",
        bottom:
          "inset-x-2 bottom-2 sm:inset-x-3 sm:bottom-3 max-h-[85dvh] rounded-xl border " +
          "data-[state=open]:slide-in-from-bottom-[calc(100%+1rem)] data-[state=closed]:slide-out-to-bottom-[calc(100%+1rem)]",
        left:
          "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r " +
          "data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left",
        right:
          "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l " +
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

/** The sheet panel, docked to the chosen side. */
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
          className="mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-(--line-strong)"
        />
      ) : null}
      {children}
      <SheetPrimitive.Close
        data-slot="sheet-close"
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon-sm" }),
          "absolute end-3 top-3 text-muted-foreground hover:text-foreground",
        )}
      >
        <Icon icon="ph:x-bold" className="size-4" aria-hidden="true" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

/** Holds the title and description, clear of the close square. */
const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="sheet-header"
    className={cn("flex flex-col gap-1 border-b border-(--line-soft) px-5 pt-5 pb-4 pe-12 text-start", className)}
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
      "mt-auto flex flex-col-reverse gap-3 border-t border-(--line-soft) px-5 pt-4 pb-5 sm:flex-row sm:justify-end",
      className,
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

/** The sheet title. */
const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    data-slot="sheet-title"
    className={cn("text-xl font-extrabold leading-tight tracking-tight text-foreground", className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

/** The supporting line under the title. */
const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    data-slot="sheet-description"
    className={cn("text-sm text-(--foreground-secondary)", className)}
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
