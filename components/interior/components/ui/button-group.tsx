"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Interior ButtonGroup — segments welded into one cap. The group owns the
 * 9px outer radius and the cap shadow; the segments only separate with
 * hairlines. The active segment says "selected" the way everything here
 * does: ink and depth, never accent.
 */

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      className={cn(
        "inline-flex items-stretch overflow-hidden rounded-[0.5625rem]",
        "bg-card shadow-[var(--shadow-cap)]",
        "divide-x divide-border",
        className,
      )}
      {...props}
    />
  ),
);
ButtonGroup.displayName = "ButtonGroup";

export interface ButtonGroupItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const ButtonGroupItem = React.forwardRef<
  HTMLButtonElement,
  ButtonGroupItemProps
>(({ className, active, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    aria-pressed={active}
    className={cn(
      "inline-flex h-10 items-center justify-center gap-2 px-4 text-[0.8125rem] font-medium leading-[1.25rem]",
      "text-foreground",
      "transition-[background-color,color,box-shadow] duration-fast",
      "hover:bg-secondary",
      "focus-visible:outline-none focus-visible:bg-ring/[0.06] focus-visible:shadow-[inset_0_0_0_0.0625rem_var(--ring)]",
      "disabled:pointer-events-none disabled:opacity-50",
      "[&_svg]:size-4 [&_svg]:shrink-0",
      active && [
        "bg-primary text-primary-foreground hover:bg-primary/90",
        "focus-visible:bg-primary focus-visible:shadow-[inset_0_0_0_0.0938rem_var(--ring-inverted)]",
      ],
      className,
    )}
    {...props}
  />
));
ButtonGroupItem.displayName = "ButtonGroupItem";

export { ButtonGroup, ButtonGroupItem };
