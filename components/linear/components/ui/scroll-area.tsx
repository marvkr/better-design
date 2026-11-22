"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

type ScrollAreaProps = React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
  orientation?: "vertical" | "horizontal" | "both"
  scrollbarGutter?: boolean
  scrollbarOverflowOnly?: boolean
  scrollFade?: boolean
  viewportClassName?: string
  viewportProps?: React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Viewport>
  viewportRef?: React.Ref<HTMLDivElement>
}

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className, children, orientation = "vertical", scrollbarGutter, scrollbarOverflowOnly, scrollFade, viewportClassName, viewportProps, viewportRef, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", scrollbarGutter && "[scrollbar-gutter:stable]", scrollFade && "[mask-image:linear-gradient(to_bottom,transparent,oklch(0_0_0)_1rem,oklch(0_0_0)_calc(100%-1rem),transparent)]", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport ref={viewportRef} className={cn("h-full w-full rounded-[inherit]", viewportClassName)} {...viewportProps}>
      {children}
    </ScrollAreaPrimitive.Viewport>
    {orientation !== "horizontal" ? <ScrollBar forceMount={scrollbarOverflowOnly ? undefined : true} /> : null}
    {orientation !== "vertical" ? <ScrollBar orientation="horizontal" forceMount={scrollbarOverflowOnly ? undefined : true} /> : null}
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[0.0625rem]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[0.0625rem]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb
      className={cn(
        "relative rounded-full bg-border",
        orientation === "vertical" && "flex-1"
      )}
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

const ScrollAreaContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("min-w-fit", className)} {...props} />
))
ScrollAreaContent.displayName = "ScrollAreaContent"

export { ScrollArea, ScrollAreaContent, ScrollAreaPrimitive, ScrollBar }
