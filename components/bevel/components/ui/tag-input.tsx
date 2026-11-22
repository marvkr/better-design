"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

/*
 * Bevel TagInput.
 *
 * The shared field well, grown to wrap its tags instead of scrolling them.
 * Each tag is the system's inner surface at the 8px step with its own remove
 * target. Enter and comma commit a tag, backspace on an empty box takes the
 * last one back.
 */

/** Props for `TagInput`, a field whose value is a list of tags. */
export interface TagInputProps {
  value: string[]
  onValueChange: (tags: string[]) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  /** Stops accepting new tags once the list reaches this length. */
  maxTags?: number
}

const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
  (
    {
      value,
      onValueChange,
      placeholder = "Add tag...",
      className,
      disabled,
      maxTags,
    },
    ref,
  ) => {
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
          formFieldBase,
          "flex h-auto min-h-10 flex-wrap items-center gap-1.5 px-2 py-1.5",
          "focus-within:[box-shadow:var(--shadow-inset),0_0_0_0.125rem_var(--ring)]",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
      >
        {value.map((tag) => (
          <span
            key={tag}
            className={cn(
              "inline-flex items-center gap-1 rounded-[0.5rem] py-0.5 pr-1 pl-2",
              "text-[0.7813rem] leading-4 font-semibold tracking-[0.0188rem]",
              "bg-[var(--inner)] text-[var(--strong)] [box-shadow:var(--shadow-ring)]",
            )}
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className={cn(
                "flex size-4 items-center justify-center rounded-full",
                "text-muted-foreground transition-colors duration-fast ease-out",
                "hover:bg-muted hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
              aria-label={`Remove ${tag}`}
              disabled={disabled}
            >
              <Icon icon="solar:close-circle-linear" className="size-3.5" />
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
          className={cn(
            "min-w-[5rem] flex-1 bg-transparent px-1.5 outline-none",
            "text-[0.9063rem] leading-[1.125rem] tracking-[0.0188rem] text-foreground",
            "placeholder:text-muted-foreground",
          )}
        />
      </div>
    )
  },
)
TagInput.displayName = "TagInput"

export { TagInput }
