"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

/*
 * Bevel FileInput.
 *
 * The drop target is the shared field well, grown tall and centred, because
 * this system has no borders to dash. The upload glyph sits in a raised
 * circle so one raised object stands inside one pressed one, and the chosen
 * file name replaces the prompt in place.
 */

/** Props for `FileInput`; `label` is the prompt shown until a file is picked. */
export interface FileInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      className,
      label = "Choose file or drop here",
      helperText,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [fileName, setFileName] = React.useState<string | null>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)

    // SAFETY: the handle is read only after mount, when the element this
    // component renders is attached, so the ref is non-null.
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    return (
      <div className="w-full">
        <label
          className={cn(
            formFieldBase,
            "flex h-auto cursor-pointer flex-col items-center justify-center gap-2.5 px-4 py-6 text-center",
            "focus-within:[box-shadow:var(--shadow-inset),0_0_0_0.125rem_var(--ring)]",
            className,
          )}
        >
          <span className="flex size-11 items-center justify-center rounded-full bg-card text-primary [box-shadow:var(--shadow-button)]">
            <Icon icon="solar:upload-linear" className="size-5" />
          </span>
          <span className="text-[0.9063rem] leading-[1.125rem] font-semibold tracking-[0.0188rem] text-foreground">
            {fileName ?? label}
          </span>
          {helperText && (
            <span className="text-[0.7813rem] leading-4 tracking-[0.0188rem] text-muted-foreground">
              {helperText}
            </span>
          )}
          <input
            ref={inputRef}
            type="file"
            className="sr-only"
            {...props}
            onChange={(e) => {
              const file = e.target.files?.[0]
              setFileName(file?.name ?? null)
              onChange?.(e)
            }}
          />
        </label>
      </div>
    )
  },
)
FileInput.displayName = "FileInput"

export { FileInput }
