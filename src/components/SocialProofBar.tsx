// Marquee bar — pure CSS animation, no client JS needed
const items = [
  { stars: true, text: "4.9 Google hodnotenie" },
  { text: "156+ spokojných klientov" },
  { text: "Centrum Bratislavy" },
  { text: "Prémiové produkty" },
  { text: "Online rezervácia 24/7" },
];

function MarqueeItem({ item }: { item: typeof items[number] }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 32,
        padding: "0 40px",
        fontSize: 11,
        letterSpacing: "0.18em",
        textTransform: "uppercase" as const,
        color: "var(--muted)",
        whiteSpace: "nowrap" as const,
        fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
        fontWeight: 400,
      }}
    >
      {item.stars && (
        <span style={{ color: "var(--gold)", fontSize: 14 }}>★★★★★</span>
      )}
      <strong style={{ color: "var(--cream)", fontWeight: 400 }}>{item.text}</strong>
      <span
        style={{
          width: 4, height: 4,
          background: "var(--gold)",
          borderRadius: "50%",
          display: "inline-block",
          flexShrink: 0,
        }}
      />
    </span>
  );
}

export default function SocialProofBar() {
  return (
    <div
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg-2)",
        padding: "18px 0",
        overflow: "hidden",
      }}
    >
      {/* Duplicate items for seamless loop */}
      <div className="animate-marquee" style={{ display: "flex", whiteSpace: "nowrap" }}>
        {[...items, ...items].map((item, i) => (
          <MarqueeItem key={i} item={item} />
        ))}
      </div>
    </div>
  );
}
