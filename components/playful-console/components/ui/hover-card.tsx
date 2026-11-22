"use client";

import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "@/lib/utils";
import { popoverSurface } from "./_shared";

/**
 * Playful console HoverCard: a preview that appears while the pointer rests
 * on a link. The same white card with the olive hairline as the popover.
 */
const HoverCard = HoverCardPrimitive.Root;
/** The link or element that shows the preview on hover. */
const HoverCardTrigger = HoverCardPrimitive.Trigger;

/** The floating preview panel. */
const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 8, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    data-slot="hover-card-content"
    className={cn(
      popoverSurface,
      "z-50 flex w-72 flex-col gap-3 p-4 text-sm outline-none",
      "origin-(--radix-hover-card-content-transform-origin) ease-out",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:duration-fast",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:duration-fast",
      className,
    )}
    {...props}
  />
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
