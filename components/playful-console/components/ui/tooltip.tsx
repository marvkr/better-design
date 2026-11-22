"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

/**
 * Playful console Tooltip: a small dark ink chip with bold white text and a
 * 0.25rem corner. No arrow and no shadow, so it reads as a label.
 */
const TooltipProvider = TooltipPrimitive.Provider;
/** One tooltip and its trigger. */
const Tooltip = TooltipPrimitive.Root;
/** The element the tooltip describes. */
const TooltipTrigger = TooltipPrimitive.Trigger;

/** The ink chip itself. */
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    data-slot="tooltip-content"
    className={cn(
      "z-50 max-w-64 rounded-md bg-(--ink) px-2 py-1 text-xs font-semibold text-balance text-(--ink-foreground)",
      "origin-(--radix-tooltip-content-transform-origin) duration-fast ease-out",
      "animate-in fade-in-0 zoom-in-95",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
