"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

export interface TagInputProps {
 value: string[]
 onValueChange: (tags: string[]) => void
 placeholder?: string
 className?: string
 disabled?: boolean
 maxTags?: number
}

const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
 ({ value, onValueChange, placeholder = "Add tag...", className, disabled, maxTags }, ref) => {
 const [input, setInput] = React.useState("")

 const addTag = (tag: string) => {
 const trimmed = tag.trim()
 if (!trimmed || value.includes(trimmed)) return
 if (maxTags && value.length >= maxTags) return
 onValueChange([...value, trimmed])
 setInput("")
 }

 const removeTag = (tag: string) => {
 onValueChange(value.filter((t) => t !== tag))
 }

 const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
 if (e.key === "Enter" || e.key === ",") {
 e.preventDefault()
 addTag(input)
 } else if (e.key === "Backspace" && !input && value.length > 0) {
 removeTag(value[value.length - 1])
 }
 }

 return (
 <div
 className={cn(
 "flex flex-wrap items-center gap-1.5 w-full min-h-9 rounded-none px-2 py-1.5",
 "bg-input border border-border ",
 "transition-[border-color,box-shadow] duration-150",
 "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/40",
 disabled && "opacity-50 cursor-not-allowed",
 className
 )}
 >
 {value.map((tag) => (
 <span
 key={tag}
 className={cn(
 "inline-flex items-center gap-1 rounded-none px-2 py-0.5 text-xs",
 "bg-secondary text-secondary-foreground border border-border",
 ""
 )}
 >
 {tag}
 <button
 type="button"
 onClick={() => removeTag(tag)}
 className={cn(
 "rounded-none p-0.5 text-muted-foreground",
 "transition-colors duration-150",
 "hover:text-foreground hover:bg-accent",
 "focus:outline-none focus:ring-1 focus:ring-ring/40"
 )}
 aria-label={`Remove ${tag}`}
 disabled={disabled}
 >
 <Icon icon="tabler:x" className="h-3 w-3" />
 </button>
 </span>
 ))}
 <input
 ref={ref}
 type="text"
 value={input}
 onChange={(e) => setInput(e.target.value)}
 onKeyDown={onKeyDown}
 placeholder={value.length === 0 ? placeholder : ""}
 disabled={disabled}
 className="flex-1 min-w-[80px] bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
 />
 </div>
 )
 }
)
TagInput.displayName = "TagInput"

export { TagInput }
