"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

/*
 * Bevel Toast.
 *
 * A toast is the card surface at the 20px card radius, lifted one step to
 * var(--shadow-lg) because it floats over the screen it reports on. There is
 * no border and no blur: the ring inside the shadow already separates it from
 * the page. The destructive toast swaps the card for the destructive gradient,
 * the same fill the destructive Button uses, so the two read as one material.
 * The action and the close button pick their treatment from that surface
 * through the `destructive` marker class on the root.
 */

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2.5 p-4",
      "sm:right-0 sm:bottom-0 sm:top-auto sm:flex-col md:max-w-[26.25rem]",
      className,
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  [
    "group pointer-events-auto relative flex w-full items-center justify-between gap-3",
    "overflow-hidden rounded-[1.25rem] p-[1.125rem] pr-10",
    "transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none",
    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out",
    "data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full",
    "data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground [box-shadow:var(--shadow-lg)]",
        destructive: [
          "destructive text-destructive-foreground",
          "bg-[linear-gradient(180deg,var(--destructive-from)_0%,var(--destructive-to)_100%)]",
          "[box-shadow:var(--shadow-destructive)]",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => (
  <ToastPrimitives.Root
    ref={ref}
    className={cn(toastVariants({ variant }), className)}
    {...props}
  />
))
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-9 shrink-0 items-center justify-center rounded-[0.625rem] px-3.5",
      "bg-card text-foreground",
      "text-[0.8125rem] font-semibold tracking-[-0.0125rem]",
      "[box-shadow:var(--shadow-button)]",
      "transition-[box-shadow,transform] duration-fast ease-out",
      "hover:[box-shadow:var(--shadow-button-hover)] active:translate-y-px",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:pointer-events-none disabled:opacity-50",
      "group-[.destructive]:bg-[oklch(1_0_0_/_0.16)] group-[.destructive]:text-destructive-foreground group-[.destructive]:[box-shadow:inset_0_0_0_0.0625rem_oklch(1_0_0_/_0.28)] group-[.destructive]:hover:bg-[oklch(1_0_0_/_0.24)]",
      className,
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    toast-close=""
    className={cn(
      "absolute right-3 top-3 rounded-full p-1 text-muted-foreground opacity-0",
      "transition-[opacity,background-color,color] duration-fast ease-out",
      "hover:bg-muted hover:text-foreground",
      "focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      "group-hover:opacity-100",
      "group-[.destructive]:text-destructive-foreground group-[.destructive]:hover:bg-[oklch(1_0_0_/_0.18)] group-[.destructive]:hover:text-destructive-foreground",
      className,
    )}
    {...props}
  >
    <Icon icon="solar:close-circle-linear" className="size-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn(
      "text-[0.9063rem] leading-[1.125rem] font-semibold tracking-[-0.0125rem]",
      className,
    )}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn(
      "text-[0.7813rem] leading-4 tracking-[0.0188rem] text-muted-foreground",
      "group-[.destructive]:text-destructive-foreground group-[.destructive]:opacity-90",
      className,
    )}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

/** The props a `toast()` call may pass through to the `Toast` root. */
type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

/** The element type accepted by a toast's `action` slot. */
type ToastActionElement = React.ReactElement<typeof ToastAction>

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
}
