"use client"

import * as React from "react"
import { Toaster as SonnerPrimitive, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
 return (
 <SonnerPrimitive
 theme="dark"
 className="toaster group"
 toastOptions={{
 classNames: {
 toast:
 "group toast group-[.toaster]:bg-popover group-[.toaster]:text-popover-foreground group-[.toaster]:border group-[.toaster]:border-border group-[.toaster]:rounded-none group-[.toaster]:",
 description: "group-[.toast]:text-muted-foreground",
 actionButton:
 "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-none group-[.toast]:",
 cancelButton:
 "group-[.toast]:bg-secondary group-[.toast]:text-secondary-foreground group-[.toast]:rounded-none",
 },
 }}
 {...props}
 />
 )
}

export { Toaster }
