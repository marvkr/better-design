import * as React from "react"
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels"
import { cn } from "@/lib/utils"

// NOTE: Per spec — do NOT use forwardRef on PanelGroup/Panel/PanelResizeHandle.
// Use them directly with wrapper components.

function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof PanelGroup>) {
  return (
    <PanelGroup
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className
      )}
      {...props}
    />
  )
}
ResizablePanelGroup.displayName = "ResizablePanelGroup"

const ResizablePanel = Panel

export interface ResizableHandleProps
  extends React.ComponentPropsWithoutRef<typeof PanelResizeHandle> {
  withHandle?: boolean
}

function ResizableHandle({ className, withHandle = false, ...props }: ResizableHandleProps) {
  return (
    <PanelResizeHandle
      className={cn(
        "relative flex w-px items-center justify-center bg-border",
        "after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
        "data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full",
        "data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1",
        "data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2",
        "data-[panel-group-direction=vertical]:after:translate-x-0",
        "hover:bg-border/60 transition-colors",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-5 w-3 items-center justify-center rounded-sm border border-border bg-background shadow-sm">
          <div className="flex flex-col gap-0.5">
            <div className="h-0.5 w-1.5 rounded-full bg-muted-foreground" />
            <div className="h-0.5 w-1.5 rounded-full bg-muted-foreground" />
            <div className="h-0.5 w-1.5 rounded-full bg-muted-foreground" />
          </div>
        </div>
      )}
    </PanelResizeHandle>
  )
}
ResizableHandle.displayName = "ResizableHandle"

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
