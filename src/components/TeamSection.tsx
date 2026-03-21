import FadeIn from "./ui/FadeIn";
import config from "../../content/site-config.json";

const photos: Record<string, string> = {
  jana:  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
  marek: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=400&q=80",
  lucia: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",
};

export default function TeamSection() {
  return (
    <section id="team" style={{ padding: "120px 48px", background: "var(--bg-2)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <FadeIn>
            <span className="label" style={{ display: "block", marginBottom: 16 }}>
              Majstri svojho remesla
            </span>
          </FadeIn>
          <FadeIn delay={100}>
            <h2>Náš tím</h2>
          </FadeIn>
        </div>

        {/* Grid */}
        <div
          className="team-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 48,
          }}
        >
          {config.team.map((member, i) => (
            <FadeIn key={member.id} delay={i * 120}>
              <TeamCard member={member} photo={photos[member.id] ?? ""} />
            </FadeIn>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .team-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { .team-grid { grid-template-columns: 1fr !important; } }

        .team-card-root:hover .team-photo-img {
          filter: grayscale(0%) !important;
          transform: scale(1.03) !important;
        }
        .team-card-root:hover .team-ring-inner {
          border-color: var(--gold) !important;
        }
        .team-card-root:hover .team-ring-outer {
          border-color: rgba(200,146,42,0.25) !important;
        }
      `}</style>
    </section>
  );
}

function TeamCard({ member, photo }: { member: { name: string; role: string; experience: string }; photo: string }) {
  return (
    <div
      className="team-card-root"
      style={{ textAlign: "center" }}
    >
      {/* Photo with rings */}
      <div style={{ position: "relative", width: 200, height: 200, margin: "0 auto 28px" }}>
        {/* Outer ring */}
        <div
          className="team-ring-outer"
          style={{
            position: "absolute",
            inset: -12,
            borderRadius: "50%",
            border: "1px solid transparent",
            transition: "border-color 0.4s 0.05s",
            pointerEvents: "none",
          }}
        />
        {/* Inner ring */}
        <div
          className="team-ring-inner"
          style={{
            position: "absolute",
            inset: -6,
            borderRadius: "50%",
            border: "1px solid transparent",
            transition: "border-color 0.4s",
            pointerEvents: "none",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          alt={member.name}
          className="team-photo-img"
          style={{
            width: 200, height: 200,
            borderRadius: "50%",
            objectFit: "cover",
            filter: "grayscale(60%)",
            transition: "filter 0.5s var(--ease), transform 0.5s var(--ease)",
            display: "block",
          }}
        />
      </div>

      <div
        style={{
          fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
          fontSize: 26,
          fontWeight: 400,
          marginBottom: 4,
          color: "var(--cream)",
        }}
      >
        {member.name}
      </div>
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--gold)",
          marginBottom: 6,
          fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
          fontWeight: 500,
        }}
      >
        {member.role}
      </div>
      <div
        style={{
          fontSize: 13,
          color: "var(--muted)",
          fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
          fontWeight: 300,
        }}
      >
        {member.experience}
      </div>
    </div>
  );
}
