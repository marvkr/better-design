"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"

export interface InlineEditProps {
 value: string
 onValueChange: (value: string) => void
 placeholder?: string
 className?: string
 displayClassName?: string
 disabled?: boolean
}

const InlineEdit = React.forwardRef<HTMLInputElement, InlineEditProps>(
 ({ value, onValueChange, placeholder = "Click to edit", className, displayClassName, disabled }, ref) => {
 const [editing, setEditing] = React.useState(false)
 const [draft, setDraft] = React.useState(value)
 const inputRef = React.useRef<HTMLInputElement>(null)

 React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

 React.useEffect(() => {
 if (editing) inputRef.current?.focus()
 }, [editing])

 const commit = () => {
 onValueChange(draft)
 setEditing(false)
 }

 const cancel = () => {
 setDraft(value)
 setEditing(false)
 }

 if (editing) {
 return (
 <input
 ref={inputRef}
 value={draft}
 onChange={(e) => setDraft(e.target.value)}
 onBlur={commit}
 onKeyDown={(e) => {
 if (e.key === "Enter") commit()
 else if (e.key === "Escape") cancel()
 }}
 placeholder={placeholder}
 className={cn(formFieldBase, formFieldSingleLine, className)}
 />
 )
 }

 return (
 <button
 type="button"
 onClick={() => !disabled && setEditing(true)}
 disabled={disabled}
 className={cn(
 "group inline-flex items-center gap-2 rounded-none px-2 py-1 text-sm text-left",
 "transition-[background-color,box-shadow] duration-150",
 "hover:bg-accent hover:",
 "focus:outline-none focus:ring-2 focus:ring-ring/40",
 "disabled:cursor-not-allowed disabled:opacity-50",
 displayClassName
 )}
 >
 <span className={cn(!value && "text-muted-foreground")}>{value || placeholder}</span>
 <Icon
 icon="tabler:pencil"
 className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity duration-150 group-hover:opacity-100"
 />
 </button>
 )
 }
)
InlineEdit.displayName = "InlineEdit"

export { InlineEdit }
