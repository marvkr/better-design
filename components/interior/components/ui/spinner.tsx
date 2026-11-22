import * as React from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * Interior Spinner — one circular arc at constant speed, in currentColor. The
 * arc is the system's only circle (a physics exemption) and its spin is the
 * only allowed loop: an unknown duration is the one thing a loop reports
 * honestly.
 */

export interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  size?: "sm" | "default" | "lg";
}

const sizes = {
  sm: "size-3.5",
  default: "size-4",
  lg: "size-6",
} as const;

const Spinner = ({ className, size = "default", ...props }: SpinnerProps) => (
  <Loader2
    role="status"
    aria-label="Loading"
    strokeWidth={1.5}
    className={cn("animate-spin", sizes[size], className)}
    {...props}
  />
);
Spinner.displayName = "Spinner";

export { Spinner };
