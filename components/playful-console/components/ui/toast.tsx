"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { pressOutline } from "./_shared";

/** Provides the toast queue to its children. */
const ToastProvider = ToastPrimitives.Provider;

/** Where toasts stack: the top on a phone, the bottom right from `sm` up. */
const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    data-slot="toast-viewport"
    className={cn(
      "fixed inset-x-0 top-0 z-100 flex max-h-screen w-full flex-col-reverse gap-2.5 p-4 outline-none",
      "sm:inset-x-auto sm:top-auto sm:end-0 sm:bottom-0 sm:max-w-sm sm:flex-col",
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

/**
 * Playful console Toast: a white card that pops in from the edge.
 *
 * The default toast is the menu panel: white, the olive hairline, the card
 * corner and a soft drop. Success and danger swap the white for their tint,
 * their edge and their deeper text. It fades and slides in over 150ms,
 * follows a swipe, and leaves to the right.
 */
const toastVariants = cva(
  [
    "group pointer-events-auto relative flex w-full items-start justify-between gap-3 overflow-hidden rounded-lg border p-4 pe-11",
    "shadow-(--shadow-menu)",
    "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-2 sm:data-[state=open]:slide-in-from-bottom-2",
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-right-full",
    "duration-fast ease-out",
    "data-[swipe=move]:translate-x-(--radix-toast-swipe-move-x) data-[swipe=move]:transition-none",
    "data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform",
    "data-[swipe=end]:translate-x-(--radix-toast-swipe-end-x) data-[swipe=end]:animate-out",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "border-border bg-popover text-popover-foreground",
        success:
          "border-(--success)/40 bg-(--success-tint) text-(--success-text) [&_[data-slot=toast-description]]:text-current",
        destructive:
          "border-(--destructive)/40 bg-(--destructive-tint) text-(--destructive-text) [&_[data-slot=toast-description]]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/** One toast: a white card, or a success or danger band. */
const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => (
  <ToastPrimitives.Root
    ref={ref}
    data-slot="toast"
    data-variant={variant ?? "default"}
    className={cn(toastVariants({ variant }), className)}
    {...props}
  />
));
Toast.displayName = ToastPrimitives.Root.displayName;

/** A small white key for the one thing a toast lets you do. */
const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    data-slot="toast-action"
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-[0.5rem] px-3 text-[0.8125rem] font-bold",
      pressOutline,
      "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring",
      "disabled:cursor-not-allowed disabled:translate-y-0 disabled:text-(--foreground-disabled) disabled:shadow-none",
      className,
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

/** The close control in the top corner. */
const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    data-slot="toast-close"
    aria-label="Close"
    className={cn(
      "absolute end-2 top-2 inline-flex size-7 items-center justify-center rounded-md text-muted-foreground",
      "transition-colors duration-fast ease-out hover:bg-secondary hover:text-foreground",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
      "group-data-[variant=destructive]:text-current group-data-[variant=destructive]:hover:bg-current/10",
      "group-data-[variant=success]:text-current group-data-[variant=success]:hover:bg-current/10",
      className,
    )}
    {...props}
  >
    <Icon icon="ph:x-bold" className="size-3.5" aria-hidden="true" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

/** The bold headline of a toast. */
const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    data-slot="toast-title"
    className={cn("text-sm font-bold leading-snug", className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

/** The supporting sentence under the title. */
const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    data-slot="toast-description"
    className={cn("text-sm text-(--foreground-secondary)", className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

/** Props a Toast accepts. */
type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;
/** An action element passed to `toast({ action })`. */
type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
