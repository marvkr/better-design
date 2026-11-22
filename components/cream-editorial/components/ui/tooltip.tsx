"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

/**
 * Cream editorial Tooltip: a small chip of warm ink with cream type and a
 * 0.5rem corner. No arrow and no shadow, so it reads as a margin note rather
 * than a panel. It fades in over 150ms.
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
      "z-50 max-w-64 rounded-md bg-foreground px-2 py-1 text-xs text-balance text-background",
      "origin-(--radix-tooltip-content-transform-origin) duration-fast ease-out",
      "animate-in fade-in-0",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
