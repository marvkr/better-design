"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"

export interface SearchInputProps
 extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
 onClear?: () => void
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
 ({ className, onClear, value, ...props }, ref) => {
 const hasValue = value !== undefined && value !== ""

 return (
 <div className="relative">
 <Icon
 icon="tabler:search"
 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
 />
 <input
 ref={ref}
 type="search"
 value={value}
 className={cn(
 formFieldBase,
 formFieldSingleLine,
 "pl-9",
 hasValue && onClear && "pr-9",
 "[&::-webkit-search-cancel-button]:appearance-none",
 className
 )}
 {...props}
 />
 {hasValue && onClear && (
 <button
 type="button"
 onClick={onClear}
 className={cn(
 "absolute right-2 top-1/2 -translate-y-1/2 rounded-none p-1",
 "text-muted-foreground transition-colors duration-150",
 "hover:text-foreground hover:bg-accent",
 "focus:outline-none focus:ring-2 focus:ring-ring/40"
 )}
 aria-label="Clear search"
 >
 <Icon icon="tabler:x" className="h-3.5 w-3.5" />
 </button>
 )}
 </div>
 )
 }
)
SearchInput.displayName = "SearchInput"

export { SearchInput }
