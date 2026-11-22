"use client";

import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "@/lib/utils";
import { popoverSurface } from "./_shared";

/**
 * Ink mail HoverCard: a preview that appears while the pointer rests on a
 * link, such as a sender address or an API key name. It is the same elevated
 * panel as the menus, edged by a translucent white ring, fading and scaling
 * in beside its trigger over 150ms.
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
    data-slot="hover-card-content"
    className={cn(
      popoverSurface,
      "z-50 flex w-72 flex-col gap-3 p-4 text-sm outline-none",
      "origin-(--radix-hover-card-content-transform-origin) duration-fast ease-out",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
      className,
    )}
    {...props}
  />
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
