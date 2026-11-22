import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Margin Empty: the frameless parts of an empty state, centred in a column.
 * Wrap them in any surface; the icon sits on a small paper tab tile.
 */
const Empty = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="empty"
      className={cn("flex flex-col items-center justify-center gap-2 p-8 text-center", className)}
      {...props}
    />
  ),
);
Empty.displayName = "Empty";

/** The small white tile that holds the empty state's icon. */
const EmptyIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="empty-icon"
      aria-hidden="true"
      className={cn(
        "mb-1 flex size-10 items-center justify-center rounded-lg bg-card text-muted-foreground shadow-sm [&_svg]:size-5",
        className,
      )}
      {...props}
    />
  ),
);
EmptyIcon.displayName = "EmptyIcon";

/** The empty state's short semibold title. */
const EmptyTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="empty-title"
      className={cn("text-sm font-semibold text-foreground", className)}
      {...props}
    />
  ),
);
EmptyTitle.displayName = "EmptyTitle";

/** The muted line that says what would fill the space. */
const EmptyDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      data-slot="empty-description"
      className={cn("max-w-sm text-sm leading-normal text-muted-foreground", className)}
      {...props}
    />
  ),
);
EmptyDescription.displayName = "EmptyDescription";

/** The row of buttons under the description. */
const EmptyActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="empty-actions"
      className={cn("flex items-center gap-1.5 pt-2", className)}
      {...props}
    />
  ),
);
EmptyActions.displayName = "EmptyActions";

export { Empty, EmptyIcon, EmptyTitle, EmptyDescription, EmptyActions };
