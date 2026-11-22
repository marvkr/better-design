import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

// Ops Sharp NativeSelect - a native <select> wearing the shared field surface
// (formFieldBase) with the native arrow suppressed and a precise lucide chevron
// dropped in. Error state swaps the border + focus ring to destructive.

interface NativeSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  error?: boolean;
}

const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "appearance-none cursor-pointer pr-9",
            "[&>option]:bg-popover [&>option]:text-popover-foreground",
            error &&
              "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/25",
            className
          )}
          {...props}
        >
          {children}
        </select>

        <div
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        >
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    );
  }
);
NativeSelect.displayName = "NativeSelect";

export { NativeSelect };
export type { NativeSelectProps };
