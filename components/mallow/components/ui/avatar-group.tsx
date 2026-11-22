import * as React from "react";

import { cn } from "@/lib/utils";
import { softPanel } from "./_shared";

/**
 * Mallow AvatarGroup: portraits overlapped in a row, each cut from the next
 * by a ring in the card colour. The overflow count sits on a violet-ringed tint of
 * the same size.
 */
interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  total?: number;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, max, total, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    const visible = max ? childArray.slice(0, max) : childArray;
    const hiddenCount = (total ?? childArray.length) - visible.length;

    return (
      <div
        ref={ref}
        data-slot="avatar-group"
        className={cn("flex items-center -space-x-2.5", className)}
        {...props}
      >
        {visible.map((child, i) => (
          <div key={i} className="rounded-full ring-2 ring-card">
            {child}
          </div>
        ))}
        {hiddenCount > 0 && (
          <div
            className={cn(
              softPanel,
              "relative flex size-10 items-center justify-center rounded-full text-xs font-medium tabular-nums text-muted-foreground ring-2 ring-card",
            )}
          >
            +{hiddenCount}
          </div>
        )}
      </div>
    );
  },
);
AvatarGroup.displayName = "AvatarGroup";

export { AvatarGroup };
