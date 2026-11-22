"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

/*
 * Interior Tooltip — a small lifted panel, not an inverted black bubble: the
 * same white surface as every other float, at the 6px cap radius and the
 * hint size, carried by the popover float shadow.
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
    className={cn(
      "origin-(--radix-tooltip-content-transform-origin) z-50 overflow-hidden rounded-[0.375rem] px-2.5 py-1.5",
      "bg-card text-[0.7188rem] font-medium text-foreground",
      "shadow-[var(--shadow-float-popover)]",
      "data-[state=delayed-open]:animate-in data-[state=closed]:animate-out",
      "data-[state=delayed-open]:duration-fast data-[state=closed]:duration-fast",
      "data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0",
      "data-[state=closed]:zoom-out-[0.97] data-[state=delayed-open]:zoom-in-[0.97]",
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
