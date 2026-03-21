"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  const deterministicRotations = [-4, 2, -1, 3, -2, 5, -3, 1, -5, 4];
  const getRotation = (index: number) => deterministicRotations[index % deterministicRotations.length];

  return (
    <div className="w-full px-0 py-0">
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16`}>
        {/* Image stack */}
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: getRotation(index),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : getRotation(index),
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: getRotation(index),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  {/* Plain img — no next/image domain restrictions */}
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    draggable={false}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "16px",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Text + nav */}
        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "32px",
                fontWeight: 400,
                color: "#EDE8DF",
                marginBottom: "6px",
              }}
            >
              {testimonials[active].name}
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#C8922A",
              }}
            >
              {testimonials[active].designation}
            </p>

            {/* Word-by-word blur reveal — signature effect */}
            <motion.p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "22px",
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: 1.6,
                color: "rgba(237,232,223,0.75)",
                marginTop: "28px",
              }}
            >
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          {/* Navigation */}
          <div className="flex gap-3 pt-10">
            <button
              onClick={handlePrev}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "transparent",
                border: "1px solid rgba(237,232,223,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(200,146,42,0.4)";
                e.currentTarget.style.background = "rgba(200,146,42,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(237,232,223,0.12)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <IconArrowLeft
                size={18}
                style={{ color: "#EDE8DF" }}
              />
            </button>
            <button
              onClick={handleNext}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "#C8922A",
                border: "1px solid #C8922A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#E0A83A";
                e.currentTarget.style.borderColor = "#E0A83A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#C8922A";
                e.currentTarget.style.borderColor = "#C8922A";
              }}
            >
              <IconArrowRight
                size={18}
                style={{ color: "#0C0B09" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
