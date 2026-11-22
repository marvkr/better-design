"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { focusRing, popoverSurface } from "./_shared";
import { buttonVariants } from "./button";

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
 * Cream editorial Toast: a note on the lightest paper that slides in from
 * the edge.
 *
 * The default toast is the floating panel surface, edged by its warm
 * hairline ring. Success and danger keep that opaque paper and lay their
 * own tint over it, with their darker text. It fades and slides in over
 * 150ms, follows a swipe, and leaves to the right.
 */
const toastVariants = cva(
  [
    "group pointer-events-auto relative isolate flex w-full items-start justify-between gap-3 overflow-hidden p-4 pe-11",
    popoverSurface,
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
        default: "",
        success:
          "before:absolute before:inset-0 before:-z-10 before:bg-(--success-tint) text-(--success-text) [&_[data-slot=toast-description]]:text-current",
        destructive:
          "before:absolute before:inset-0 before:-z-10 before:bg-(--destructive-tint) text-(--destructive-text) [&_[data-slot=toast-description]]:text-current",
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

/** The one thing a toast lets you do: a small outline button. */
const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    data-slot="toast-action"
    className={cn(
      buttonVariants({ variant: "outline", size: "sm" }),
      "group-data-[variant=destructive]:border-current/30 group-data-[variant=destructive]:bg-transparent group-data-[variant=destructive]:text-current group-data-[variant=destructive]:hover:bg-current/10",
      "group-data-[variant=success]:border-current/30 group-data-[variant=success]:bg-transparent group-data-[variant=success]:text-current group-data-[variant=success]:hover:bg-current/10",
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
      "absolute end-2.5 top-2.5 inline-flex size-7 items-center justify-center rounded-md text-muted-foreground",
      "transition-colors duration-fast ease-out hover:bg-secondary hover:text-foreground",
      focusRing,
      "group-data-[variant=destructive]:text-current group-data-[variant=destructive]:hover:bg-current/10",
      "group-data-[variant=success]:text-current group-data-[variant=success]:hover:bg-current/10",
      className,
    )}
    {...props}
  >
    <Icon icon="ph:x" className="size-4" aria-hidden="true" />
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
    className={cn("text-sm font-medium leading-snug", className)}
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
