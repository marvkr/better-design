"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Playdesk ButtonGroup — segments welded into one pill. The group owns the
 * outer radius; the segments only separate with hairlines.
 */

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      className={cn(
        "inline-flex items-stretch overflow-hidden rounded-full",
        "bg-[linear-gradient(180deg,var(--secondary-from)_0%,var(--secondary-to)_100%)]",
        "[box-shadow:var(--shadow-button)]",
        "divide-x divide-foreground/10",
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
      "inline-flex h-10 items-center justify-center gap-2 px-4 text-sm font-medium",
      "text-secondary-foreground transition-colors duration-fast",
      "hover:bg-foreground/[0.04]",
      "focus-visible:outline-none focus-visible:ring-[0.1875rem] focus-visible:ring-ring/35",
      "disabled:pointer-events-none disabled:opacity-50",
      "[&_svg]:size-4 [&_svg]:shrink-0",
      active && "bg-foreground/[0.07]",
      className,
    )}
    {...props}
  />
));
ButtonGroupItem.displayName = "ButtonGroupItem";

export { ButtonGroup, ButtonGroupItem };
