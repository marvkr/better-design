import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Ink mail AvatarGroup: circles that overlap by a quarter, each cut out of
 * the next by a black ring the colour of the page. Past `max`, the rest fold
 * into a secondary-step circle that counts them in tabular figures.
 */
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The number of avatars to show before the rest fold into a count. */
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
          "flex items-center -space-x-2 *:ring-2 *:ring-background",
          className,
        )}
        {...props}
      >
        {shown}
        {hidden > 0 && (
          <span className="relative flex size-8 shrink-0 items-center justify-center rounded-full border border-(--line-strong) bg-secondary text-xs font-medium tabular-nums text-(--foreground-secondary)">
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
