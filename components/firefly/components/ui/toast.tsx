"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

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
      "fixed inset-x-0 top-0 z-100 flex max-h-screen w-full flex-col-reverse gap-2 p-4 outline-none",
      "sm:inset-x-auto sm:top-auto sm:end-0 sm:bottom-0 sm:max-w-sm sm:flex-col",
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

/**
 * Firefly Toast: a raised white panel that slides in from the edge.
 *
 * The default toast is the floating panel surface: white, a 1rem corner,
 * the soft far shadow and no border. Danger and success swap the white for
 * their tint and their darker text. It fades and slides in over 200ms,
 * follows a swipe, and leaves to the right.
 */
const toastVariants = cva(
  [
    "group pointer-events-auto relative flex w-full items-start justify-between gap-3 overflow-hidden rounded-xl p-4 pe-11",
    "shadow-(--shadow-menu)",
    "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-2 sm:data-[state=open]:slide-in-from-bottom-2",
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-right-full",
    "duration-base ease-out",
    "data-[swipe=move]:translate-x-(--radix-toast-swipe-move-x) data-[swipe=move]:transition-none",
    "data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform",
    "data-[swipe=end]:translate-x-(--radix-toast-swipe-end-x) data-[swipe=end]:animate-out",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-popover text-popover-foreground",
        success:
          "bg-(--success-tint) text-(--success-text) [&_[data-slot=toast-description]]:text-current",
        destructive:
          "bg-(--destructive-tint) text-(--destructive-text) [&_[data-slot=toast-description]]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

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

/** A small outlined pill for the one thing a toast lets you do. */
const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    data-slot="toast-action"
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-full border border-(--line-strong) bg-transparent px-3 text-sm font-medium",
      "transition-colors duration-fast ease-out hover:bg-muted",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
      "disabled:cursor-not-allowed disabled:text-(--foreground-disabled)",
      "group-data-[variant=destructive]:border-current/30 group-data-[variant=destructive]:hover:bg-current/10",
      "group-data-[variant=success]:border-current/30 group-data-[variant=success]:hover:bg-current/10",
      className,
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    data-slot="toast-close"
    aria-label="Close"
    className={cn(
      "absolute end-2 top-2 inline-flex size-7 items-center justify-center rounded-full text-muted-foreground",
      "transition-colors duration-fast ease-out hover:bg-secondary hover:text-foreground",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
      "group-data-[variant=destructive]:text-current group-data-[variant=destructive]:hover:bg-current/10",
      "group-data-[variant=success]:text-current group-data-[variant=success]:hover:bg-current/10",
      className,
    )}
    {...props}
  >
    <Icon icon="carbon:close" className="size-4" aria-hidden="true" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    data-slot="toast-title"
    className={cn("text-sm font-semibold leading-snug", className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

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

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;
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
