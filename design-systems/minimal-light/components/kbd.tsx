import * as React from "react"
import { cn } from "@/lib/utils"

// Luxe Kbd: keyboard key chip — secondary bg, border, subtle bottom shadow
// Feels like a real key: slightly raised with shadow-sm, small font, monospace

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

function Kbd({ className, children, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center",
        "h-5 min-w-[1.25rem] px-1.5",
        "rounded-md border border-border bg-secondary",
        "font-mono text-[11px] font-medium text-muted-foreground tracking-wider",
        "shadow-[0_1px_0_0_hsl(var(--border))]",
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  )
}

export { Kbd }
