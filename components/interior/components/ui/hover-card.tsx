"use client";

import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "@/lib/utils";

/*
 * Interior HoverCard — the Popover panel raised by pointing instead of
 * clicking: 11px radius, popover float shadow, no border.
 */

const HoverCard = HoverCardPrimitive.Root;
const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 8, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "origin-(--radix-hover-card-content-transform-origin) z-50 w-64 rounded-[0.6875rem] bg-popover p-4 text-popover-foreground outline-none",
      "shadow-[var(--shadow-float-popover)]",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=open]:duration-fast data-[state=closed]:duration-fast",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-[0.97] data-[state=open]:zoom-in-[0.97]",
      className,
    )}
    {...props}
  />
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
