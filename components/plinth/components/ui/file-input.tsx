"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/*
 * Plinth File Input: a recessed drop well, like the editor's source slot.
 * Dragging a file over it draws the ember ring; each picked file sits on its
 * own row with a thumbnail tile and a readout of its size.
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
    const kept = maxSize ? newFiles.filter((f) => f.size <= maxSize) : newFiles
    const next = multiple ? [...files, ...kept] : kept
    setFiles(next)
    onFileChange?.(next)
  }

  const removeFile = (index: number) => {
    const next = files.filter((_, i) => i !== index)
    setFiles(next)
    onFileChange?.(next)
  }

  const open = () => {
    if (!disabled) inputRef.current?.click()
  }

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        onClick={open}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            open()
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
          if (!disabled) handleFiles(Array.from(e.dataTransfer.files))
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl px-6 py-8",
          "bg-input [box-shadow:var(--shadow-inset)] border border-dashed border-[oklch(1_0_0/0.12)]",
          "transition-[border-color,box-shadow] duration-fast",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          isDragging ? "border-ring" : "hover:border-[oklch(1_0_0/0.22)]",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <span className="flex size-10 items-center justify-center rounded-lg [background:var(--graphite-gradient)] [box-shadow:var(--shadow-button)] text-secondary-foreground">
          <UploadIcon className="size-4" />
        </span>
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="text-sm font-medium text-foreground">Drop a file or click to browse</p>
          {(accept || maxSize) && (
            <p className="font-mono text-[0.6875rem] uppercase text-muted-foreground">
              {[accept, maxSize ? `Max ${Math.round(maxSize / 1024 / 1024)} MB` : null]
                .filter(Boolean)
                .join(" / ")}
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
        <ul className="flex flex-col gap-1.5">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-2 py-2"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-input text-muted-foreground [box-shadow:var(--shadow-inset)]">
                <FileIcon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-foreground">{file.name}</p>
                <p className="font-mono text-[0.6875rem] uppercase text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeFile(i)}
                aria-label={`Remove ${file.name}`}
                className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors duration-fast hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <XIcon className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// feather:upload
function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m14-7l-5-5l-5 5m5-5v12" />
    </svg>
  )
}

// feather:file
function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M13 2v7h7" /></g>
    </svg>
  )
}

// feather:x
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}

export { FileInput }
export type { FileInputProps }
