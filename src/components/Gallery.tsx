"use client";

import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "./ui/image-comparison";

// ─── Slider handle shared across all three comparisons ───────────────────────

function SliderHandle() {
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                 w-8 h-8 rounded-full bg-[#C8922A] border-2 border-white
                 flex items-center justify-center shadow-lg"
    >
      <svg
        width="12"
        height="12"
        fill="none"
        stroke="white"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
      </svg>
    </div>
  );
}

// ─── Single comparison card ───────────────────────────────────────────────────

interface ComparisonCardProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  label: string;
  /** Show Pred/Po labels on the first card only */
  showLabels?: boolean;
}

function ComparisonCard({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  label,
  showLabels = false,
}: ComparisonCardProps) {
  return (
    <div className="space-y-4">
      <ImageComparison
        className="w-full overflow-hidden"
        style={{ aspectRatio: "3/4", borderRadius: "16px" }}
        enableHover={false}
        springOptions={{ bounce: 0, duration: 300 }}
      >
        {/* Before — grayscale */}
        <ImageComparisonImage
          src={beforeSrc}
          alt={beforeAlt}
          position="left"
          className="grayscale brightness-75"
        />
        {/* After — full colour */}
        <ImageComparisonImage
          src={afterSrc}
          alt={afterAlt}
          position="right"
        />

        {/* Slider line + handle */}
        <ImageComparisonSlider className="w-px bg-[#C8922A]/60">
          <SliderHandle />

          {/* Pred / Po pill labels — first card only */}
          {showLabels && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-16">
              <span
                className="text-[9px] tracking-[0.15em] uppercase text-white/70
                           -translate-x-10 bg-black/40 px-2 py-1 backdrop-blur-sm rounded-full"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                PRED
              </span>
              <span
                className="text-[9px] tracking-[0.15em] uppercase text-[#0C0B09]
                           translate-x-2 bg-[#C8922A] px-2 py-1 rounded-full"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                PO
              </span>
            </div>
          )}
        </ImageComparisonSlider>
      </ImageComparison>

      <p
        className="text-center text-[11px] tracking-[0.18em] uppercase text-[#7A756C]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {label}
      </p>
    </div>
  );
}

// ─── Gallery section ──────────────────────────────────────────────────────────

export default function Gallery() {
  return (
    <section id="gallery" className="bg-[#141210] py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-16 gallery-header-flex">
          <div>
            <span
              className="block text-[11px] font-medium tracking-[0.18em] uppercase
                         text-[#C8922A] mb-4"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Naša práca
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(40px, 5vw, 66px)",
                fontWeight: 400,
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                color: "#EDE8DF",
                margin: 0,
              }}
            >
              Pred &amp;{" "}
              <em style={{ color: "#C8922A", fontStyle: "italic", fontWeight: 300 }}>
                Po
              </em>
            </h2>
          </div>

          <a
            href="#cta"
            className="hidden md:inline-flex items-center px-6 py-3 border
                       border-[rgba(237,232,223,0.2)] text-[11px] tracking-[0.14em]
                       uppercase text-[#EDE8DF] hover:border-[#EDE8DF] transition-colors rounded-full"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Rezervovať termín →
          </a>
        </div>

        {/* Hint */}
        <p
          className="text-[13px] text-[#7A756C] mb-10 flex items-center gap-2"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <svg
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path d="M8 9l4-4 4 4M16 15l-4 4-4-4" />
          </svg>
          Potiahnite doprava alebo doľava pre zobrazenie výsledku
        </p>

        {/* 3 comparison sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <ComparisonCard
            beforeSrc="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80"
            afterSrc="https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&q=80"
            beforeAlt="Pred - Balayage"
            afterAlt="Po - Balayage"
            label="Balayage"
            showLabels
          />
          <ComparisonCard
            beforeSrc="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80"
            afterSrc="https://images.unsplash.com/photo-1554519934-e32b1629d9ee?w=600&q=80"
            beforeAlt="Pred - Farbenie"
            afterAlt="Po - Farbenie"
            label="Farbenie vlasov"
          />
          <ComparisonCard
            beforeSrc="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80"
            afterSrc="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80"
            beforeAlt="Pred - Strihanie"
            afterAlt="Po - Strihanie"
            label="Strihanie & Styling"
          />
        </div>

        {/* Mobile CTA */}
        <div className="md:hidden mt-10 text-center">
          <a
            href="#cta"
            className="inline-flex items-center px-8 py-4 border
                       border-[rgba(237,232,223,0.2)] text-[11px] tracking-[0.14em]
                       uppercase text-[#EDE8DF] rounded-full"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Rezervovať termín →
          </a>
        </div>

      </div>

      {/* Responsive tweaks */}
      <style>{`
        @media (max-width: 640px) {
          .gallery-header-flex { flex-direction: column !important; align-items: flex-start !important; gap: 20px !important; }
        }
      `}</style>
    </section>
  );
}
