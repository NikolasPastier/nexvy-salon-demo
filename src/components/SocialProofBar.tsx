import { Star } from "lucide-react";
import config from "../../content/site-config.json";

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          strokeWidth={0}
          className={i < full ? "fill-on-primary" : "fill-on-primary/30"}
        />
      ))}
    </span>
  );
}

export default function SocialProofBar() {
  const { rating, reviewCount } = config.business;
  return (
    <div className="bg-primary-container py-4 px-6">
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
        <div className="flex items-center gap-2">
          <StarRating rating={rating} />
          <span className="font-label font-bold uppercase tracking-widest text-xs text-on-primary">
            {rating} Google hodnotenie
          </span>
        </div>
        <span className="w-px h-4 bg-on-primary/20 hidden sm:block" />
        <span className="font-label font-bold uppercase tracking-widest text-xs text-on-primary">
          {reviewCount}+ spokojných klientov
        </span>
        <span className="w-px h-4 bg-on-primary/20 hidden sm:block" />
        <span className="font-label font-bold uppercase tracking-widest text-xs text-on-primary">
          Centrum Bratislavy
        </span>
      </div>
    </div>
  );
}
