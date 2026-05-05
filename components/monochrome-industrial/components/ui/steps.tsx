import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

export interface Step {
 title: string
 description?: string
 icon?: string
}

export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
 steps: Step[]
 currentStep: number
 orientation?: "horizontal" | "vertical"
}

const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
 ({ className, steps, currentStep, orientation = "horizontal", ...props }, ref) => (
 <div
 ref={ref}
 className={cn(
 "flex",
 orientation === "horizontal" ? "flex-row items-start" : "flex-col",
 className
 )}
 {...props}
 >
 {steps.map((step, index) => {
 const isCompleted = index < currentStep
 const isCurrent = index === currentStep
 const isLast = index === steps.length - 1

 return (
 <div
 key={index}
 className={cn(
 "flex gap-3",
 orientation === "horizontal" ? "flex-1 flex-col items-start" : "flex-row"
 )}
 >
 <div
 className={cn(
 "flex items-start gap-3 w-full",
 orientation === "horizontal" ? "flex-row" : "flex-col"
 )}
 >
 <div className="flex flex-col items-center">
 <div
 className={cn(
 "flex h-8 w-8 items-center justify-center rounded-full border-2 shrink-0",
 "transition-[background-color,border-color,box-shadow] duration-200",
 isCompleted &&
 "bg-primary border-primary text-primary-foreground ",
 isCurrent &&
 "bg-popover border-primary text-primary ",
 !isCompleted && !isCurrent && "bg-card border-border text-muted-foreground"
 )}
 >
 {isCompleted ? (
 <Icon icon="tabler:check" className="h-4 w-4" />
 ) : step.icon ? (
 <Icon icon={step.icon} className="h-4 w-4" />
 ) : (
 <span className="text-xs font-semibold">{index + 1}</span>
 )}
 </div>
 {orientation === "vertical" && !isLast && (
 <div
 className={cn(
 "w-px flex-1 mt-1 mb-1 min-h-6",
 isCompleted ? "bg-primary" : "bg-border"
 )}
 />
 )}
 </div>
 <div className={cn(orientation === "vertical" && "pb-6", "flex-1 min-w-0")}>
 <div
 className={cn(
 "text-sm font-medium leading-none",
 isCurrent ? "text-foreground" : "text-muted-foreground"
 )}
 >
 {step.title}
 </div>
 {step.description && (
 <div className="mt-1 text-xs text-muted-foreground leading-relaxed">
 {step.description}
 </div>
 )}
 </div>
 </div>
 {orientation === "horizontal" && !isLast && (
 <div className="mt-4 hidden sm:block w-full">
 <div
 className={cn(
 "h-px w-full",
 index < currentStep ? "bg-primary" : "bg-border"
 )}
 />
 </div>
 )}
 </div>
 )
 })}
 </div>
 )
)
Steps.displayName = "Steps"

export { Steps }
