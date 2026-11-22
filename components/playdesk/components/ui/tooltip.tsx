"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

/*
 * Playdesk Tooltip — the dark hint bar from the bottom of the desk, shrunk to
 * a caption. Dark on purpose: it is transient, so it should not read as a
 * window.
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
      "origin-(--radix-tooltip-content-transform-origin) z-50 overflow-hidden rounded-lg px-2.5 py-1.5",
      "bg-foreground/90 text-xs font-medium text-background backdrop-blur-md",
      "[box-shadow:0_0.625rem_1.75rem_oklch(0_0_0_/_0.35)]",
      "data-[state=delayed-open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=delayed-open]:zoom-in-95",
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
