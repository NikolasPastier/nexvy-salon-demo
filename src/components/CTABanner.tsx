import BookingTrigger from "./BookingTrigger";
import config from "../../content/site-config.json";

export default function CTABanner() {
  return (
    <section className="bg-primary-container py-24 px-6 md:px-12 text-center rounded-t-[32px]">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-headline text-5xl md:text-6xl font-bold text-on-primary tracking-tighter mb-4 leading-tight">
          Zarezervujte si
          <br />
          <span className="italic underline decoration-1 underline-offset-8">
            termín
          </span>
        </h2>
        <p className="font-body text-on-primary/70 mb-12 text-lg">
          Zavolajte nám alebo sa objednajte online — ste u nás vždy vítaní.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <BookingTrigger
            className="bg-surface-container-lowest text-on-surface px-12 font-label font-bold uppercase tracking-widest text-sm hover:bg-surface-container-low transition-all flex items-center justify-center min-h-[56px] rounded-xl"
          >
            Rezervovať online
          </BookingTrigger>
          <a
            href={`tel:${config.business.contacts.phone.replace(/\s/g, "")}`}
            className="border-2 border-surface-container-lowest text-on-primary px-12 font-label font-bold uppercase tracking-widest text-sm hover:bg-surface-container-lowest/10 transition-all flex items-center justify-center min-h-[56px] rounded-xl"
          >
            {config.business.contacts.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
