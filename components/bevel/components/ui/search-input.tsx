"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"

/*
 * Bevel SearchInput.
 *
 * The shared field well with a magnifier in the left gutter and a clear
 * target that appears only once there is something to clear. The platform's
 * own cancel button is stripped, so the control looks the same in every
 * browser.
 */

/** Props for `SearchInput`; pass `onClear` to show the clear target. */
export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  onClear?: () => void
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onClear, value, ...props }, ref) => {
    const hasValue = value !== undefined && value !== ""

    return (
      <div className="relative w-full">
        <Icon
          icon="solar:magnifier-linear"
          className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <input
          ref={ref}
          type="search"
          value={value}
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "pl-10 text-[0.9063rem] leading-[1.125rem] tracking-[0.0188rem]",
            hasValue && onClear && "pr-11",
            "[&::-webkit-search-cancel-button]:appearance-none",
            className,
          )}
          {...props}
        />
        {hasValue && onClear && (
          <button
            type="button"
            onClick={onClear}
            className={cn(
              "absolute top-1/2 right-2 flex size-7 -translate-y-1/2 items-center justify-center rounded-[0.5rem]",
              "text-muted-foreground transition-colors duration-fast ease-out",
              "hover:bg-muted hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
            aria-label="Clear search"
          >
            <Icon icon="solar:close-circle-linear" className="size-4" />
          </button>
        )}
      </div>
    )
  },
)
SearchInput.displayName = "SearchInput"

export { SearchInput }
