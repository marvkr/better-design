import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Bevel Empty.
 *
 * The compositional empty state: structural slots only, so a screen can place
 * its own glyph, copy and actions. It draws no surface of its own, which lets
 * it sit directly inside a card. The glyph slot is the one piece with a
 * treatment: a round well on the inner token, pressed in with the inset
 * shadow, because an empty area in this system is always a well.
 */

const Empty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col items-center justify-center gap-3 p-8 text-center",
      className,
    )}
    {...props}
  />
))
Empty.displayName = "Empty"

const EmptyIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex size-12 items-center justify-center rounded-full",
      "bg-[var(--inner)] text-muted-foreground",
      "[box-shadow:var(--shadow-inset)]",
      "[&_svg]:size-[1.375rem]",
      className,
    )}
    {...props}
  />
))
EmptyIcon.displayName = "EmptyIcon"

const EmptyTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-[1rem] leading-[1.375rem] font-semibold tracking-[-0.025rem] text-foreground",
      className,
    )}
    {...props}
  />
))
EmptyTitle.displayName = "EmptyTitle"

const EmptyDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "max-w-md text-[0.9063rem] leading-[1.3125rem] tracking-[0.0188rem] text-muted-foreground",
      className,
    )}
    {...props}
  />
))
EmptyDescription.displayName = "EmptyDescription"

const EmptyActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2.5 pt-1", className)}
    {...props}
  />
))
EmptyActions.displayName = "EmptyActions"

export { Empty, EmptyIcon, EmptyTitle, EmptyDescription, EmptyActions }
