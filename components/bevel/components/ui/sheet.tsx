"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

/*
 * Bevel Sheet: a card that slides in from an edge of the screen. It
 * carries no border, so the 20px radius is rounded only on the edges that
 * leave the screen edge, and the card shadow does the separating. A bottom
 * sheet gets the grabber the platform trains people to reach for.
 */

const Sheet = SheetPrimitive.Root
const SheetTrigger = SheetPrimitive.Trigger
const SheetClose = SheetPrimitive.Close
const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-[oklch(0.1593_0.0111_267.98_/_0.42)] backdrop-blur-[0.1875rem]",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-base",
      className,
    )}
    {...props}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  [
    "fixed z-50 flex flex-col gap-4 p-[1.125rem]",
    "bg-card text-card-foreground",
    "[box-shadow:var(--shadow-card)]",
    "transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out duration-base",
  ].join(" "),
  {
    variants: {
      side: {
        top: "inset-x-2 top-2 sm:inset-x-3 sm:top-3 rounded-[1.25rem] data-[state=closed]:slide-out-to-top-[calc(100%+1rem)] data-[state=open]:slide-in-from-top-[calc(100%+1rem)]",
        bottom:
          "inset-x-2 bottom-2 sm:inset-x-3 sm:bottom-3 rounded-[1.25rem] data-[state=closed]:slide-out-to-bottom-[calc(100%+1rem)] data-[state=open]:slide-in-from-bottom-[calc(100%+1rem)]",
        left: "inset-y-2 left-2 sm:inset-y-3 sm:left-3 h-auto w-3/4 rounded-[1.25rem] data-[state=closed]:slide-out-to-left-[calc(100%+1rem)] data-[state=open]:slide-in-from-left-[calc(100%+1rem)] sm:max-w-sm",
        right:
          "inset-y-2 right-2 sm:inset-y-3 sm:right-3 h-auto w-3/4 rounded-[1.25rem] data-[state=closed]:slide-out-to-right-[calc(100%+1rem)] data-[state=open]:slide-in-from-right-[calc(100%+1rem)] sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
)

/** Props for `SheetContent`; `side` picks the screen edge the sheet enters from. */
interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {side === "bottom" && (
        <div
          aria-hidden="true"
          className="mx-auto -mt-1 h-1 w-9 shrink-0 rounded-full bg-[var(--track)]"
        />
      )}
      {children}
      <SheetPrimitive.Close
        className={cn(
          "absolute right-3.5 top-3.5 inline-flex size-[1.875rem] items-center justify-center rounded-full",
          "text-muted-foreground transition-[background-color,color] duration-fast ease-out",
          "hover:bg-muted hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none",
        )}
      >
        <Icon icon="solar:close-circle-linear" className="size-[1.125rem]" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

/** The title and description block at the top of a sheet. */
const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col gap-1.5 pr-9 text-left", className)}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

/** The action row at the foot of a sheet. */
const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "mt-auto flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end",
      className,
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn(
      "text-[1.1875rem] leading-6 font-semibold tracking-[-0.0375rem] text-foreground",
      className,
    )}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn(
      "text-[0.9063rem] leading-[1.25rem] tracking-[0.0188rem] text-muted-foreground",
      className,
    )}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

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
}
