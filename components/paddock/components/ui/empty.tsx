import * as React from "react";

import { cn } from "@/lib/utils";
import { raisedSurface } from "./_shared";

/**
 * Paddock Empty: the parts of an empty state with no frame of their own. The
 * icon sits in a small white tile with a 1px border, and the title and
 * description are centred under it.
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

/** The white tile that holds the empty state's icon. */
const EmptyIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="empty-icon"
      className={cn(
        "mb-2 flex size-11 items-center justify-center rounded-lg text-muted-foreground [&_svg]:size-5",
        raisedSurface,
        className,
      )}
      {...props}
    />
  ),
);
EmptyIcon.displayName = "EmptyIcon";

/** The empty state's title, in the card-title size. */
const EmptyTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="empty-title"
      className={cn("text-[0.9375rem] font-semibold tracking-tight text-foreground", className)}
      {...props}
    />
  ),
);
EmptyTitle.displayName = "EmptyTitle";

/** The muted line that says what will appear and how to start. */
const EmptyDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="empty-description"
    className={cn("max-w-sm text-[0.8125rem] text-muted-foreground", className)}
    {...props}
  />
));
EmptyDescription.displayName = "EmptyDescription";

/** The row of buttons under an empty state. */
const EmptyActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="empty-actions"
      className={cn("flex items-center gap-2 pt-3", className)}
      {...props}
    />
  ),
);
EmptyActions.displayName = "EmptyActions";

export { Empty, EmptyIcon, EmptyTitle, EmptyDescription, EmptyActions };
