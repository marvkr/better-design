import * as React from "react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

/**
 * Mallow InputGroup: one white field that holds an input and its addons
 * (text, icons, buttons). Addons sit behind a hairline, and the whole field takes the
 * focus ring when its input has focus.
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
        "focus-within:ring-2 focus-within:ring-ring",
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
      side === "left" ? "order-first border-e border-border" : "order-last border-s border-border",
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
      "min-w-0 flex-1 bg-transparent px-4 text-foreground tabular-nums outline-none placeholder:text-muted-foreground",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
InputGroupInput.displayName = "InputGroupInput";

export { InputGroup, InputGroupAddon, InputGroupInput };
export type { InputGroupProps };
