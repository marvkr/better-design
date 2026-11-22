"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";
import { popoverSurface } from "./_shared";

/**
 * Paddock Popover: a white floating panel with one cool border and a faint
 * drop, opening with a quick fade and a small grow from the
 * edge it is anchored to.
 */
const Popover = PopoverPrimitive.Root;

/** The element that opens the popover. */
const PopoverTrigger = PopoverPrimitive.Trigger;

/** An optional element the popover positions against instead of its trigger. */
const PopoverAnchor = PopoverPrimitive.Anchor;

/** The floating white panel, portalled above the page. */
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 6, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      data-slot="popover-content"
      className={cn(
        popoverSurface,
        "z-50 w-72 p-4 outline-none",
        "origin-(--radix-popover-content-transform-origin) duration-base ease-out",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
