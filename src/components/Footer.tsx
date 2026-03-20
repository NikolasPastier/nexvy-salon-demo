import Link from "next/link";
import { Instagram, Facebook, Star } from "lucide-react";
import config from "../../content/site-config.json";
import BookingTrigger from "./BookingTrigger";

export default function Footer() {
  const { business } = config;

  return (
    <footer className="bg-surface-container-lowest border-t border-surface-container-low/50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-8 md:px-12 py-20 max-w-7xl mx-auto">

        {/* Brand */}
        <div>
          <div className="font-headline text-xl font-bold text-on-surface mb-6">
            {business.name}
          </div>
          <p className="font-body text-sm text-on-surface/60 leading-relaxed mb-8 max-w-xs">
            {business.tagline}
          </p>
          {/* Google rating */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={12} strokeWidth={0} className={i < Math.floor(business.rating) ? "fill-primary-container" : "fill-on-surface/20"} />
              ))}
            </div>
            <span className="font-label text-xs text-on-surface-variant">
              {business.rating} · {business.reviewCount} recenzií
            </span>
          </div>
          {/* Social */}
          <div className="flex gap-5">
            <a href={business.contacts.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-on-surface-variant hover:text-primary-container transition-colors">
              <Instagram size={18} strokeWidth={1.5} />
            </a>
            <a href={business.contacts.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-on-surface-variant hover:text-primary-container transition-colors">
              <Facebook size={18} strokeWidth={1.5} />
            </a>
            <a href={business.contacts.google} target="_blank" rel="noopener noreferrer" aria-label="Google" className="text-on-surface-variant hover:text-primary-container transition-colors">
              {/* Google "G" icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[18px] h-[18px]">
                <path d="M21.35 11.1H12v2.88h5.35c-.48 2.41-2.57 4.02-5.35 4.02a6 6 0 1 1 0-12c1.47 0 2.8.53 3.83 1.4L18.2 5a9.96 9.96 0 0 0-6.2-2 10 10 0 1 0 0 20c5.52 0 10-4 10-10 0-.67-.07-1.33-.2-1.97-.03-.13-.13-.93-.45-.93Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Hours */}
        <div>
          <h4 className="font-headline text-lg text-primary-container mb-8">
            Otváracie hodiny
          </h4>
          <div className="font-body text-sm text-on-surface space-y-4">
            <div className="flex justify-between border-b border-outline-variant/10 pb-3">
              <span className="text-on-surface/60">Pondelok – Piatok</span>
              <span>{business.hours.monday_friday}</span>
            </div>
            <div className="flex justify-between border-b border-outline-variant/10 pb-3">
              <span className="text-on-surface/60">Sobota</span>
              <span>{business.hours.saturday}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface/60">Nedeľa</span>
              <span className="text-primary-container">{business.hours.sunday}</span>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-headline text-lg text-primary-container mb-8">
            Kontakt
          </h4>
          <div className="font-body text-sm text-on-surface space-y-4">
            <p className="text-on-surface/60 leading-relaxed">
              {business.contacts.address}
            </p>
            <a
              href={`tel:${business.contacts.phone.replace(/\s/g, "")}`}
              className="block hover:text-primary-container transition-colors"
            >
              {business.contacts.phone}
            </a>
            <a
              href={`mailto:${business.contacts.email}`}
              className="block hover:text-primary-container transition-colors"
            >
              {business.contacts.email}
            </a>
            <BookingTrigger
              className="inline-flex items-center min-h-[44px] bg-primary-container text-on-primary font-label font-bold uppercase tracking-widest text-xs px-6 mt-2 hover:brightness-110 transition-all rounded-xl"
            >
              Rezervovať termín
            </BookingTrigger>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-surface-container-low/50 px-8 md:px-12 py-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface/40">
          © {new Date().getFullYear()} {business.name}. Všetky práva vyhradené.
        </p>
        <div className="flex gap-8">
          <Link href="/ochrana-osobnych-udajov" className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface/40 hover:text-primary-container transition-colors">
            Ochrana údajov
          </Link>
          <Link href="/podmienky" className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface/40 hover:text-primary-container transition-colors">
            Obchodné podmienky
          </Link>
        </div>
      </div>
    </footer>
  );
}
