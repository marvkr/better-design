import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * IconButton — square button meant for a single icon. Mirrors Button's shadow language
 * but sized for icons. Provide `aria-label` for accessibility.
 */

const iconButtonVariants = cva(
 [
 "inline-flex items-center justify-center shrink-0",
 "rounded-none cursor-pointer select-none",
 "transition-[background-color,box-shadow,transform,color] duration-150",
 "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
 "disabled:pointer-events-none disabled:opacity-50",
 "active:translate-y-px active:",
 ].join(" "),
 {
 variants: {
 variant: {
 default:
 "bg-secondary text-secondary-foreground hover:bg-accent hover:text-foreground hover:",
 primary:
 "bg-primary text-primary-foreground hover:brightness-105",
 ghost:
 "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground",
 outline:
 "bg-transparent text-foreground border border-border hover:bg-accent hover:border-ring/30",
 destructive:
 "bg-destructive text-destructive-foreground hover:brightness-105",
 },
 size: {
 sm: "h-7 w-7 [&>svg]:h-3.5 [&>svg]:w-3.5",
 default: "h-9 w-9 [&>svg]:h-4 [&>svg]:w-4",
 lg: "h-10 w-10 [&>svg]:h-5 [&>svg]:w-5",
 },
 },
 defaultVariants: {
 variant: "default",
 size: "default",
 },
 }
)

export interface IconButtonProps
 extends React.ButtonHTMLAttributes<HTMLButtonElement>,
 VariantProps<typeof iconButtonVariants> {
 "aria-label": string
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
 ({ className, variant, size, ...props }, ref) => (
 <button
 ref={ref}
 type={props.type ?? "button"}
 className={cn(iconButtonVariants({ variant, size, className }))}
 {...props}
 />
 )
)
IconButton.displayName = "IconButton"

export { IconButton, iconButtonVariants }
