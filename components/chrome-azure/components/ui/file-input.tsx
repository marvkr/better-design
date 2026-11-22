"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
}

const UploadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    <path d="M12 15V3" />
    <path d="M7 8l5-5 5 5" />
  </svg>
)

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, label = "Choose file or drop here", helperText, ...props }, ref) => {
    const [fileName, setFileName] = React.useState<string | null>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)

    // SAFETY: the handle is read only after mount, when the element this
    // component renders is attached, so the ref is non-null.
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    return (
      <div className="w-full">
        <label
          className={cn(
            "group flex flex-col items-center justify-center gap-2 w-full py-6 px-4",
            "rounded-xl border border-dashed border-white/10",
            "bg-card text-card-foreground cursor-pointer",
            "transition-[background-color,box-shadow,border-color] duration-fast",
            "[box-shadow:var(--shadow-inset)]",
            "hover:border-ring/60 hover:bg-accent",
            className
          )}
        >
          {/* Raised azure knob holding the upload glyph. */}
          <span className="flex h-10 w-10 items-center justify-center rounded-full [background:var(--knob-on)] text-primary-foreground [box-shadow:var(--shadow-knob)]">
            <UploadIcon className="h-5 w-5" />
          </span>
          <span className="text-sm font-medium text-foreground">
            {fileName ?? label}
          </span>
          {helperText && (
            <span className="text-xs text-muted-foreground">{helperText}</span>
          )}
          <input
            ref={inputRef}
            type="file"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0]
              setFileName(file?.name ?? null)
              props.onChange?.(e)
            }}
            {...props}
          />
        </label>
      </div>
    )
  }
)
FileInput.displayName = "FileInput"

export { FileInput }
