"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Luxe TagInput: tag chips inside an input frame — secondary bg chip with remove x
// Enter or comma creates tags; backspace removes last; max optional

export interface TagInputProps {
  value?: string[]
  onChange?: (tags: string[]) => void
  placeholder?: string
  max?: number
  className?: string
  disabled?: boolean
}

function TagInput({
  value,
  onChange,
  placeholder = "Add tag…",
  max,
  className,
  disabled = false,
}: TagInputProps) {
  const [tags, setTags] = React.useState<string[]>(value ?? [])
  const [inputValue, setInputValue] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const controlled = value !== undefined
  const current = controlled ? value : tags

  const addTag = (raw: string) => {
    const tag = raw.trim()
    if (!tag || current.includes(tag)) return
    if (max !== undefined && current.length >= max) return
    const next = [...current, tag]
    if (!controlled) setTags(next)
    onChange?.(next)
    setInputValue("")
  }

  const removeTag = (index: number) => {
    const next = current.filter((_, i) => i !== index)
    if (!controlled) setTags(next)
    onChange?.(next)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag(inputValue)
    } else if (e.key === "Backspace" && !inputValue && current.length > 0) {
      removeTag(current.length - 1)
    }
  }

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={cn(
        "flex min-h-10 w-full flex-wrap gap-1.5 rounded-xl border border-border bg-secondary px-3 py-2",
        "transition-colors duration-200 hover:bg-accent cursor-text",
        "focus-within:ring-1 focus-within:ring-ring focus-within:border-primary/30",
        disabled && "cursor-not-allowed opacity-40 pointer-events-none",
        className
      )}
    >
      {current.map((tag, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1 rounded-lg bg-muted border border-border px-2 py-0.5 text-xs font-medium text-foreground tracking-wide"
        >
          {tag}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); removeTag(i) }}
            aria-label={`Remove ${tag}`}
            className="ml-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => inputValue && addTag(inputValue)}
        placeholder={current.length === 0 ? placeholder : undefined}
        disabled={disabled}
        className={cn(
          "flex-1 min-w-[80px] bg-transparent text-sm text-foreground placeholder:text-muted-foreground",
          "outline-none focus:outline-none"
        )}
      />
    </div>
  )
}

export { TagInput }
