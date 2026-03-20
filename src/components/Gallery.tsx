import Image from "next/image";
import FadeIn from "./ui/FadeIn";

const pairs = [
  { seed: "galeria-a", label: "Balayage" },
  { seed: "galeria-b", label: "Farbenie" },
  { seed: "galeria-c", label: "Strihanie" },
  { seed: "galeria-d", label: "Svadobný styling" },
];

export default function Gallery() {
  return (
    <section id="galeria" className="bg-surface-container-lowest py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="mb-12">
            <span className="text-primary-container font-label tracking-[0.3em] text-xs block mb-4">
              Naša práca
            </span>
            <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter text-on-surface">
              Pred &amp;{" "}
              <span className="italic text-primary-container">Po</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pairs.map((pair, i) => (
            <FadeIn key={pair.seed} delay={i * 100}>
              <div className="group">
                <div className="flex gap-[4px] rounded-xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                  {/* Before */}
                  <div className="flex-1 relative aspect-square overflow-hidden">
                    <Image
                      src={`https://picsum.photos/seed/${pair.seed}-b4/600/600`}
                      alt={`${pair.label} — pred zmenou`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover grayscale"
                    />
                    <span className="absolute top-3 left-3 bg-surface/80 backdrop-blur-sm font-label text-[10px] tracking-[0.2em] text-on-surface-variant px-3 py-1 rounded-full">
                      Pred
                    </span>
                  </div>
                  {/* After */}
                  <div className="flex-1 relative aspect-square overflow-hidden">
                    <Image
                      src={`https://picsum.photos/seed/${pair.seed}-af/600/600`}
                      alt={`${pair.label} — po zmene`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-surface/80 backdrop-blur-sm font-label text-[10px] tracking-[0.2em] text-primary-container px-3 py-1 rounded-full">
                      Po
                    </span>
                  </div>
                </div>
                <p className="font-label text-xs tracking-[0.2em] text-on-surface-variant/60 text-center mt-3">
                  {pair.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
