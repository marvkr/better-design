"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

// Talentboard Item: list row like the portal's payment-method entry.

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  title: string;
  subtitle?: string;
  disabled?: boolean;
  interactive?: boolean;
  as?: React.ElementType;
  href?: string;
}

function Item({
  leading,
  trailing,
  title,
  subtitle,
  disabled,
  interactive,
  as,
  href,
  className,
  ...props
}: ItemProps) {
  const Comp = as ?? (href ? "a" : "div");

  return (
    <Comp
      href={disabled ? undefined : href}
      tabIndex={disabled ? -1 : undefined}
      aria-disabled={disabled || undefined}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left",
        interactive &&
          "cursor-pointer transition-colors duration-fast hover:bg-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      {...props}
    >
      {leading && <span className="flex shrink-0 items-center text-muted-foreground">{leading}</span>}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-foreground">{title}</span>
        {subtitle && (
          <span className="block truncate text-xs text-muted-foreground">{subtitle}</span>
        )}
      </span>
      {trailing && <span className="flex shrink-0 items-center text-muted-foreground">{trailing}</span>}
    </Comp>
  );
}

interface ItemListProps extends React.HTMLAttributes<HTMLDivElement> {
  divided?: boolean;
}

function ItemList({ divided, className, ...props }: ItemListProps) {
  return (
    <div
      className={cn(
        "flex flex-col",
        divided && "divide-y divide-border/60 [&>*]:rounded-none",
        className
      )}
      {...props}
    />
  );
}

export { Item, ItemList };
export type { ItemProps, ItemListProps };
