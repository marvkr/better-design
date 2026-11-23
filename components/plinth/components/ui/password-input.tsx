"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"

/* Plinth Password Input: the recessed field with a quiet reveal key. */

export interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false)

    return (
      <div className="relative">
        <input
          ref={ref}
          type={visible ? "text" : "password"}
          className={cn(formFieldBase, formFieldSingleLine, "pr-10", className)}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className={cn(
            "absolute right-1.5 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md",
            "text-muted-foreground transition-colors duration-fast",
            "hover:bg-muted hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
        >
          {visible ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
        </button>
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"

// feather:eye
function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M1 12s4-8 11-8s11 8 11 8s-4 8-11 8s-11-8-11-8" /><circle cx="12" cy="12" r="3" /></g>
    </svg>
  )
}

// feather:eye-off
function EyeOffIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9 9 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" />
    </svg>
  )
}

export { PasswordInput }
