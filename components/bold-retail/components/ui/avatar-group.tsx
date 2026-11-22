import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Bold retail AvatarGroup: circles stacked with a slight overlap, each
 * separated from the next by a white ring. Past `max`, the rest collapse
 * into a soft grey circle that shows how many are left.
 */
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The number of avatars to show before the rest collapse into a count. */
  max?: number;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max, children, ...props }, ref) => {
    const avatars = React.Children.toArray(children);
    const shown = max ? avatars.slice(0, max) : avatars;
    const hidden = avatars.length - shown.length;

    return (
      <div
        ref={ref}
        data-slot="avatar-group"
        className={cn(
          "flex items-center -space-x-2.5 *:ring-2 *:ring-background",
          className,
        )}
        {...props}
      >
        {shown}
        {hidden > 0 && (
          <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium tabular-nums text-foreground">
            <span aria-hidden="true">+{hidden}</span>
            <span className="sr-only">{hidden} more</span>
          </span>
        )}
      </div>
    );
  },
);
AvatarGroup.displayName = "AvatarGroup";

export { AvatarGroup };
