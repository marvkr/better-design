import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

/**
 * Paddock NativeSelect: the browser's own select, dressed as the white rounded
 * field with a small chevron at its right edge.
 */
export interface NativeSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, children, ...props }, ref) => (
    <div data-slot="native-select" className="relative">
      <select
        ref={ref}
        className={cn(
          formFieldBase,
          formFieldSingleLine,
          "cursor-pointer appearance-none pr-10 *:bg-popover *:text-popover-foreground",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <Icon
        icon="mingcute:down-line"
        aria-hidden
        className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  ),
);
NativeSelect.displayName = "NativeSelect";

export { NativeSelect };
