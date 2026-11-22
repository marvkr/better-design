import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Playdesk InputGroup — a recessed field with fixed addons welded to its ends.
 * The group owns the rim and the focus halo so the seams stay invisible.
 */

export interface InputGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "prefix"> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, prefix, suffix, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-10 w-full items-stretch overflow-hidden rounded-lg",
        "border border-border bg-input",
        "[box-shadow:var(--shadow-inset)]",
        "transition-[box-shadow,border-color] duration-fast ease-out",
        "focus-within:border-ring focus-within:ring-[0.1875rem] focus-within:ring-ring/25",
        className,
      )}
      {...props}
    >
      {prefix ? (
        <span className="flex shrink-0 items-center border-r border-border bg-muted px-3 text-sm text-muted-foreground">
          {prefix}
        </span>
      ) : null}
      <div className="flex min-w-0 flex-1 items-center [&>input]:h-full [&>input]:w-full [&>input]:border-0 [&>input]:bg-transparent [&>input]:px-3.5 [&>input]:text-sm [&>input]:outline-none [&>input]:[box-shadow:none]">
        {children}
      </div>
      {suffix ? (
        <span className="flex shrink-0 items-center border-l border-border bg-muted px-3 text-sm text-muted-foreground">
          {suffix}
        </span>
      ) : null}
    </div>
  ),
);
InputGroup.displayName = "InputGroup";

export { InputGroup };
