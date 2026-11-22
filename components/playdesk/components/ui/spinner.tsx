import * as React from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

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
    className={cn("animate-spin text-primary", sizes[size], className)}
    {...props}
  />
);
Spinner.displayName = "Spinner";

export { Spinner };
