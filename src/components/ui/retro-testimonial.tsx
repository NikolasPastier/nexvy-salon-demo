"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface iTestimonial {
  name: string;
  designation: string;
  description: string;
  profileImage: string;
}

// ─── ProfileImage ─────────────────────────────────────────────────────────────

function ProfileImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-[rgba(200,146,42,0.4)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={80}
        height={80}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

// ─── TestimonialCard ──────────────────────────────────────────────────────────

interface TestimonialCardProps {
  testimonial: iTestimonial;
  index: number;
  layout?: boolean;
  backgroundImage?: string;
}

export function TestimonialCard({
  testimonial,
  index,
  backgroundImage,
}: TestimonialCardProps) {
  const [expanded, setExpanded] = useState(false);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (expanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [expanded]);

  return (
    <>
      {/* ── Card ── */}
      <motion.div
        onClick={() => setExpanded(true)}
        className="relative h-[460px] w-72 md:w-80 shrink-0 overflow-hidden cursor-pointer
                   bg-[#141210] border border-[rgba(237,232,223,0.07)]"
        whileHover={{ y: -6, borderColor: "rgba(200,146,42,0.25)" }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Background texture */}
        {backgroundImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={backgroundImage}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
          />
        )}

        <div className="relative z-10 flex flex-col h-full p-8">
          <ProfileImage src={testimonial.profileImage} alt={testimonial.name} />

          <div className="flex-1 mt-6">
            <p
              className="text-[28px] text-[#EDE8DF] leading-tight mb-3"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 400,
              }}
            >
              {testimonial.name}
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#C8922A",
              }}
            >
              {testimonial.designation}
            </p>
          </div>

          <p
            className="line-clamp-4 text-[17px] leading-[1.6]"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 300,
              color: "#EDE8DF",
            }}
          >
            {testimonial.description}
          </p>

          <div
            className="mt-5 pt-5 border-t border-[rgba(237,232,223,0.06)]
                       text-[10px] tracking-[0.2em] uppercase text-[#7A756C]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Kliknite pre viac →
          </div>
        </div>
      </motion.div>

      {/* ── Expanded modal ── */}
      <AnimatePresence>
        {expanded && (
          <>
            {/* Overlay */}
            <motion.div
              className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setExpanded(false)}
            />

            {/* Modal wrapper — centres content */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpanded(false)}
            >
              <motion.div
                className="relative w-full max-w-lg overflow-hidden
                           bg-[#1D1B17] border border-[rgba(237,232,223,0.08)]"
                initial={{ scale: 0.92, y: 28 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.92, y: 28 }}
                transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
                onClick={(e) => e.stopPropagation()}
              >
                {backgroundImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={backgroundImage}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
                  />
                )}

                <div className="relative z-10 p-10 md:p-12">
                  {/* Close */}
                  <button
                    onClick={() => setExpanded(false)}
                    className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center
                               bg-[#C8922A] hover:bg-[#E0A83A] transition-colors"
                    aria-label="Zavrieť"
                  >
                    <X size={14} className="text-[#0C0B09]" />
                  </button>

                  <ProfileImage src={testimonial.profileImage} alt={testimonial.name} />

                  <p
                    className="text-[36px] text-[#EDE8DF] leading-tight mt-7 mb-2"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontWeight: 400,
                    }}
                  >
                    {testimonial.name}
                  </p>
                  <p
                    className="mb-8"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "#C8922A",
                    }}
                  >
                    {testimonial.designation}
                  </p>
                  <p
                    className="text-[20px] leading-[1.65]"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontStyle: "italic",
                      fontWeight: 300,
                      color: "#EDE8DF",
                    }}
                  >
                    {testimonial.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Carousel ─────────────────────────────────────────────────────────────────

interface CarouselProps {
  items: React.ReactNode[];
}

export function Carousel({ items }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(288); // w-72 default

  // Measure the actual rendered card width (handles md: breakpoint)
  const measureCard = useCallback(() => {
    if (firstCardRef.current) {
      setCardWidth(firstCardRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    measureCard();
    window.addEventListener("resize", measureCard);
    return () => window.removeEventListener("resize", measureCard);
  }, [measureCard]);

  const GAP = 16; // gap-4
  const offset = -activeIndex * (cardWidth + GAP);

  const canPrev = activeIndex > 0;
  const canNext = activeIndex < items.length - 1;

  return (
    <div className="mt-16">
      {/* Track — overflow hidden clips cards outside the container */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={{ x: offset }}
          transition={{ type: "spring", bounce: 0.08, duration: 0.55 }}
        >
          {items.map((item, i) => (
            <div key={i} ref={i === 0 ? firstCardRef : undefined}>
              {item}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        <button
          onClick={() => canPrev && setActiveIndex((i) => i - 1)}
          disabled={!canPrev}
          aria-label="Predchádzajúci"
          className="w-10 h-10 flex items-center justify-center
                     bg-[#C8922A] hover:bg-[#E0A83A] transition-colors
                     disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} className="text-[#0C0B09]" />
        </button>
        <button
          onClick={() => canNext && setActiveIndex((i) => i + 1)}
          disabled={!canNext}
          aria-label="Nasledujúci"
          className="w-10 h-10 flex items-center justify-center
                     bg-[#C8922A] hover:bg-[#E0A83A] transition-colors
                     disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight size={16} className="text-[#0C0B09]" />
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-2 ml-4">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Člen tímu ${i + 1}`}
              className="transition-all duration-300"
              style={{
                width: i === activeIndex ? 20 : 6,
                height: 2,
                background: i === activeIndex ? "#C8922A" : "rgba(237,232,223,0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
