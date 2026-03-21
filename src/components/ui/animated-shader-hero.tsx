"use client";

import React, { useRef, useEffect } from "react";
import { ShimmerButton } from "@/components/ui/shimmer-button";

// ─── Props ────────────────────────────────────────────────────────────────────

interface AnimatedShaderHeroProps {
  trustBadge?: { text: string };
  headline?: { line1: string; line2: string };
  subtitle?: string;
  address?: string;
  buttons?: {
    primary?: { text: string; onClick?: () => void };
    secondary?: { text: string; href?: string };
  };
  className?: string;
}

// ─── Vertex shader (full-screen quad) ────────────────────────────────────────

const VERT = `#version 300 es
in vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

// ─── Default fragment shader ──────────────────────────────────────────────────
// Warm amber energy field — orbiting light sources accumulate on a near-black bg.
// Colors shifted toward vec3(0.8, 0.57, 0.16) = gold/amber bias.

const defaultShaderSource = `#version 300 es
precision highp float;

uniform float u_time;
uniform vec2  u_resolution;

out vec4 fragColor;

void main() {
  // Centred, aspect-corrected coordinates
  vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);

  vec3 col = vec3(0.0);
  float bg  = 0.0;
  float t   = u_time * 0.35;

  // 21 animated light sources orbit and accumulate
  for (float i = 1.0; i < 22.0; i++) {
    vec2 q = p;
    q.x += 0.42 * cos(i * 1.1 + t * 0.52 + sin(i * 0.37) * 1.5);
    q.y += 0.30 * sin(i * 1.4 + t * 0.41 + cos(i * 0.53) * 1.2);

    float d = max(length(q), 0.001);

    // Soft background bloom
    bg += exp(-d * 9.0) * 0.05;

    // Light accumulation — colour shifts with amber bias vec3(0.8, 0.57, 0.16)
    col += .00125 / d * (cos(sin(i) * vec3(0.8, 0.57, 0.16)) + 1.0);

    // Dark bg blend — near-black (#0C0B09 ≈ 0.047, 0.043, 0.035)
    col = mix(col, vec3(bg * 0.18, bg * 0.10, bg * 0.02), d * 0.06);
  }

  // Dark base tone so empty areas stay near-black
  col += vec3(0.047, 0.043, 0.035);
  col  = clamp(col, 0.0, 1.0);

  fragColor = vec4(col, 1.0);
}
`;

// ─── WebGL helpers ────────────────────────────────────────────────────────────

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  src: string
): WebGLShader | null {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error("[shader] compile error:", gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

function buildProgram(
  gl: WebGL2RenderingContext,
  frag: string
): WebGLProgram | null {
  const v = compileShader(gl, gl.VERTEX_SHADER, VERT);
  const f = compileShader(gl, gl.FRAGMENT_SHADER, frag);
  if (!v || !f) return null;
  const p = gl.createProgram();
  if (!p) return null;
  gl.attachShader(p, v);
  gl.attachShader(p, f);
  gl.linkProgram(p);
  gl.deleteShader(v);
  gl.deleteShader(f);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error("[shader] link error:", gl.getProgramInfoLog(p));
    return null;
  }
  return p;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AnimatedShaderHero({
  trustBadge,
  headline,
  subtitle,
  address,
  buttons,
  className,
}: AnimatedShaderHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── WebGL setup + animation loop ──────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2");
    if (!gl) {
      console.warn("[shader] WebGL2 unavailable — static background shown");
      return;
    }

    const program = buildProgram(gl, defaultShaderSource);
    if (!program) return;

    // Full-screen quad (2 triangles)
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const posLoc = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_resolution");

    let rafId = 0;
    const t0 = performance.now();

    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 2); // cap at 2× for perf
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const render = () => {
      gl.useProgram(program);
      gl.bindVertexArray(vao);
      gl.uniform1f(uTime, (performance.now() - t0) / 1000);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      gl.bindVertexArray(null);
      rafId = requestAnimationFrame(render);
    };

    resize();
    render();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      gl.deleteVertexArray(vao);
      gl.deleteBuffer(buf);
      gl.deleteProgram(program);
    };
  }, []);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <section
      id="hero"
      className={className}
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background: "#0C0B09", // visible before WebGL paints
      }}
    >
      {/* WebGL canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden
      />

      {/* Gradient overlay — darkens bottom for text legibility */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(12,11,9,0.25) 0%, rgba(12,11,9,0.4) 35%, rgba(12,11,9,0.72) 65%, rgba(12,11,9,0.97) 100%)",
          zIndex: 1,
        }}
      />

      {/* Content overlay */}
      <div
        className="absolute inset-0 z-10 flex flex-col justify-end text-white hero-content"
        style={{ padding: "0 48px 80px" }}
      >
        <div style={{ maxWidth: "680px" }}>

          {/* Address line */}
          {address && (
            <span
              className="animate-fade-in-down"
              style={{
                display: "block",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 400,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#C8922A",
                marginBottom: "20px",
              }}
            >
              {address}
            </span>
          )}

          {/* Trust badge */}
          {trustBadge && (
            <div className="mb-10 animate-fade-in-down animation-delay-200">
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 20px",
                  background: "rgba(200,146,42,0.1)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(200,146,42,0.25)",
                  borderRadius: "9999px",
                }}
              >
                <span style={{ color: "#C8922A", fontSize: "12px" }}>★★★★★</span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: 400,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(237,232,223,0.8)",
                  }}
                >
                  {trustBadge.text}
                </span>
              </div>
            </div>
          )}

          {/* Headline */}
          {headline && (
            <div style={{ marginBottom: "24px" }}>
              <h1
                className="animate-fade-in-up animation-delay-200 hero-headline"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(64px, 12vw, 160px)",
                  fontWeight: 400,
                  lineHeight: 0.88,
                  letterSpacing: "-0.03em",
                  color: "#EDE8DF",
                  display: "block",
                  margin: 0,
                  textShadow: "0 2px 40px rgba(0,0,0,0.5)",
                }}
              >
                {headline.line1}
              </h1>
              <h1
                className="animate-fade-in-up animation-delay-400 hero-headline"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(64px, 12vw, 160px)",
                  fontWeight: 400,
                  lineHeight: 0.88,
                  letterSpacing: "-0.03em",
                  color: "#EDE8DF",
                  display: "block",
                  margin: 0,
                  textShadow: "0 2px 40px rgba(0,0,0,0.5)",
                }}
              >
                {headline.line2}
              </h1>
            </div>
          )}

          {/* Subtitle */}
          {subtitle && (
            <p
              className="animate-fade-in-up animation-delay-600"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(15px, 1.5vw, 18px)",
                fontWeight: 300,
                color: "rgba(237,232,223,0.65)",
                lineHeight: 1.75,
                maxWidth: "480px",
                margin: 0,
                textShadow: "0 1px 20px rgba(0,0,0,0.5)",
              }}
            >
              {subtitle}
            </p>
          )}

          {/* Buttons */}
          <div
            className="animate-fade-in-up animation-delay-800 hero-buttons"
            style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "48px" }}
          >
            {buttons?.primary && (
              <ShimmerButton
                onClick={buttons.primary.onClick}
                className="px-10 py-[18px] text-[11px]"
              >
                {buttons.primary.text}
              </ShimmerButton>
            )}

            {buttons?.secondary && (
              <a
                href={buttons.secondary.href ?? "#"}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "18px 32px",
                  background: "rgba(237,232,223,0.06)",
                  color: "#EDE8DF",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 400,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  border: "1px solid rgba(237,232,223,0.15)",
                  borderRadius: "9999px",
                  backdropFilter: "blur(8px)",
                  textDecoration: "none",
                  transition: "border-color 0.25s, background 0.25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(237,232,223,0.1)";
                  e.currentTarget.style.borderColor = "rgba(237,232,223,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(237,232,223,0.06)";
                  e.currentTarget.style.borderColor = "rgba(237,232,223,0.15)";
                }}
              >
                <svg
                  width="13"
                  height="13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 012.12 2.18 2 2 0 014.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                {buttons.secondary.text}
              </a>
            )}
          </div>
        </div>

        {/* Scroll indicator — desktop only */}
        <div
          className="hidden md:flex"
          style={{
            position: "absolute",
            right: "48px",
            bottom: "80px",
            writingMode: "vertical-rl",
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(237,232,223,0.4)",
            fontFamily: "'DM Sans', sans-serif",
            alignItems: "center",
            gap: "12px",
          }}
        >
          SCROLL
          <div
            style={{
              width: "1px",
              height: "64px",
              background: "linear-gradient(to bottom, rgba(200,146,42,0.8), transparent)",
              animation: "scrollLine 2s ease-in-out infinite",
            }}
          />
        </div>

        {/* Rotating circular badge — desktop only */}
        <div
          className="hidden md:block"
          style={{
            position: "absolute",
            right: "48px",
            top: "50%",
            transform: "translateY(-50%)",
            width: 100,
            height: 100,
            opacity: 0.65,
          }}
        >
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            className="animate-spin-slow"
          >
            <defs>
              <path
                id="shader-badge-path"
                d="M 50 50 m -35 0 a 35 35 0 1 1 70 0 a 35 35 0 1 1 -70 0"
              />
            </defs>
            <text
              fontFamily="var(--font-dm-sans), DM Sans, sans-serif"
              fontSize="9"
              fill="rgba(200,146,42,0.9)"
              letterSpacing="4"
            >
              <textPath href="#shader-badge-path">
                PRÉMIOVÉ KADERNÍCTVO • BRATISLAVA •{" "}
              </textPath>
            </text>
          </svg>
        </div>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 640px) {
          .hero-content { padding: 0 24px 48px !important; }
          .hero-headline { font-size: clamp(64px, 18vw, 80px) !important; }
          .hero-buttons { flex-direction: column !important; }
          .hero-buttons a,
          .hero-buttons button { width: 100% !important; justify-content: center !important; }
        }
      `}</style>
    </section>
  );
}
