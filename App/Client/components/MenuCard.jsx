import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";

export default function MenuCard({ item, index = 0 }) {
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}/item/${item.id}`}
      className="block card-lift animate-fade-up"
      style={{
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        background: "var(--surface)",
        border: "1px solid var(--ink-100)",
        animationDelay: `${index * 50}ms`,
        animationFillMode: "both",
        opacity: 0,
        textDecoration: "none",
      }}
    >
      {/* Image — 4:3 aspect */}
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: "75%",
        }}
      >
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.imageAlt || item.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: "var(--brand-100)",
              fontSize: "2rem",
            }}
          >
            🍬
          </div>
        )}

        {/* Subtle bottom fade so text reads on any image */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: "40%",
            background: "linear-gradient(to top, rgba(0,0,0,0.18), transparent)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Info */}
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

        {/* Price row */}
        <div className="flex items-baseline justify-between">
          <span
            style={{
              fontSize: "0.92rem",
              fontWeight: 700,
              color: "var(--gold-600)",
              letterSpacing: "-0.01em",
            }}
          >
            {Number(item.price).toLocaleString()}
          </span>
          <span
            style={{
              fontSize: "0.68rem",
              fontWeight: 500,
              color: "var(--ink-400)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            IQD
          </span>
        </div>
      </div>
    </Link>
  );
}