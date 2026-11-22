import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Burnished Empty: the parts of an empty state with no frame of their own.
 * The icon sits on a round graphite bevel; the title and description are
 * centred under it.
 */
const Empty = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="empty"
      className={cn("flex flex-col items-center justify-center gap-3 p-8 text-center", className)}
      {...props}
    />
  ),
);
Empty.displayName = "Empty";

const EmptyIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="empty-icon"
      className={cn(
        "mb-1 flex size-12 items-center justify-center rounded-full text-muted-foreground [&_svg]:size-5",
        "bg-(image:--fill-raised) shadow-(--bevel-raised)",
        className,
      )}
      {...props}
    />
  ),
);
EmptyIcon.displayName = "EmptyIcon";

const EmptyTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="empty-title"
      className={cn("text-base font-semibold text-foreground", className)}
      {...props}
    />
  ),
);
EmptyTitle.displayName = "EmptyTitle";

const EmptyDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="empty-description"
    className={cn("max-w-md text-sm leading-relaxed text-muted-foreground", className)}
    {...props}
  />
));
EmptyDescription.displayName = "EmptyDescription";

const EmptyActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="empty-actions"
      className={cn("flex items-center gap-2 pt-2", className)}
      {...props}
    />
  ),
);
EmptyActions.displayName = "EmptyActions";

export { Empty, EmptyIcon, EmptyTitle, EmptyDescription, EmptyActions };
