"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";
import { popoverSurface } from "./_shared";

/**
 * Playful console Popover: a white card with the olive hairline that drops
 * beside its trigger with a soft shadow, snapping in from 95% scale.
 */
const Popover = PopoverPrimitive.Root;

/** Opens the popover. */
const PopoverTrigger = PopoverPrimitive.Trigger;

/** The floating popover panel. */
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 8, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      data-slot="popover-content"
      className={cn(
        popoverSurface,
        "z-50 flex w-72 flex-col gap-3 p-4 text-sm outline-none",
        "origin-(--radix-popover-content-transform-origin) ease-out",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 duration-base",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
