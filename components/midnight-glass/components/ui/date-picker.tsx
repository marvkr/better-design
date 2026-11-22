"use client"

import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Midnight Glass Date Picker: glass pill trigger, glass calendar panel

interface DatePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  disabled,
  className,
}: DatePickerProps) {
  const formatted = value
    ? value.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : null

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal",
            "rounded-full border border-white/[0.08] backdrop-blur-xl bg-white/[0.05]",
            "shadow-[inset_0_0_0.375rem_oklch(1_0_0/0.05)]",
            "text-white/90 transition duration-fast",
            "hover:bg-white/[0.07] hover:border-white/[0.13]",
            "focus-visible:shadow-[inset_0_0_0.375rem_oklch(1_0_0/0.05),0_0_0_0.1875rem_oklch(1_0_0/0.2)] focus-visible:border-primary/50",
            !value && "text-white/40",
            className
          )}
        >
          <Icon icon="tabler:calendar" className="mr-2 h-4 w-4" />
          {formatted ?? placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-auto p-0 rounded-xl",
          "border border-white/[0.08] backdrop-blur-2xl bg-white/[0.07]",
          "shadow-[0_0.5rem_2rem_oklch(0_0_0/0.6),inset_0_0_0.375rem_oklch(1_0_0/0.05)]"
        )}
        align="start"
      >
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker }
export type { DatePickerProps }
