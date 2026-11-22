import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

/** Props for SearchInput: a search field with an optional clear handler. */
interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

/**
 * Playful console SearchInput: the white well with a muted magnifier at its
 * start. Once it holds a query and a clear handler is given, a small square
 * clear button appears at its end; the browser's own clear cross is hidden.
 */
const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, type = "search", value, onClear, ...props }, ref) => {
    const showClear = Boolean(onClear && value);

    return (
      <div data-slot="search-input" className="relative">
        <Icon
          icon="ph:magnifying-glass-duotone"
          aria-hidden="true"
          className="pointer-events-none absolute start-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <input
          ref={ref}
          type={type}
          value={value}
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "ps-8.5 [&::-webkit-search-cancel-button]:appearance-none",
            showClear && "pe-10",
            className,
          )}
          {...props}
        />
        {showClear && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search"
            className={cn(
              "absolute end-1 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground",
              "transition-colors duration-fast ease-out",
              "hover:bg-secondary hover:text-foreground active:bg-(--surface-3)",
              "focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring",
            )}
          >
            <Icon icon="ph:x-bold" className="size-3.5" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  },
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
export type { SearchInputProps };
