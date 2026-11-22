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
 * Airy docs Toast: a white note with a hairline ring that slides in from
 * the edge.
 *
 * The default toast is the floating panel: white, a 0.75rem corner, a
 * hairline ring and no shadow. Success and danger keep the white
 * panel and add a coloured status icon slot, so the text stays readable
 * ink. It fades and slides in over 200ms, follows a swipe, and leaves to
 * the right.
 */
const toastVariants = cva(
  [
    "group pointer-events-auto relative flex w-full items-start justify-between gap-3 overflow-hidden rounded-lg bg-popover p-4 pe-10 text-popover-foreground",
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
        default: "",
        success:
          "bg-(--success-tint) [&_[data-slot=toast-title]]:text-(--success-text)",
        destructive:
          "bg-(--destructive-tint) [&_[data-slot=toast-title]]:text-(--destructive-text)",
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

/** A small hairline pill for the one thing a toast lets you do. */
const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    data-slot="toast-action"
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-full border border-(--line-strong) bg-background px-3 text-sm font-medium text-foreground",
      "outline-none transition-colors duration-fast hover:bg-secondary",
      "focus-visible:ring-3 focus-visible:ring-ring",
      "disabled:cursor-not-allowed disabled:text-(--foreground-disabled)",
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
      "outline-none transition-colors duration-fast hover:bg-secondary hover:text-foreground",
      "focus-visible:ring-3 focus-visible:ring-ring",
      className,
    )}
    {...props}
  >
    <Icon icon="feather:x" className="size-3.5" aria-hidden="true" />
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
    className={cn("text-sm font-semibold text-foreground", className)}
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
