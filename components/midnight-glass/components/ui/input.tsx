import * as React from "react";
import { cn } from "@/lib/utils";

// Midnight Glass Input — frosted glass field with pill shape
// Glass bg over midnight blue, inset glow, indigo focus ring

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-full px-5 py-2 text-[15px] text-foreground",
          "backdrop-blur-xl bg-white/[0.05]",
          "border border-white/[0.12]",
          "shadow-[inset_0_0_6px_rgba(255,255,255,0.05)]",
          "placeholder:text-muted-foreground",
          "transition-all duration-300 ease-out",
          "hover:bg-white/[0.08] hover:border-white/[0.18]",
          "focus-visible:outline-none focus-visible:border-primary/50",
          "focus-visible:shadow-[inset_0_0_6px_rgba(255,255,255,0.05),0_0_0_3px_rgba(255,255,255,0.2)]",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
