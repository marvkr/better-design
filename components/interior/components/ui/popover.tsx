"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";

/*
 * Interior Popover — an 11px-radius panel on the popover float shadow, no
 * border: the shadow alone says it floats. It arrives with a 2px slide and a
 * 0.97 zoom, and leaves faster than it came.
 */

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 8, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "origin-(--radix-popover-content-transform-origin) z-50 w-72 rounded-[0.6875rem] bg-popover p-4 text-popover-foreground outline-none",
        "shadow-[var(--shadow-float-popover)]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "duration-base",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-[0.97] data-[state=open]:zoom-in-[0.97]",
        "data-[side=bottom]:slide-in-from-top-[0.125rem] data-[side=top]:slide-in-from-bottom-[0.125rem]",
        "data-[side=left]:slide-in-from-right-[0.125rem] data-[side=right]:slide-in-from-left-[0.125rem]",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
