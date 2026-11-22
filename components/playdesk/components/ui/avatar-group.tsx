import * as React from "react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

/*
 * Playdesk AvatarGroup — overlapping heads, each ringed in the desk colour so
 * the stack stays legible against a window body.
 */

export interface AvatarGroupItem {
  src?: string;
  alt?: string;
  fallback: string;
}

export interface AvatarGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: AvatarGroupItem[];
  max?: number;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, items, max = 4, ...props }, ref) => {
    const shown = items.slice(0, max);
    const overflow = items.length - shown.length;

    return (
      <div
        ref={ref}
        className={cn("flex items-center -space-x-2", className)}
        {...props}
      >
        {shown.map((item, index) => (
          <Avatar
            key={`${item.fallback}-${index}`}
            className="ring-2 ring-card"
          >
            {item.src ? <AvatarImage src={item.src} alt={item.alt} /> : null}
            <AvatarFallback>{item.fallback}</AvatarFallback>
          </Avatar>
        ))}
        {overflow > 0 ? (
          <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-xs font-medium text-muted-foreground ring-2 ring-card">
            +{overflow}
          </span>
        ) : null}
      </div>
    );
  },
);
AvatarGroup.displayName = "AvatarGroup";

export { AvatarGroup };
