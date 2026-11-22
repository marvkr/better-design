"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

// Talentboard AvatarGroup: overlapping stack with a count chip.

interface AvatarGroupItem {
  src?: string;
  alt?: string;
  fallback?: string;
}

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AvatarGroupItem[];
  max?: number;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "h-7 w-7 text-[0.625rem]",
  md: "h-9 w-9 text-xs",
  lg: "h-11 w-11 text-sm",
};

function AvatarGroup({ items, max = 4, size = "md", className, ...props }: AvatarGroupProps) {
  const visible = items.slice(0, max);
  const overflow = items.length - visible.length;

  return (
    <div className={cn("flex items-center -space-x-2", className)} {...props}>
      {visible.map((item, index) => (
        <Avatar
          key={index}
          className={cn(sizeMap[size], "ring-2 ring-[color:var(--card)]")}
        >
          {item.src && <AvatarImage src={item.src} alt={item.alt ?? ""} />}
          <AvatarFallback>{item.fallback ?? "?"}</AvatarFallback>
        </Avatar>
      ))}
      {overflow > 0 && (
        <span
          className={cn(
            sizeMap[size],
            "z-10 flex items-center justify-center rounded-full",
            "bg-secondary font-medium text-secondary-foreground",
            "ring-2 ring-[color:var(--card)]"
          )}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
}

export { AvatarGroup };
export type { AvatarGroupProps, AvatarGroupItem };
