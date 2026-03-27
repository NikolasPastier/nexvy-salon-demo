"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ServiceCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  price: string;
  duration: string;
  description: string;
  tags: string[];
  className?: string;
  onBook?: () => void;
}

// ─── Animation variants ───────────────────────────────────────────────────────

const detailVariants = {
  hidden: { opacity: 0, height: 0, marginTop: 0 },
  visible: { opacity: 1, height: "auto", marginTop: "14px" },
} as const;

// ─── ServiceCard ──────────────────────────────────────────────────────────────

export function ServiceCard({
  imageSrc,
  imageAlt,
  title,
  price,
  duration,
  description,
  tags,
  className,
  onBook,
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  // On touch devices we always show the description (no hover state possible).
  // We detect client-side only to avoid SSR mismatch.
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const showDetails = isHovered || isMobile;

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
      className={cn("flex-shrink-0 w-[300px] cursor-none", className)}
    >
      <div
        style={{
          background: "#141210",
          border: "1px solid",
          borderColor: isHovered
            ? "rgba(200,146,42,0.3)"
            : "rgba(237,232,223,0.07)",
          overflow: "visible",
          transition: "border-color 0.3s",
          borderRadius: "16px",
        }}
      >
        {/* Image */}
        <div className="relative" style={{ overflow: "hidden", borderRadius: "16px 16px 0 0", height: "220px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover transition-transform duration-700"
            style={{
              transform: isHovered ? "scale(1.06)" : "scale(1)",
              filter: isHovered
                ? "grayscale(20%) brightness(0.85)"
                : "grayscale(70%) brightness(0.75)",
            }}
          />
          {/* Gold top bar slides in on hover */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: "#C8922A",
              transform: isHovered ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition: "transform 0.4s ease",
            }}
          />
        </div>

        {/* Content */}
        <div style={{ padding: "24px" }}>
          {/* Title + price */}
          <div className="flex items-start justify-between gap-3">
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "24px",
                fontWeight: 400,
                color: "#EDE8DF",
                lineHeight: 1.2,
                flex: 1,
                margin: 0,
              }}
            >
              {title}
            </h3>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "18px",
                fontStyle: "italic",
                fontWeight: 300,
                color: "#C8922A",
                whiteSpace: "nowrap",
                paddingTop: "2px",
              }}
            >
              {price}
            </span>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2 mt-2">
            <Clock size={11} style={{ color: "#7A756C" }} />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#7A756C",
              }}
            >
              {duration}
            </span>
          </div>

          {/* Reveal on hover (always visible on mobile) */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                key="details"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={detailVariants}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    fontWeight: 300,
                    color: "rgba(237,232,223,0.6)",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {description}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "9px",
                        fontWeight: 500,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#C8922A",
                        padding: "4px 10px",
                        border: "1px solid rgba(200,146,42,0.25)",
                        background: "rgba(200,146,42,0.06)",
                        borderRadius: "9999px",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid rgba(237,232,223,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: isHovered ? "#C8922A" : "#7A756C",
              transition: "color 0.25s",
            }}
          >
            Rezervovať
          </span>
          <div
            onClick={onBook}
            style={{
              width: "32px",
              height: "32px",
              background: isHovered ? "#C8922A" : "rgba(237,232,223,0.06)",
              border: "1px solid",
              borderColor: isHovered ? "#C8922A" : "rgba(237,232,223,0.1)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.25s",
              transform: isHovered ? "rotate(-45deg)" : "rotate(0deg)",
              cursor: "pointer",
            }}
          >
            <ArrowRight
              size={13}
              style={{ color: isHovered ? "#0C0B09" : "#7A756C" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
