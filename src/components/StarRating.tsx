import React from "react";
import { Star } from "lucide-react";

// Trustpilot-green star rating. Only shows a score when REAL review data is passed in; with no data it renders
// five outlined stars and "No reviews yet" rather than inventing a rating.
interface StarRatingProps {
  rating?: number;
  reviewsCount?: number;
  size?: "xs" | "sm" | "md" | "lg";
  showCount?: boolean;
  className?: string;
}

const SIZES = { xs: 12, sm: 14, md: 16, lg: 20 };

export default function StarRating({ rating, reviewsCount, size = "sm", showCount = true, className = "" }: StarRatingProps) {
  const px = SIZES[size] || 14;
  const has = typeof rating === "number" && rating > 0 && (reviewsCount || 0) > 0;
  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`} aria-label={has ? `Rated ${rating!.toFixed(1)} out of 5 from ${reviewsCount} reviews` : "No reviews yet"}>
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => {
          const filled = has && rating! >= i + 0.75;
          const half = has && !filled && rating! >= i + 0.25;
          return (
            <span key={i} className="relative inline-flex" style={{ width: px, height: px }}>
              <Star size={px} className="absolute inset-0 text-trust" strokeWidth={1.6} fill={filled ? "currentColor" : "none"} />
              {half && (
                <span className="absolute inset-0 overflow-hidden" style={{ width: px / 2 }}>
                  <Star size={px} className="text-trust" strokeWidth={1.6} fill="currentColor" />
                </span>
              )}
            </span>
          );
        })}
      </div>
      {has ? (
        <>
          <span className="font-mono text-[11px] font-bold tracking-tight text-slate-700">{rating!.toFixed(1)}</span>
          {showCount && <span className="text-[10px] font-medium text-slate-500">({reviewsCount})</span>}
        </>
      ) : (
        showCount && <span className="text-[10px] font-medium text-slate-500">No reviews yet</span>
      )}
    </div>
  );
}
