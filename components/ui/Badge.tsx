import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "mint" | "navy" | "outline";
  className?: string;
}

export function Badge({ children, variant = "outline", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium",
        variant === "mint" && "bg-mint-50 text-mint-700",
        variant === "navy" && "bg-navy-700 text-warm-100",
        variant === "outline" && "border border-line text-ink-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
