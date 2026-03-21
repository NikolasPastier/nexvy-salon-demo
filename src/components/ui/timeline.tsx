"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export function Timeline({ data }: { data: TimelineEntry[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  // Measure the full height of the entries block after mount
  useEffect(() => {
    const measure = () => {
      if (lineRef.current) {
        setLineHeight(lineRef.current.getBoundingClientRect().height);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Drive the fill animation from "top of container enters viewport" to
  // "bottom of container reaches 50% of viewport"
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const fillHeight = useTransform(scrollYProgress, [0, 1], [0, lineHeight]);
  const fillOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <div className="w-full bg-[#0C0B09]" ref={containerRef}>
      <div ref={lineRef} className="relative max-w-7xl mx-auto pb-20 px-6 md:px-10">

        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            {/* Left column — sticky step number */}
            <div className="sticky top-40 z-40 self-start flex flex-col md:flex-row items-center max-w-xs lg:max-w-sm md:w-full">
              {/* Dot on the line */}
              <div className="absolute left-3 md:left-3 h-10 w-10 rounded-full bg-[#0C0B09] flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-[#C8922A]/20 border border-[#C8922A]/40" />
              </div>
              {/* Step number — desktop only */}
              <h3
                className="hidden md:block md:pl-20 md:text-5xl text-xl"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 400,
                  color: "rgba(237,232,223,0.25)",
                }}
              >
                {item.title}
              </h3>
            </div>

            {/* Right column — content */}
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              {/* Step number — mobile only, above content */}
              <h3
                className="md:hidden block text-2xl mb-6 text-left"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 400,
                  color: "rgba(237,232,223,0.25)",
                }}
              >
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        {/* ── Vertical line ── */}
        <div
          style={{ height: lineHeight }}
          className="absolute left-8 md:left-8 top-0 w-[2px] overflow-hidden
                     [mask-image:linear-gradient(to_bottom,transparent_0%,black_8%,black_92%,transparent_100%)]"
        >
          {/* Static dim track */}
          <div className="absolute inset-0 w-[2px] bg-gradient-to-b from-transparent via-[rgba(237,232,223,0.08)] to-transparent" />

          {/* Animated gold fill */}
          <motion.div
            style={{ height: fillHeight, opacity: fillOpacity }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-[#C8922A] via-[#E0A83A] to-transparent"
          />
        </div>

      </div>
    </div>
  );
}
