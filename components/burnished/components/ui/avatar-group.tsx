import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Burnished AvatarGroup: rimmed portraits overlapped like coins on a table.
 * A ring in the page colour cuts each one from the next, and the overflow
 * count sits on a graphite bevel of the same size.
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
          <div key={i} className="rounded-full ring-2 ring-background">
            {child}
          </div>
        ))}
        {hiddenCount > 0 && (
          <div
            className={cn(
              "relative flex size-10 items-center justify-center rounded-full text-xs font-semibold tabular-nums",
              "bg-(image:--fill-raised) text-muted-foreground shadow-(--bevel-raised) ring-2 ring-background",
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
