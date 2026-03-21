"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let cx = -100, cy = -100;
    let rx = -100, ry = -100;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      cx = e.clientX;
      cy = e.clientY;
      cursor.style.left = cx + "px";
      cursor.style.top = cy + "px";
    };

    const animateRing = () => {
      rx += (cx - rx) * 0.12;
      ry += (cy - ry) * 0.12;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      rafId = requestAnimationFrame(animateRing);
    };
    animateRing();

    document.addEventListener("mousemove", onMove);

    // Hover state for interactive elements
    const addHover = () => document.body.classList.add("cursor-hover");
    const removeHover = () => document.body.classList.remove("cursor-hover");

    const attachHover = () => {
      document.querySelectorAll("a, button").forEach((el) => {
        el.addEventListener("mouseenter", addHover);
        el.addEventListener("mouseleave", removeHover);
      });
    };
    attachHover();

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div id="cursor" ref={cursorRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}
