"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { formFieldBase } from "./_shared";

// Talentboard NativeSelect: recessed field shell around the platform select.

interface NativeSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  error?: boolean;
}

const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            formFieldBase,
            "flex h-9 appearance-none rounded-lg px-3 py-1 pr-9 text-sm",
            "[&>option]:bg-popover [&>option]:text-popover-foreground",
            error && "border-destructive/70 focus-visible:border-destructive focus-visible:ring-destructive/30",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    );
  }
);
NativeSelect.displayName = "NativeSelect";

export { NativeSelect };
export type { NativeSelectProps };
