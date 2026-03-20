import { Star } from "lucide-react";
import config from "../../content/site-config.json";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 text-primary-container mb-6">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={15} strokeWidth={0} className="fill-primary-container" />
      ))}
    </div>
  );
}

export default function ReviewCarousel() {
  return (
    <section className="bg-surface-container-low py-20 overflow-hidden">
      <div className="px-6 md:px-12 max-w-7xl mx-auto mb-10">
        <span className="text-primary-container font-label tracking-[0.3em] text-xs block mb-4">
          Čo hovoria klienti
        </span>
        <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter text-on-surface">
          Povedali o nás
        </h2>
      </div>

      <div className="flex gap-6 px-6 md:px-12 overflow-x-auto pb-6 snap-x snap-mandatory no-scrollbar">
        {config.reviews.map((review) => (
          <article
            key={review.author}
            className="min-w-[300px] md:min-w-[420px] bg-surface-container-high p-8 snap-center shrink-0 flex flex-col rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
          >
            <Stars count={review.rating} />
            <p className="font-headline italic text-lg leading-relaxed mb-8 text-on-surface flex-1">
              &ldquo;{review.text}&rdquo;
            </p>
            <div className="font-label text-sm font-medium text-on-surface-variant">
              — {review.author}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
