import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating?: number;
  reviewsCount?: number;
  size?: "xs" | "sm" | "md" | "lg";
  showCount?: boolean;
  className?: string;
}

export default function StarRating({
  rating = 5.0,
  reviewsCount = 48,
  size = "sm",
  showCount = true,
  className = ""
}: StarRatingProps) {
  const starSizes = {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 18
  };

  const currentSize = starSizes[size] || 13;

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5 text-amber-400">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            size={currentSize}
            className="fill-amber-400 text-amber-400 shrink-0"
          />
        ))}
      </div>
      <span className="text-[11px] font-bold text-zinc-300 font-mono tracking-tight">
        {rating.toFixed(1)}
      </span>
      {showCount && (
        <span className="text-[10px] text-zinc-500 font-medium">
          ({reviewsCount})
        </span>
      )}
    </div>
  );
}
