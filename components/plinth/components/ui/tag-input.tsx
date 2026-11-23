"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Plinth Tag Input: a recessed well that holds raised graphite chips, with
 * the typing caret after the last chip.
 */

export interface TagInputProps {
  value: string[]
  onValueChange: (tags: string[]) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  maxTags?: number
}

const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
  ({ value, onValueChange, placeholder = "Add tag", className, disabled, maxTags }, ref) => {
    const [input, setInput] = React.useState("")

    const addTag = (tag: string) => {
      const trimmed = tag.trim()
      if (!trimmed || value.includes(trimmed)) return
      if (maxTags && value.length >= maxTags) return
      onValueChange([...value, trimmed])
      setInput("")
    }

    const removeTag = (tag: string) => onValueChange(value.filter((t) => t !== tag))

    return (
      <div
        className={cn(
          "flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-lg px-1.5 py-1.5",
          "bg-input border border-transparent [box-shadow:var(--shadow-inset)]",
          "transition-[border-color,box-shadow] duration-fast hover:border-border",
          "focus-within:border-ring/70 focus-within:ring-2 focus-within:ring-ring/30",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex h-6 items-center gap-1 rounded-md pl-2 pr-0.5 text-xs text-secondary-foreground [background:var(--segment-gradient)] [box-shadow:var(--shadow-segment)]"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              disabled={disabled}
              aria-label={`Remove ${tag}`}
              className="flex size-5 items-center justify-center rounded-[0.3125rem] text-muted-foreground transition-colors duration-fast hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <XIcon className="size-3" />
            </button>
          </span>
        ))}
        <input
          ref={ref}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault()
              addTag(input)
            } else if (e.key === "Backspace" && !input && value.length > 0) {
              removeTag(value[value.length - 1])
            }
          }}
          placeholder={value.length === 0 ? placeholder : ""}
          aria-label={placeholder}
          disabled={disabled}
          className="min-w-[5rem] flex-1 bg-transparent px-1.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>
    )
  }
)
TagInput.displayName = "TagInput"

// feather:x
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}

export { TagInput }
