import * as React from "react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

/*
 * Interior AvatarGroup — overlapping square tiles, each separated by a 2px
 * card ring so the stack stays legible on a panel; a hairline in the card
 * colour is a compartment edge, the one place a ring is honest. The overflow
 * count is metadata, so it runs mono with tabular figures.
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
          <span
            className={cn(
              "flex size-9 items-center justify-center rounded-[0.625rem]",
              "bg-secondary font-mono text-[0.6563rem] font-medium tabular-nums text-muted-foreground",
              "shadow-[var(--shadow-well)] ring-2 ring-card",
            )}
          >
            +{overflow}
          </span>
        ) : null}
      </div>
    );
  },
);
AvatarGroup.displayName = "AvatarGroup";

export { AvatarGroup };
