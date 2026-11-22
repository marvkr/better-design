import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

/**
 * Airy docs SearchInput: the docs search pill. A pale tray with a full round
 * end and a muted magnifier at its start, so it reads as "search the docs"
 * rather than a form field. Once it holds a query and a clear handler is
 * given, a small clear button appears at its end.
 */
const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, type = "search", value, onClear, ...props }, ref) => {
    const showClear = Boolean(onClear && value);

    return (
      <div data-slot="search-input" className="relative">
        <Icon
          icon="feather:search"
          aria-hidden="true"
          className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <input
          ref={ref}
          type={type}
          value={value}
          className={cn(
            formFieldBase,
            formFieldSingleLine,
            "h-9 rounded-full border-border bg-secondary ps-10 [&::-webkit-search-cancel-button]:appearance-none",
            "focus-visible:bg-(--field)",
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
              "absolute end-1.5 top-1/2 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground",
              "transition-colors duration-fast ease-out",
              "hover:bg-muted hover:text-foreground",
              "outline-none focus-visible:ring-3 focus-visible:ring-ring",
            )}
          >
            <Icon icon="feather:x" className="size-3.5" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  },
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
export type { SearchInputProps };
