import * as React from "react"
import { cn } from "@/lib/utils"

import { BorderBeam } from "./border-beam"
import { formFieldBase, formFieldSingleLine } from "./_shared"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  beam?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, beam = true, ...props }, ref) => {
    const input = (
      <input
        type={type}
        className={cn(
          formFieldBase,
          formFieldSingleLine,
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className,
        )}
        ref={ref}
        {...props}
      />
    )

    if (!beam) return input

    return (
      <BorderBeam size="line" colorVariant="colorful" theme="dark" className="block w-full">
        {input}
      </BorderBeam>
    )
  },
)
Input.displayName = "Input"

export { Input }
