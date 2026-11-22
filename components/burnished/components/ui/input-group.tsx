import * as React from "react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

/**
 * Burnished InputGroup: one graphite bevel field that holds an input and its
 * addons (text, icons, buttons). Addons sit behind a hairline, and the whole
 * group takes the focus glow when its input has focus.
 */
interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="input-group"
      className={cn(
        formFieldBase,
        formFieldSingleLine,
        "items-stretch overflow-hidden px-0 py-0",
        "focus-within:shadow-(--bevel-raised-focus) focus-within:ring-3 focus-within:ring-ring",
        className,
      )}
      {...props}
    />
  ),
);
InputGroup.displayName = "InputGroup";

const InputGroupAddon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { side?: "left" | "right" }
>(({ className, side = "left", ...props }, ref) => (
  <div
    ref={ref}
    data-slot="input-group-addon"
    data-side={side}
    className={cn(
      "flex shrink-0 items-center gap-2 px-4 text-sm text-muted-foreground [&_svg]:size-4",
      side === "left" ? "order-first border-r border-border" : "order-last border-l border-border",
      className,
    )}
    {...props}
  />
));
InputGroupAddon.displayName = "InputGroupAddon";

const InputGroupInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    data-slot="input-group-input"
    className={cn(
      "min-w-0 flex-1 bg-transparent px-4 text-foreground outline-none placeholder:text-muted-foreground",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
InputGroupInput.displayName = "InputGroupInput";

export { InputGroup, InputGroupAddon, InputGroupInput };
export type { InputGroupProps };
