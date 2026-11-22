"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";
import { popoverSurface } from "./_shared";

/**
 * Paddock Tooltip: a small slice of the shared white panel, with the same
 * hairline ring and soft drop, set in compact medium type.
 */
const TooltipProvider = TooltipPrimitive.Provider;

/** One tooltip: wraps a trigger and its content. */
const Tooltip = TooltipPrimitive.Root;

/** The element that shows the tooltip on hover or focus. */
const TooltipTrigger = TooltipPrimitive.Trigger;

/** The floating label. */
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      data-slot="tooltip-content"
      className={cn(
        popoverSurface,
        "z-50 max-w-xs overflow-hidden px-2.5 py-1.5 text-xs font-medium",
        "origin-(--radix-tooltip-content-transform-origin) duration-fast ease-out",
        "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
        className,
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
