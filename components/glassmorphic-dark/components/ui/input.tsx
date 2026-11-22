import * as React from "react";
import { cn } from "@/lib/utils";

// Glassmorphic Input — frosted glass field with pill shape
// Glass bg, rounded-full, inset glow, purple focus ring

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-full px-4 py-2 text-sm text-foreground",
          "backdrop-blur-xl bg-white/[0.06]",
          "border border-white/10",
          "shadow-[inset_0_0_0.375rem_oklch(1_0_0/0.06)]",
          "placeholder:text-muted-foreground",
          "transition-all duration-base ease-out",
          "hover:bg-white/[0.08] hover:border-white/[0.15]",
          "focus-visible:outline-none focus-visible:border-primary/50",
          "focus-visible:shadow-[inset_0_0_0.375rem_oklch(1_0_0/0.06),0_0_0_0.1875rem_oklch(0.65_0.19_250/0.2)]",
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
