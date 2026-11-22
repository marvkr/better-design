"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

/** Props for NativeSelect: the browser's own select element. */
export interface NativeSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

/**
 * Playful console NativeSelect: the browser's own select, dressed as a
 * console field. It is the same white well with a firm olive edge as every
 * input, with the browser arrow swapped for a muted caret at the end. The
 * list itself stays native, which suits long lists and phones.
 */
const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, children, ...props }, ref) => (
    <div data-slot="native-select-wrapper" className="relative w-full">
      <select
        ref={ref}
        data-slot="native-select"
        className={cn(
          formFieldBase,
          formFieldSingleLine,
          "peer cursor-pointer appearance-none pe-9 font-medium",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <Icon
        icon="ph:caret-down-bold"
        className="pointer-events-none absolute end-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground peer-disabled:text-(--foreground-disabled)"
        aria-hidden="true"
      />
    </div>
  ),
);
NativeSelect.displayName = "NativeSelect";

export { NativeSelect };
