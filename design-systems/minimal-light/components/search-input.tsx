"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Luxe SearchInput: rounded-xl input with search icon prefix and clear button
// Clear appears only when there is a value — clean, no visual clutter

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value?: string
  onChange?: (value: string) => void
  onClear?: () => void
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onChange, onClear, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value)
    }

    const handleClear = () => {
      onChange?.("")
      onClear?.()
    }

    return (
      <div className="relative flex items-center">
        {/* Search icon */}
        <span className="pointer-events-none absolute left-3.5 flex items-center text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </span>
        <input
          ref={ref}
          type="search"
          value={value}
          onChange={handleChange}
          className={cn(
            "flex h-10 w-full rounded-xl border border-border bg-secondary pl-10 pr-10 py-2 text-sm",
            "text-foreground placeholder:text-muted-foreground",
            "transition-colors duration-200",
            "hover:border-border/80 hover:bg-accent",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0",
            "focus-visible:border-primary/30",
            "disabled:cursor-not-allowed disabled:opacity-40",
            // Remove native search clear button
            "[&::-webkit-search-cancel-button]:hidden",
            className
          )}
          {...props}
        />
        {/* Clear button */}
        {value && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className={cn(
              "absolute right-3 flex h-5 w-5 items-center justify-center rounded-md",
              "text-muted-foreground transition-colors duration-200 hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>
    )
  }
)
SearchInput.displayName = "SearchInput"

export { SearchInput }
