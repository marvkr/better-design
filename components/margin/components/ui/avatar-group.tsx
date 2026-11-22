import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Margin AvatarGroup: small round portraits overlapped in a row. A ring in
 * the page colour separates each one, and the overflow count sits on a grey
 * field chip of the same size.
 */
interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** How many avatars to show before the overflow count. */
  max?: number;
  /** The full number of people, when it is larger than the children passed. */
  total?: number;
}

/** A row of overlapped avatars with a "+n" count for the rest. */
const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, max, total, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    const visible = max ? childArray.slice(0, max) : childArray;
    const hiddenCount = (total ?? childArray.length) - visible.length;

    return (
      <div
        ref={ref}
        data-slot="avatar-group"
        className={cn("flex items-center -space-x-2", className)}
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
              "relative flex size-8 items-center justify-center rounded-full text-xs font-medium tabular-nums",
              "bg-(--field) text-muted-foreground ring-2 ring-background",
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
