import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface InitialsAvatarProps {
  initials: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-10 w-10 text-xs",
  md: "h-14 w-14 text-sm",
  lg: "h-20 w-20 text-base",
};

export function InitialsAvatar({ initials, size = "md", className }: InitialsAvatarProps) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-full bg-navy-700 font-display font-medium text-warm-100",
        sizeClasses[size],
        className
      )}
    >
      <span className="pointer-events-none absolute -inset-1 rounded-full border border-mint-200/60" />
      {initials}
    </div>
  );
}

export function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "fill-mint-500 text-mint-500" : "fill-line text-line"}
        />
      ))}
    </div>
  );
}
