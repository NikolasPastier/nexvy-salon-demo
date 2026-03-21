"use client";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs));
}

// ─── Shared shimmer style ─────────────────────────────────────────────────────

const shimmerStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  backgroundImage:
    "linear-gradient(110deg, #C8922A 30%, #F0C060 45%, #E8B84B 50%, #C8922A 60%, #C8922A)",
  backgroundSize: "200% 100%",
  animation: "shimmer2 2.5s infinite linear",
};

// ─── ShimmerButton (<button>) ─────────────────────────────────────────────────

interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
}

export function ShimmerButton({
  children,
  className,
  style,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center gap-2",
        "rounded-full border-0",
        "px-8 py-4",
        "font-medium tracking-[0.16em] uppercase text-[11px]",
        "text-[#0C0B09]",
        "transition-shadow duration-300",
        "hover:shadow-[0_0_32px_rgba(200,146,42,0.45)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8922A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0B09]",
        className
      )}
      style={{ ...shimmerStyle, cursor: "none", ...style }}
      {...props}
    >
      {children}
    </button>
  );
}

// ─── ShimmerLink (<a>) ────────────────────────────────────────────────────────

interface ShimmerLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
  className?: string;
}

export function ShimmerLink({
  children,
  className,
  style,
  ...props
}: ShimmerLinkProps) {
  return (
    <a
      className={cn(
        "relative inline-flex items-center justify-center gap-2",
        "rounded-full border-0",
        "px-8 py-4",
        "font-medium tracking-[0.16em] uppercase text-[11px]",
        "text-[#0C0B09]",
        "no-underline",
        "transition-shadow duration-300",
        "hover:shadow-[0_0_32px_rgba(200,146,42,0.45)]",
        "focus:outline-none",
        className
      )}
      style={{ ...shimmerStyle, cursor: "none", ...style }}
      {...props}
    >
      {children}
    </a>
  );
}
