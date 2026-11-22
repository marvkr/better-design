"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

export interface NativeSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

/**
 * Bold retail NativeSelect: the browser's own select, dressed as a checkout
 * field. The browser arrow gives way to a black chevron at the end. The list
 * stays native, which suits a long country list and phones.
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
          "peer cursor-pointer appearance-none pe-11",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <Icon
        icon="mingcute:down-line"
        className="pointer-events-none absolute end-4 top-1/2 size-5 -translate-y-1/2 text-foreground peer-disabled:text-(--foreground-disabled)"
        aria-hidden="true"
      />
    </div>
  ),
);
NativeSelect.displayName = "NativeSelect";

export { NativeSelect };
