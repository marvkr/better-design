"use client";

import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "@/lib/utils";
import { Button } from "./button";

/**
 * Paddock AlertDialog: the same white window as Dialog, narrower and with no
 * close button, so the person must answer. Confirm is the solid teal
 * primary and cancel is the white bordered button beside it.
 */
const AlertDialog = AlertDialogPrimitive.Root;

/** The element that opens the alert dialog. */
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

/** Portals the alert dialog above the page. */
const AlertDialogPortal = AlertDialogPrimitive.Portal;

/** The light slate scrim behind the alert dialog. */
const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    data-slot="alert-dialog-overlay"
    className={cn(
      "fixed inset-0 z-50 bg-(--scrim)",
      "duration-base data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

/** The centred white window that holds the question. */
const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      data-slot="alert-dialog-content"
      className={cn(
        "fixed inset-x-4 top-1/2 z-50 mx-auto grid max-w-md -translate-y-1/2 gap-5 rounded-3xl p-6",
        "bg-card text-card-foreground shadow-(--shadow-overlay)",
        "outline-none duration-base ease-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

/** The title and description block. */
const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="alert-dialog-header"
    className={cn("flex flex-col gap-1.5 text-left", className)}
    {...props}
  />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

/** The answer row: stacked on a phone, right-aligned from small screens up. */
const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="alert-dialog-footer"
    className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

/** The question, as the accessible title. */
const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    data-slot="alert-dialog-title"
    className={cn("text-lg font-semibold tracking-tight text-foreground", className)}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

/** What happens if the person confirms, in muted type. */
const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    data-slot="alert-dialog-description"
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

/** The confirm action, rendered as the teal primary unless `asChild` is set. */
const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, children, asChild, ...props }, ref) =>
  asChild ? (
    <AlertDialogPrimitive.Action ref={ref} asChild className={className} {...props}>
      {children}
    </AlertDialogPrimitive.Action>
  ) : (
    <AlertDialogPrimitive.Action ref={ref} asChild {...props}>
      <Button className={className}>{children}</Button>
    </AlertDialogPrimitive.Action>
  ),
);
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

/** The cancel action, rendered as the white bordered button unless `asChild` is set. */
const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, children, asChild, ...props }, ref) =>
  asChild ? (
    <AlertDialogPrimitive.Cancel ref={ref} asChild className={className} {...props}>
      {children}
    </AlertDialogPrimitive.Cancel>
  ) : (
    <AlertDialogPrimitive.Cancel ref={ref} asChild {...props}>
      <Button variant="secondary" className={className}>
        {children}
      </Button>
    </AlertDialogPrimitive.Cancel>
  ),
);
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
