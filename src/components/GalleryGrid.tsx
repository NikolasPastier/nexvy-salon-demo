"use client";

import { useState } from "react";
import Image from "next/image";

const TABS = ["Všetko", "Strihanie", "Farbenie", "Balayage"] as const;
type Tab = (typeof TABS)[number];

const ITEMS = [
  { id: 1, seed: "gal-cut-1",   category: "Strihanie", label: "Dámsky strih" },
  { id: 2, seed: "gal-col-1",   category: "Farbenie",  label: "Celkové farbenie" },
  { id: 3, seed: "gal-bal-1",   category: "Balayage",  label: "Svetlý balayage" },
  { id: 4, seed: "gal-cut-2",   category: "Strihanie", label: "Pánsky strih" },
  { id: 5, seed: "gal-col-2",   category: "Farbenie",  label: "Ombre efekt" },
  { id: 6, seed: "gal-bal-2",   category: "Balayage",  label: "Tmavý balayage" },
  { id: 7, seed: "gal-cut-3",   category: "Strihanie", label: "Kaderenie & styling" },
  { id: 8, seed: "gal-col-3",   category: "Farbenie",  label: "Melír klasický" },
];

export default function GalleryGrid() {
  const [active, setActive] = useState<Tab>("Všetko");

  const filtered =
    active === "Všetko" ? ITEMS : ITEMS.filter((i) => i.category === active);

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-12" role="group" aria-label="Filtrovať galériu podľa kategórie">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            aria-pressed={active === tab}
            className={[
              "px-6 py-2.5 font-label text-xs uppercase tracking-widest transition-all border rounded-xl",
              active === tab
                ? "bg-primary-container text-on-primary border-primary-container"
                : "border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:border-outline-variant",
            ].join(" ")}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((item) => (
          <div key={item.id} className="group">
            <div className="flex gap-[4px] rounded-xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
              {/* Before */}
              <div className="flex-1 relative aspect-square overflow-hidden">
                <Image
                  src={`https://picsum.photos/seed/${item.seed}-b4/700/700`}
                  alt={`${item.label} — pred zmenou`}
                  fill
                  sizes="(max-width: 768px) 50vw, 35vw"
                  className="object-cover grayscale"
                />
                <span className="absolute top-3 left-3 bg-surface/80 backdrop-blur-sm font-label text-[10px] tracking-[0.2em] text-on-surface-variant px-3 py-1 rounded-full">
                  Pred
                </span>
              </div>
              {/* After */}
              <div className="flex-1 relative aspect-square overflow-hidden">
                <Image
                  src={`https://picsum.photos/seed/${item.seed}-af/700/700`}
                  alt={`${item.label} — po zmene`}
                  fill
                  sizes="(max-width: 768px) 50vw, 35vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-3 left-3 bg-surface/80 backdrop-blur-sm font-label text-[10px] tracking-[0.2em] text-primary-container px-3 py-1 rounded-full">
                  Po
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <p className="font-label text-xs tracking-[0.2em] text-on-surface-variant/70">
                {item.label}
              </p>
              <span className="font-label text-[10px] tracking-widest text-on-surface-variant/40">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-on-surface-variant font-body text-sm py-20">
          Žiadne fotky pre túto kategóriu.
        </p>
      )}
    </div>
  );
}
