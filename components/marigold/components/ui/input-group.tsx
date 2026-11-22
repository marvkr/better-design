"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { formFieldBase } from "./_shared";

// Talentboard InputGroup: recessed shell with quiet prefix/suffix slots.

interface InputGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "prefix"> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  size?: "default" | "sm";
  disabled?: boolean;
  error?: boolean;
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, prefix, suffix, size = "default", disabled, error, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-disabled={disabled || undefined}
        className={cn(
          formFieldBase,
          "flex items-center gap-2 rounded-lg px-3",
          "focus-within:border-ring/60 focus-within:ring-2 focus-within:ring-ring/35",
          size === "default" ? "h-9" : "h-8",
          error && "border-destructive/70 focus-within:border-destructive focus-within:ring-destructive/30",
          disabled && "cursor-not-allowed opacity-50",
          "[&>input]:h-full [&>input]:w-full [&>input]:bg-transparent [&>input]:text-sm [&>input]:text-foreground [&>input]:outline-none [&>input]:placeholder:text-muted-foreground",
          className
        )}
        {...props}
      >
        {prefix && <span className="flex shrink-0 items-center text-sm text-muted-foreground">{prefix}</span>}
        {children}
        {suffix && <span className="flex shrink-0 items-center text-sm text-muted-foreground">{suffix}</span>}
      </div>
    );
  }
);
InputGroup.displayName = "InputGroup";

export { InputGroup };
export type { InputGroupProps };
