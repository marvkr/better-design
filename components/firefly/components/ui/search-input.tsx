import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

/**
 * Firefly SearchInput: the warm field with a muted magnifier at its start.
 * Once it holds a query and a clear handler is given, a round ghost close
 * button appears at its end; the browser's own clear cross is hidden.
 */
const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, type = "search", value, onClear, ...props }, ref) => {
    const showClear = Boolean(onClear && value);

    return (
      <div data-slot="search-input" className="relative">
        <Icon
          icon="carbon:search"
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
              "absolute end-1 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground",
              "transition-colors duration-fast ease-out",
              "hover:bg-secondary hover:text-foreground active:bg-(--surface-3)",
              "focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring",
            )}
          >
            <Icon icon="carbon:close" className="size-4" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  },
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
export type { SearchInputProps };
