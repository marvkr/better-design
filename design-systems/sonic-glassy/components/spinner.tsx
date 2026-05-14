import { cn } from "@/lib/utils"

// Tactile Minimal Spinner — SVG circle spinner using currentColor

interface SpinnerProps extends React.SVGAttributes<SVGElement> {
  size?: "sm" | "default" | "lg"
}

function Spinner({ className, size = "default", ...props }: SpinnerProps) {
  const sizes = {
    sm: "h-4 w-4",
    default: "h-5 w-5",
    lg: "h-8 w-8",
  }

  return (
    <svg
      className={cn("animate-spin text-primary", sizes[size], className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

export { Spinner }
