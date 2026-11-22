"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// Neon Vault Tag Input: a recessed multi-tag track sunk into the vault
// surface, like the DS's multi-line fields. Tags are magenta-washed pills;
// focus lights the magenta ring.

interface TagInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  value?: string[]
  onChange?: (tags: string[]) => void
  placeholder?: string
  maxTags?: number
}

function TagInput({
  value = [],
  onChange,
  placeholder = "Add tag...",
  maxTags,
  className,
  disabled,
  ...props
}: TagInputProps) {
  const [input, setInput] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const addTag = (tag: string) => {
    const trimmed = tag.trim()
    if (
      trimmed &&
      !value.includes(trimmed) &&
      (!maxTags || value.length < maxTags)
    ) {
      onChange?.([...value, trimmed])
      setInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    onChange?.(value.filter((t) => t !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
        "flex min-h-10 w-full flex-wrap gap-1.5 rounded-xl border border-border bg-input px-3 py-2",
        "[box-shadow:var(--shadow-inset)]",
        "transition-[color,box-shadow,border-color] duration-fast",
        "hover:border-ring/35 focus-within:border-ring/60 focus-within:ring-2 focus-within:ring-ring/40",
        "cursor-text",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {value.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary-bright"
        >
          {tag}
          {!disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                removeTag(tag)
              }}
              className="text-primary-bright/60 hover:text-primary-bright"
            >
              <Icon icon="ph:x" className="h-3 w-3" />
            </button>
          )}
        </span>
      ))}
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => addTag(input)}
        placeholder={value.length === 0 ? placeholder : undefined}
        disabled={disabled || (maxTags !== undefined && value.length >= maxTags)}
        className="min-w-[7.5rem] flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
        {...props}
      />
    </div>
  )
}

export { TagInput }
export type { TagInputProps }
