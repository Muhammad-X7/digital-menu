import Image from "next/image";

export default function MenuCard({ item, index = 0, onClick }) {
  return (
    <button
      onClick={() => onClick(item)}
      className="menu-card card-lift animate-fade-up"
      style={{
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        background: "var(--surface)",
        border: "1px solid var(--ink-100)",
        animationDelay: `${index * 50}ms`,
        animationFillMode: "both",
        opacity: 0,
        cursor: "pointer",
        padding: 0,
        textAlign: "left",
        width: "100%",
      }}
    >
      {/* ── Desktop layout: vertical card ── */}
      <div className="card-desktop">
        <div style={{ position: "relative", width: "100%", paddingBottom: "75%" }}>
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.imageAlt || item.name}
              fill
              className="object-cover"
              sizes="(max-width: 900px) 33vw, 300px"
              loading={index === 0 ? "eager" : "lazy"}
              priority={index === 0}
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: "var(--brand-100)", fontSize: "2rem" }}
            >
              🍬
            </div>
          )}
          <div
            className="absolute inset-x-0 bottom-0"
            style={{
              height: "40%",
              background: "linear-gradient(to top, rgba(0,0,0,0.18), transparent)",
              pointerEvents: "none",
            }}
          />
        </div>

        <div style={{ padding: "12px 14px 14px" }}>
          <p
            className="line-clamp-2"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.88rem",
              fontWeight: 500,
              color: "var(--ink-900)",
              lineHeight: 1.35,
              marginBottom: "6px",
            }}
          >
            {item.name}
          </p>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--gold-600)", letterSpacing: "-0.01em" }}>
              {Number(item.price).toLocaleString()}
            </span>
            <span style={{ fontSize: "0.68rem", fontWeight: 500, color: "var(--ink-400)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              IQD
            </span>
          </div>
        </div>
      </div>

      {/* ── Mobile layout: horizontal row ── */}
      <div className="card-mobile">
        <div style={{ position: "relative", width: "100px", flexShrink: 0, borderRadius: "var(--radius-md)", overflow: "hidden", aspectRatio: "1/1" }}>
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.imageAlt || item.name}
              fill
              className="object-cover"
              sizes="100px"
              loading={index === 0 ? "eager" : "lazy"}
              priority={index === 0}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", background: "var(--brand-100)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem" }}>
              🍬
            </div>
          )}
        </div>

        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: "4px" }}>
          <p
            className="line-clamp-2"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "var(--ink-900)",
              lineHeight: 1.3,
            }}
          >
            {item.name}
          </p>
          {item.description && (
            <p
              className="line-clamp-1"
              style={{ fontSize: "0.78rem", color: "var(--ink-400)", lineHeight: 1.4 }}
            >
              {item.description}
            </p>
          )}
          <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginTop: "2px" }}>
            <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--gold-600)" }}>
              {Number(item.price).toLocaleString()}
            </span>
            <span style={{ fontSize: "0.65rem", fontWeight: 500, color: "var(--ink-400)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              IQD
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .menu-card .card-desktop { display: flex; flex-direction: column; }
        .menu-card .card-mobile  { display: none; }

        @media (max-width: 600px) {
          .menu-card .card-desktop { display: none; }
          .menu-card .card-mobile  {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 14px;
            padding: 12px 14px;
          }
        }
      `}</style>
    </button>
  );
}