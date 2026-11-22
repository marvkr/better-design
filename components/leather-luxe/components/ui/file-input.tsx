"use client"

import * as React from "react"
import { FileText, Upload, X } from "lucide-react"

import { cn } from "@/lib/utils"

// Leather Luxe File Input: a stitched drop zone, the dashed border doubling
// as the leather seam; accepted files appear as raised chips.

interface FileInputProps extends React.HTMLAttributes<HTMLDivElement> {
  accept?: string
  multiple?: boolean
  onFileChange?: (files: File[]) => void
  disabled?: boolean
  maxSize?: number // in bytes
}

function FileInput({
  accept,
  multiple,
  onFileChange,
  disabled,
  maxSize,
  className,
  ...props
}: FileInputProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const [files, setFiles] = React.useState<File[]>([])
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleFiles = (newFiles: File[]) => {
    const filtered = maxSize
      ? newFiles.filter((f) => f.size <= maxSize)
      : newFiles
    const updated = multiple ? [...files, ...filtered] : filtered
    setFiles(updated)
    onFileChange?.(updated)
  }

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index)
    setFiles(updated)
    onFileChange?.(updated)
  }

  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-label="Upload a file: click, or press Enter or Space, or drag and drop"
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => {
          if (disabled) return
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
        onDragOver={(e) => {
          e.preventDefault()
          if (!disabled) setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          if (!disabled) {
            handleFiles(Array.from(e.dataTransfer.files))
          }
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-3 p-8",
          "rounded-xl border border-dashed border-highlight",
          "bg-well [box-shadow:var(--shadow-well)]",
          "transition-[border-color,background-color] duration-base",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
          isDragging && "border-primary/70 bg-primary/10",
          !isDragging && "hover:border-[oklch(1_0_0/0.18)]",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full",
            "[background-image:var(--gradient-raised)] border border-highlight",
            "[box-shadow:var(--shadow-raised-sm)]"
          )}
        >
          <Upload className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">
            Click to upload or drag and drop
          </p>
          {accept && <p className="mt-0.5 text-xs text-muted-foreground">{accept}</p>}
          {maxSize && (
            <p className="mt-0.5 text-xs text-muted-foreground">
              Max {Math.round(maxSize / 1024 / 1024)}MB
            </p>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="hidden"
          onChange={(e) => handleFiles(Array.from(e.target.files ?? []))}
        />
      </div>

      {files.length > 0 && (
        <div className="flex flex-col gap-2">
          {files.map((file, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center gap-3 rounded-full px-3 py-2",
                "[background-image:var(--gradient-raised)] border border-highlight",
                "[box-shadow:var(--shadow-raised-sm)]"
              )}
            >
              <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-foreground">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                type="button"
                aria-label={`Remove ${file.name}`}
                onClick={() => removeFile(i)}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export { FileInput }
export type { FileInputProps }
