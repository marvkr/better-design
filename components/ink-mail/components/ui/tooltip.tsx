"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

/**
 * Ink mail Tooltip: the ink chip in reverse. Off-white with black text and a
 * 0.5rem corner, no arrow and no shadow, so on the black page it reads as a
 * label rather than a panel. It fades in from 97% scale in 150ms.
 */
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    data-slot="tooltip-content"
    className={cn(
      "z-50 max-w-64 rounded-md bg-primary px-2 py-1 text-xs font-medium text-balance text-primary-foreground",
      "origin-(--radix-tooltip-content-transform-origin) duration-fast ease-out",
      "animate-in fade-in-0 zoom-in-97",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-97",
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
