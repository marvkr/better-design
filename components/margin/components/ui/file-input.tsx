"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

/**
 * Margin FileInput: a grey drop zone with a dashed hairline edge and a small
 * paper tab holding the upload icon. Its edge turns oxblood on hover.
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
            "group flex w-full cursor-pointer flex-col items-center justify-center gap-2 px-4 py-6",
            "rounded-xl border border-dashed border-input bg-muted",
            "transition-colors duration-fast ease-(--ease-out) hover:border-primary/45 hover:bg-(--mark)/40",
            "has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring",
            "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
            className,
          )}
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-card text-muted-foreground shadow-sm">
            <Icon icon="solar:upload-minimalistic-linear" className="size-4" aria-hidden />
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
