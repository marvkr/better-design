"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { raisedSurface } from "./_shared";

/**
 * Paddock FileInput: a dashed drop zone with a soft corner. A small raised
 * white square holds the upload icon, and the zone turns white on hover so
 * it reads as a place to put a file.
 */
export interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, label = "Choose a file or drop it here", helperText, onChange, ...props }, ref) => {
    const [fileName, setFileName] = React.useState<string | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    // SAFETY: the handle is read only after mount, when the element this
    // component renders is attached, so the ref is non-null.
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    return (
      <div data-slot="file-input" className="w-full">
        <label
          className={cn(
            "group flex w-full cursor-pointer flex-col items-center justify-center gap-2 px-4 py-7",
            "rounded-xl border border-dashed border-input bg-transparent",
            "transition-[background-color,border-color] duration-fast ease-out",
            "hover:bg-card",
            "has-focus-visible:ring-2 has-focus-visible:ring-ring",
            "has-disabled:cursor-not-allowed has-disabled:opacity-50",
            className,
          )}
        >
          <span className={cn("flex size-10 items-center justify-center rounded-md", raisedSurface)}>
            <Icon icon="mingcute:upload-2-line" aria-hidden className="size-4.5" />
          </span>
          <span className="text-sm font-medium text-foreground">{fileName ?? label}</span>
          {helperText && <span className="text-xs text-muted-foreground">{helperText}</span>}
          <input
            ref={inputRef}
            type="file"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setFileName(file?.name ?? null);
              onChange?.(e);
            }}
            {...props}
          />
        </label>
      </div>
    );
  },
);
FileInput.displayName = "FileInput";

export { FileInput };
