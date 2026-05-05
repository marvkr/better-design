"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "./button"

export interface CopyButtonProps extends Omit<ButtonProps, "children"> {
 value: string
 copiedLabel?: string
 label?: string
}

const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
 ({ value, copiedLabel = "Copied", label = "Copy", size = "icon", ...props }, ref) => {
 const [copied, setCopied] = React.useState(false)

 const copy = async () => {
 try {
 await navigator.clipboard.writeText(value)
 setCopied(true)
 setTimeout(() => setCopied(false), 2000)
 } catch {
 // Silent fail — copy is best-effort
 }
 }

 return (
 <Button
 ref={ref}
 size={size}
 onClick={copy}
 aria-label={copied ? copiedLabel : label}
 {...props}
 >
 <Icon
 icon={copied ? "tabler:check" : "tabler:copy"}
 className={cn("h-4 w-4", copied && "text-primary")}
 />
 {size !== "icon" && <span className="ml-2">{copied ? copiedLabel : label}</span>}
 </Button>
 )
 }
)
CopyButton.displayName = "CopyButton"

export { CopyButton }
