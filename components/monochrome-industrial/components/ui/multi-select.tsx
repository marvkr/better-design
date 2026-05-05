"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import {
 Command,
 CommandEmpty,
 CommandGroup,
 CommandInput,
 CommandItem,
 CommandList,
 CommandSeparator,
} from "./command"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

export interface MultiSelectOption {
 value: string
 label: string
}

export interface MultiSelectProps {
 options: MultiSelectOption[]
 value: string[]
 onValueChange: (value: string[]) => void
 placeholder?: string
 searchPlaceholder?: string
 emptyMessage?: string
 className?: string
 disabled?: boolean
 maxVisibleBadges?: number
}

const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
 (
 {
 options,
 value,
 onValueChange,
 placeholder = "Select options...",
 searchPlaceholder = "Search...",
 emptyMessage = "No results found.",
 className,
 disabled,
 maxVisibleBadges = 3,
 },
 ref
 ) => {
 const [open, setOpen] = React.useState(false)

 const toggle = (v: string) => {
 if (value.includes(v)) onValueChange(value.filter((x) => x !== v))
 else onValueChange([...value, v])
 }

 const selectedLabels = value
 .map((v) => options.find((o) => o.value === v)?.label)
 .filter(Boolean) as string[]

 return (
 <Popover open={open} onOpenChange={setOpen}>
 <PopoverTrigger asChild>
 <Button
 ref={ref}
 variant="outline"
 role="combobox"
 aria-expanded={open}
 disabled={disabled}
 className={cn("w-full justify-between font-normal h-auto min-h-9 py-1.5", className)}
 >
 <div className="flex flex-wrap gap-1 items-center">
 {selectedLabels.length === 0 && (
 <span className="text-muted-foreground">{placeholder}</span>
 )}
 {selectedLabels.slice(0, maxVisibleBadges).map((label) => (
 <span
 key={label}
 className={cn(
 "inline-flex items-center rounded-none px-1.5 py-0.5 text-xs",
 "bg-secondary text-secondary-foreground border border-border",
 ""
 )}
 >
 {label}
 </span>
 ))}
 {selectedLabels.length > maxVisibleBadges && (
 <span className="text-xs text-muted-foreground">
 +{selectedLabels.length - maxVisibleBadges} more
 </span>
 )}
 </div>
 <Icon
 icon="tabler:selector"
 className="ml-2 h-4 w-4 shrink-0 text-muted-foreground opacity-70"
 />
 </Button>
 </PopoverTrigger>
 <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
 <Command>
 <CommandInput placeholder={searchPlaceholder} />
 <CommandList>
 <CommandEmpty>{emptyMessage}</CommandEmpty>
 <CommandGroup>
 {options.map((option) => {
 const isSelected = value.includes(option.value)
 return (
 <CommandItem
 key={option.value}
 onSelect={() => toggle(option.value)}
 >
 <div
 className={cn(
 "mr-2 flex h-4 w-4 items-center justify-center rounded-none border",
 isSelected
 ? "bg-primary border-primary text-primary-foreground "
 : "border-border bg-input "
 )}
 >
 {isSelected && <Icon icon="tabler:check" className="h-3 w-3" />}
 </div>
 {option.label}
 </CommandItem>
 )
 })}
 </CommandGroup>
 {value.length > 0 && (
 <>
 <CommandSeparator />
 <CommandGroup>
 <CommandItem
 onSelect={() => onValueChange([])}
 className="justify-center text-center text-muted-foreground"
 >
 Clear selection
 </CommandItem>
 </CommandGroup>
 </>
 )}
 </CommandList>
 </Command>
 </PopoverContent>
 </Popover>
 )
 }
)
MultiSelect.displayName = "MultiSelect"

export { MultiSelect }
