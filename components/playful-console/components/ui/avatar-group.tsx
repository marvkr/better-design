import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Playful console AvatarGroup: circles that overlap by a quarter, each cut
 * out of the next by a ring in the page colour. Past `max`, the rest fold
 * into a cream circle that counts them in bold mono figures.
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
          "flex items-center -space-x-2.5 *:ring-2 *:ring-background",
          className,
        )}
        {...props}
      >
        {shown}
        {hidden > 0 && (
          <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full border-[0.09375rem] border-(--line-strong) bg-secondary font-mono text-xs font-bold tabular-nums text-foreground">
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
