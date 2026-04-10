"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface DialCode {
  code: string
  dial: string
  flag: string
}

const DEFAULT_DIAL_CODES: DialCode[] = [
  { code: "US", dial: "+1", flag: "🇺🇸" },
  { code: "GB", dial: "+44", flag: "🇬🇧" },
  { code: "CA", dial: "+1", flag: "🇨🇦" },
  { code: "AU", dial: "+61", flag: "🇦🇺" },
  { code: "DE", dial: "+49", flag: "🇩🇪" },
  { code: "FR", dial: "+33", flag: "🇫🇷" },
  { code: "IN", dial: "+91", flag: "🇮🇳" },
  { code: "CN", dial: "+86", flag: "🇨🇳" },
  { code: "JP", dial: "+81", flag: "🇯🇵" },
  { code: "BR", dial: "+55", flag: "🇧🇷" },
]

export interface PhoneInputProps {
  value?: string
  onValueChange?: (value: string) => void
  dialCodes?: DialCode[]
  defaultDialCode?: string
  placeholder?: string
  disabled?: boolean
  className?: string
}

function PhoneInput({
  value: controlledValue,
  onValueChange,
  dialCodes = DEFAULT_DIAL_CODES,
  defaultDialCode = "+1",
  placeholder = "000 000 0000",
  disabled,
  className,
}: PhoneInputProps) {
  const [dialCode, setDialCode] = React.useState(defaultDialCode)
  const [phone, setPhone] = React.useState("")
  const [open, setOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  function emit(d: string, p: string) {
    onValueChange?.(`${d}${p}`)
  }

  function handleDialSelect(code: DialCode) {
    setDialCode(code.dial)
    setOpen(false)
    emit(code.dial, phone)
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const p = e.target.value.replace(/[^\d\s\-().]/g, "")
    setPhone(p)
    emit(dialCode, p)
  }

  React.useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener("mousedown", onOutside)
    return () => document.removeEventListener("mousedown", onOutside)
  }, [open])

  const selected = dialCodes.find((d) => d.dial === dialCode)

  return (
    <div ref={containerRef} className={cn("relative flex", className)}>
      {/* Dial code selector */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex h-10 items-center gap-1.5 rounded-l-[10px] border border-r-0 border-border bg-card px-3",
          "text-sm text-foreground transition-colors hover:bg-accent",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          disabled && "opacity-50 pointer-events-none"
        )}
      >
        <span className="text-base">{selected?.flag ?? "🌍"}</span>
        <span className="text-muted-foreground">{dialCode}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {/* Phone number input */}
      <input
        type="tel"
        value={phone}
        onChange={handlePhoneChange}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "flex h-10 flex-1 rounded-r-[10px] border border-border bg-card px-3 py-2 text-sm",
          "text-foreground placeholder:text-muted-foreground/50",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          "disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
        )}
      />

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-11 z-50 w-52 rounded-[10px] border border-border bg-card shadow-xl overflow-hidden">
          <div className="max-h-48 overflow-y-auto py-1">
            {dialCodes.map((dc) => (
              <button
                key={dc.code}
                type="button"
                onClick={() => handleDialSelect(dc)}
                className={cn(
                  "flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors",
                  "hover:bg-accent text-foreground",
                  dc.dial === dialCode && "bg-primary/10 text-primary"
                )}
              >
                <span className="text-base">{dc.flag}</span>
                <span className="flex-1 text-left">{dc.code}</span>
                <span className="text-muted-foreground">{dc.dial}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export { PhoneInput }
