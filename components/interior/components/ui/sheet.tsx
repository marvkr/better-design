"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * Interior Sheet — a panel slid in from an edge, carried by the modal float
 * shadow. Only the corners that face the page are rounded, at the overlay
 * panel's 14px, and the edge against the viewport stays square.
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
    className={cn(
      "fixed inset-0 z-50 bg-foreground/20",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "duration-base",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  [
    "fixed z-50 bg-card text-card-foreground p-6",
    "shadow-[var(--shadow-float-modal)]",
    "transition ease-in-out duration-base",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
  ].join(" "),
  {
    variants: {
      side: {
        top: "inset-x-2 top-2 sm:inset-x-3 sm:top-3 rounded-[0.875rem] data-[state=closed]:slide-out-to-top-[calc(100%+1rem)] data-[state=open]:slide-in-from-top-[calc(100%+1rem)]",
        bottom:
          "inset-x-2 bottom-2 sm:inset-x-3 sm:bottom-3 rounded-[0.875rem] data-[state=closed]:slide-out-to-bottom-[calc(100%+1rem)] data-[state=open]:slide-in-from-bottom-[calc(100%+1rem)]",
        left: "inset-y-2 left-2 sm:inset-y-3 sm:left-3 h-auto w-3/4 rounded-[0.875rem] sm:max-w-sm data-[state=closed]:slide-out-to-left-[calc(100%+1rem)] data-[state=open]:slide-in-from-left-[calc(100%+1rem)]",
        right:
          "inset-y-2 right-2 sm:inset-y-3 sm:right-3 h-auto w-3/4 rounded-[0.875rem] sm:max-w-sm data-[state=closed]:slide-out-to-right-[calc(100%+1rem)] data-[state=open]:slide-in-from-right-[calc(100%+1rem)]",
      },
    },
    defaultVariants: { side: "right" },
  },
);

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> &
    VariantProps<typeof sheetVariants>
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close
        className={cn(
          "absolute right-3.5 top-3.5 inline-flex size-7 items-center justify-center rounded-[0.4375rem]",
          "text-muted-foreground",
          "transition-[background-color,color,box-shadow] duration-fast",
          "hover:bg-secondary hover:text-foreground",
          "focus-visible:outline-none focus-visible:bg-ring/[0.06] focus-visible:shadow-[inset_0_0_0_0.0625rem_var(--ring)]",
        )}
      >
        <X className="size-4" strokeWidth={1.5} />
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
  <div className={cn("flex flex-col gap-1.5", className)} {...props} />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
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
    className={cn(
      "text-[0.9375rem] font-medium leading-snug tracking-[-0.02em] text-foreground",
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
    className={cn(
      "text-[0.8125rem] leading-relaxed text-muted-foreground",
      className,
    )}
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
