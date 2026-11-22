"use client"

import * as React from "react"
import { FileText, Upload, X } from "lucide-react"

import { cn } from "@/lib/utils"

/*
 * FileInput — a dashed recessed drop well; queued files sit on raised
 * bezel rows beneath it.
 */

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
        onClick={() => !disabled && inputRef.current?.click()}
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
          "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg p-8",
          "border border-dashed border-border bg-input [box-shadow:var(--shadow-inset)]",
          "transition-[border-color,box-shadow] duration-fast",
          isDragging && "border-ring/60 ring-2 ring-ring/35",
          !isDragging && "hover:border-ring/30",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border [background-image:var(--bezel)] [box-shadow:var(--shadow-raised)]">
          <Upload className="h-4.5 w-4.5 text-muted-foreground" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">
            Click to upload or drag and drop
          </p>
          {accept && (
            <p className="mt-0.5 text-xs text-muted-foreground">{accept}</p>
          )}
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
              className="flex items-center gap-3 rounded-md border border-border px-3 py-2 [background-image:var(--bezel)] [box-shadow:var(--shadow-raised)]"
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
                onClick={() => removeFile(i)}
                aria-label={`Remove ${file.name}`}
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
