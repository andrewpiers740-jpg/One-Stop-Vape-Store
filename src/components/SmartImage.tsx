"use client";
import React from "react";
import Image from "next/image";

export interface SmartImageProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  [key: string]: any;
}

/**
 * SmartImage — Optimized next/image wrapper with zero-broken-image fallback.
 */
export default function SmartImage({
  src = "",
  alt = "",
  width,
  height,
  priority = false,
  className = "",
  ...props
}: SmartImageProps) {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  // Check if src is a valid URL or path
  const isValidSrc = React.useMemo(() => {
    if (!src || typeof src !== "string") return false;
    return src.startsWith("/") || src.startsWith("http://") || src.startsWith("https://");
  }, [src]);

  // Fallback if no image or error or invalid source
  if (!isValidSrc || error) {
    return (
      <div 
        className={`bg-slate-100 border border-slate-200 flex flex-col items-center justify-center p-4 text-center overflow-hidden ${className}`}
        style={{ width: width ? `${width}px` : "100%", height: height ? `${height}px` : "100%", minHeight: "120px" }}
      >
        <div className="text-slate-600 mb-2">
          <svg className="w-8 h-8 mx-auto opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-slate-600 font-medium truncate max-w-full">
          {alt || "Product Image"}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width: width ? `${width}px` : "100%", ...(height ? { height: `${height}px` } : {}) }}>
      <Image
        src={src}
        alt={alt || "Product image"}
        width={width || 500}
        height={height || 500}
        priority={priority}
        referrerPolicy="no-referrer"
        className="h-full w-full object-contain"
        onError={() => setError(true)}
        {...props}
      />
    </div>
  );
}
