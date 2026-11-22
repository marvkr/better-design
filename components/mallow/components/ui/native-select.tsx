import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

/** Mallow NativeSelect: the browser's own select, as a white field with a chevron. */
export interface NativeSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, children, ...props }, ref) => (
    <div data-slot="native-select" className="relative">
      <select
        ref={ref}
        className={cn(
          formFieldBase,
          formFieldSingleLine,
          "cursor-pointer appearance-none pe-11 [&>option]:bg-popover [&>option]:text-popover-foreground",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <Icon
        icon="iconoir:nav-arrow-down"
        aria-hidden="true"
        className="pointer-events-none absolute end-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  ),
);
NativeSelect.displayName = "NativeSelect";

export { NativeSelect };
