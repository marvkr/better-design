import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

/**
 * Cream editorial SearchInput: the pale paper field with a muted magnifier
 * at its start. Once it holds a query and a clear handler is given, a quiet
 * square clear button appears at its end; the browser's own cross is hidden.
 */
const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, type = "search", value, onClear, ...props }, ref) => {
    const showClear = Boolean(onClear && value);

    return (
      <div data-slot="search-input" className="relative">
        <Icon
          icon="ph:magnifying-glass"
          aria-hidden="true"
          className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <input
          ref={ref}
          type={type}
          value={value}
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "ps-9 [&::-webkit-search-cancel-button]:appearance-none",
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
              "absolute end-1.5 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground",
              "transition-colors duration-fast ease-out",
              "hover:bg-secondary hover:text-foreground active:bg-muted",
              "outline-none focus-visible:ring-3 focus-visible:ring-ring",
            )}
          >
            <Icon icon="ph:x" className="size-3.5" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  },
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
export type { SearchInputProps };
