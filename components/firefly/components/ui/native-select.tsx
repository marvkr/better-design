"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

export interface NativeSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

/**
 * Firefly NativeSelect: the browser's own select, dressed as a Firefly field.
 *
 * It is the same warm paper well behind a strong hairline as every input,
 * with the browser arrow replaced by a muted chevron at the end. The list
 * itself stays native, which suits long lists and phones.
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
        icon="carbon:chevron-down"
        className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground peer-disabled:text-(--foreground-disabled)"
        aria-hidden="true"
      />
    </div>
  ),
);
NativeSelect.displayName = "NativeSelect";

export { NativeSelect };
