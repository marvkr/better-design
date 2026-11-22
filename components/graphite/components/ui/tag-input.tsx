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
      // Don't intercept Enter/comma while an IME composition is active.
      if (e.nativeEvent.isComposing) return
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
          "flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-lg px-2 py-1.5",
          "border-0 bg-input text-foreground [box-shadow:var(--shadow-inset)]",
          "transition-[color,box-shadow] duration-fast",
          "focus-within:[box-shadow:var(--shadow-inset),0_0_0_0.125rem_oklch(1_0_0_/_0.2)]",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        {value.map((tag) => (
          <span
            key={tag}
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs",
              "bg-[image:var(--pill-gradient)] text-primary-foreground",
              "[box-shadow:var(--shadow-pill)]"
            )}
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className={cn(
                "rounded-full p-0.5 text-primary-foreground/70",
                "transition-colors duration-fast",
                "hover:text-primary-foreground",
                "focus:outline-none focus-visible:[box-shadow:0_0_0_0.125rem_oklch(1_0_0_/_0.2)]"
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
          className="min-w-[5rem] flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
        />
      </div>
    )
  }
)
TagInput.displayName = "TagInput"

export { TagInput }
