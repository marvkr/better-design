"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

export interface NativeSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

/**
 * Cream editorial NativeSelect: the browser's own select in the paper field.
 *
 * It is the same pale box behind a warm hairline as every input, with the
 * browser arrow swapped for a caption-ink caret at the end. The list itself
 * stays native, which suits long lists and phones.
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
          "peer cursor-pointer appearance-none pe-9",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <Icon
        icon="ph:caret-down"
        className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground peer-disabled:text-(--foreground-disabled)"
        aria-hidden="true"
      />
    </div>
  ),
);
NativeSelect.displayName = "NativeSelect";

export { NativeSelect };
