import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldSingleLine, searchPill } from "./_shared";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

/**
 * Bold retail SearchInput: the soft grey pill from the store header, with a
 * magnifier at its start. It turns white with a black edge on focus. Once it
 * holds a query and a clear handler is given, a round close button appears
 * at its end; the browser's own clear cross is hidden.
 */
const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, type = "search", value, onClear, ...props }, ref) => {
    const showClear = Boolean(onClear && value);

    return (
      <div data-slot="search-input" className="relative">
        <Icon
          icon="mingcute:search-line"
          aria-hidden="true"
          className="pointer-events-none absolute start-3.5 top-1/2 size-5 -translate-y-1/2 text-foreground"
        />
        <input
          ref={ref}
          type={type}
          value={value}
          className={cn(
            searchPill,
            formFieldSingleLine,
            "h-10 py-2 ps-11 [&::-webkit-search-cancel-button]:appearance-none",
            showClear && "pe-11",
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
              "absolute end-1.5 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground",
              "transition-colors duration-fast ease-out",
              "hover:bg-(--secondary-hover) hover:text-foreground",
              "outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
          >
            <Icon icon="mingcute:close-line" className="size-4" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  },
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
export type { SearchInputProps };
