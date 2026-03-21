"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type SpringOptions,
} from "motion/react";

import { cn } from "@/lib/utils";

// ─── Context ────────────────────────────────────────────────────────────────

interface ImageComparisonContextValue {
  sliderPosition: ReturnType<typeof useMotionValue<number>>;
}

const ImageComparisonContext =
  React.createContext<ImageComparisonContextValue | null>(null);

function useImageComparison() {
  const ctx = React.useContext(ImageComparisonContext);
  if (!ctx)
    throw new Error(
      "ImageComparison sub-components must be used inside <ImageComparison>."
    );
  return ctx;
}

// ─── ImageComparison (container) ────────────────────────────────────────────

interface ImageComparisonProps {
  className?: string;
  style?: React.CSSProperties;
  /** Move slider on hover instead of drag */
  enableHover?: boolean;
  springOptions?: SpringOptions;
  children: React.ReactNode;
}

function ImageComparison({
  className,
  style,
  enableHover = false,
  springOptions,
  children,
}: ImageComparisonProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const sliderPosition = useMotionValue(50);
  const [isDragging, setIsDragging] = React.useState(false);

  const moveTo = React.useCallback(
    (clientX: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      animate(sliderPosition, pct, {
        type: "spring",
        ...(springOptions ?? { bounce: 0, duration: 0.3 }),
      });
    },
    [sliderPosition, springOptions]
  );

  // Mouse
  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (enableHover || isDragging) moveTo(e.clientX);
    },
    [enableHover, isDragging, moveTo]
  );

  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setIsDragging(true);
      moveTo(e.clientX);
    },
    [moveTo]
  );

  // Touch
  const handleTouchMove = React.useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      moveTo(e.touches[0].clientX);
    },
    [moveTo]
  );

  // Release anywhere
  React.useEffect(() => {
    const up = () => setIsDragging(false);
    window.addEventListener("mouseup", up);
    return () => window.removeEventListener("mouseup", up);
  }, []);

  return (
    <ImageComparisonContext.Provider value={{ sliderPosition }}>
      <div
        ref={containerRef}
        className={cn("relative select-none overflow-hidden", className)}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onTouchMove={handleTouchMove}
      >
        {children}
      </div>
    </ImageComparisonContext.Provider>
  );
}

// ─── ImageComparisonImage ────────────────────────────────────────────────────

interface ImageComparisonImageProps {
  src: string;
  alt: string;
  position: "left" | "right";
  className?: string;
}

function ImageComparisonImage({
  src,
  alt,
  position,
  className,
}: ImageComparisonImageProps) {
  const { sliderPosition } = useImageComparison();

  const clipPath = useTransform(sliderPosition, (val) =>
    position === "left"
      ? `inset(0 ${100 - val}% 0 0)`
      : `inset(0 0 0 ${val}%)`
  );

  return (
    <motion.img
      src={src}
      alt={alt}
      loading="lazy"
      draggable={false}
      style={{ clipPath }}
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full object-cover",
        className
      )}
    />
  );
}

// ─── ImageComparisonSlider ───────────────────────────────────────────────────

interface ImageComparisonSliderProps {
  className?: string;
  children?: React.ReactNode;
}

function ImageComparisonSlider({
  className,
  children,
}: ImageComparisonSliderProps) {
  const { sliderPosition } = useImageComparison();

  const left = useTransform(sliderPosition, (val) => `${val}%`);

  return (
    <motion.div
      style={{ left }}
      className={cn(
        "absolute inset-y-0 z-10 cursor-ew-resize",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

// ─── Exports ─────────────────────────────────────────────────────────────────

export { ImageComparison, ImageComparisonImage, ImageComparisonSlider };
