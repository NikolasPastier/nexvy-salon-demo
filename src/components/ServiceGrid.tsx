import FadeIn from "./ui/FadeIn";
import BookingTrigger from "./BookingTrigger";

const services = [
  {
    id: "strihanie",
    title: "Strihanie a styling",
    price: "od €30",
    duration: "45 min",
    description: "Precízny strih podľa vašich predstáv s profesionálnym stylingom.",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
    alt: "Strihanie a styling",
  },
  {
    id: "farbenie",
    title: "Farbenie vlasov",
    price: "od €55",
    duration: "90 min",
    description: "Profesionálne farbenie s prémiovými farbami L'Oréal Professionnel.",
    img: "https://images.unsplash.com/photo-1554519934-e32b1629d9ee?w=600&q=80",
    alt: "Farbenie vlasov",
  },
  {
    id: "balayage",
    title: "Melír & Balayage",
    price: "od €75",
    duration: "120 min",
    description: "Prirodzené odtiene handpainted technikou od našich špecialistov.",
    img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80",
    alt: "Melír a Balayage",
  },
];

export default function ServiceGrid() {
  return (
    <section
      id="services"
      style={{ padding: "120px 48px", background: "var(--bg)" }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 72 }}>
          <FadeIn>
            <span className="label" style={{ display: "block", marginBottom: 16 }}>
              Čo ponúkame
            </span>
          </FadeIn>
          <FadeIn delay={100}>
            <h2>Naše služby</h2>
          </FadeIn>
          <FadeIn delay={200}>
            <p
              style={{
                maxWidth: 440,
                color: "var(--muted)",
                fontSize: 15,
                marginTop: 16,
                fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
              }}
            >
              Každá návšteva začína individuálnou konzultáciou. Používame výhradne prémiové produkty.
            </p>
          </FadeIn>
        </div>

        {/* Grid */}
        <FadeIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 1,
              background: "var(--border)",
            }}
            className="services-grid"
          >
            {services.map((svc) => (
              <ServiceCard key={svc.id} svc={svc} />
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Hover + responsive CSS */}
      <style>{`
        .service-card-root:hover .service-card-inner {
          border-color: var(--gold) !important;
          background: var(--bg-2) !important;
        }
        .service-card-root:hover .service-img {
          transform: scale(1.06) !important;
          filter: grayscale(30%) brightness(0.85) !important;
        }
        .service-card-root:hover .service-arrow-btn {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
        @media (max-width: 1024px) { .services-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { .services-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function ServiceCard({ svc }: { svc: typeof services[number] }) {
  return (
    <div
      className="service-card-root"
      style={{ background: "var(--bg)", overflow: "hidden", position: "relative" }}
    >
      {/* Image */}
      <div style={{ overflow: "hidden", height: 260, position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={svc.img}
          alt={svc.alt}
          loading="lazy"
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            filter: "grayscale(80%) brightness(0.75)",
            transition: "transform 0.7s var(--ease), filter 0.5s",
            display: "block",
          }}
          className="service-img"
        />
      </div>

      {/* Content */}
      <div
        className="service-card-inner"
        style={{
          padding: "40px 36px",
          borderTop: "2px solid transparent",
          transition: "border-color 0.35s var(--ease), background 0.35s",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <h3 style={{ fontSize: 24, fontWeight: 400 }}>{svc.title}</h3>
          <span
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontSize: 18,
              color: "var(--gold)",
              fontStyle: "italic",
              whiteSpace: "nowrap",
              paddingTop: 2,
            }}
          >
            {svc.price}
          </span>
        </div>
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.1em",
            color: "var(--muted)",
            textTransform: "uppercase",
            marginBottom: 14,
            fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
          }}
        >
          {svc.duration}
        </div>
        <p
          style={{
            fontSize: 14,
            color: "rgba(237,232,223,0.6)",
            lineHeight: 1.65,
            fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
            fontWeight: 300,
          }}
        >
          {svc.description}
        </p>
        <BookingTrigger
          serviceId={svc.id}
          className="service-arrow-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginTop: 20,
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--gold)",
            background: "none",
            border: "none",
            padding: 0,
            cursor: "none",
            fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
            opacity: 0,
            transform: "translateX(-8px)",
            transition: "opacity 0.3s, transform 0.3s",
          } as React.CSSProperties}
        >
          Rezervovať →
        </BookingTrigger>
      </div>

    </div>
  );
}
