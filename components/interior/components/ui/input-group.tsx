import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Interior InputGroup — one well with fixed addons welded to its ends. The
 * group owns the field recipe (2px border, tinted fill, inset shadow; accent
 * border on a white fill when entered), so the addon seams never break the
 * slot. Addons sit on the secondary surface like compartments in the well.
 */

export interface InputGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "prefix"> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, prefix, suffix, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-10 w-full items-stretch overflow-hidden rounded-[0.625rem]",
        "border-2 border-border bg-input",
        "shadow-[var(--shadow-well)]",
        "transition-[background-color,border-color,box-shadow] duration-fast",
        "focus-within:border-ring focus-within:bg-card focus-within:shadow-none",
        className,
      )}
      {...props}
    >
      {prefix ? (
        <span className="flex shrink-0 items-center border-r border-border bg-secondary px-3 text-[0.7813rem] text-muted-foreground">
          {prefix}
        </span>
      ) : null}
      <div className="flex min-w-0 flex-1 items-center [&>input]:h-full [&>input]:w-full [&>input]:border-0 [&>input]:bg-transparent [&>input]:px-3 [&>input]:text-[0.8125rem] [&>input]:text-foreground [&>input]:outline-none [&>input]:[box-shadow:none] [&>input]:placeholder:text-muted-foreground">
        {children}
      </div>
      {suffix ? (
        <span className="flex shrink-0 items-center border-l border-border bg-secondary px-3 text-[0.7813rem] text-muted-foreground">
          {suffix}
        </span>
      ) : null}
    </div>
  ),
);
InputGroup.displayName = "InputGroup";

export { InputGroup };
