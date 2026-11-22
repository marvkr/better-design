import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Paddock AvatarGroup: a row of the people on a visit. Small round avatars
 * overlap, each cut from the next by a ring in the card colour, and the
 * overflow count sits on a grey chip of the same size.
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
        className={cn("flex items-center -space-x-2", className)}
        {...props}
      >
        {visible.map((child, i) => (
          <div key={i} className="rounded-full ring-2 ring-card">
            {child}
          </div>
        ))}
        {hiddenCount > 0 && (
          <div className="relative flex size-8 items-center justify-center rounded-full bg-secondary text-xs font-semibold tabular-nums text-secondary-foreground ring-2 ring-card">
            +{hiddenCount}
          </div>
        )}
      </div>
    );
  },
);
AvatarGroup.displayName = "AvatarGroup";

export { AvatarGroup };
