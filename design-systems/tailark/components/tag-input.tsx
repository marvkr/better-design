"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TagInputProps {
  tags?: string[]
  onTagsChange?: (tags: string[]) => void
  placeholder?: string
  disabled?: boolean
  maxTags?: number
  className?: string
}

function TagInput({
  tags: controlledTags,
  onTagsChange,
  placeholder = "Add tag, press Enter…",
  disabled,
  maxTags,
  className,
}: TagInputProps) {
  const [internalTags, setInternalTags] = React.useState<string[]>([])
  const [input, setInput] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const isControlled = controlledTags !== undefined
  const tags = isControlled ? controlledTags : internalTags

  function updateTags(next: string[]) {
    if (!isControlled) setInternalTags(next)
    onTagsChange?.(next)
  }

  function addTag(raw: string) {
    const tag = raw.trim()
    if (!tag || tags.includes(tag)) return
    if (maxTags !== undefined && tags.length >= maxTags) return
    updateTags([...tags, tag])
    setInput("")
  }

  function removeTag(tag: string) {
    updateTags(tags.filter((t) => t !== tag))
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag(input)
    } else if (e.key === "Backspace" && !input && tags.length > 0) {
      removeTag(tags[tags.length - 1])
    }
  }

  return (
    <div
      className={cn(
        "flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-[10px] border border-border bg-card px-3 py-2",
        "ring-offset-background transition-colors",
        "focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-0",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {tags.map((tag) => (
        <span
          key={tag}
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
            "bg-primary/20 text-primary border border-primary/30"
          )}
        >
          {tag}
          <button
            type="button"
            aria-label={`Remove ${tag}`}
            onClick={(e) => {
              e.stopPropagation()
              removeTag(tag)
            }}
            className="hover:text-primary/70 transition-colors ml-0.5 focus:outline-none"
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => input && addTag(input)}
        placeholder={tags.length === 0 ? placeholder : ""}
        disabled={disabled}
        className={cn(
          "min-w-[120px] flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50",
          "focus:outline-none"
        )}
      />
    </div>
  )
}

export { TagInput }
