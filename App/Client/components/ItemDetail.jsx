"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function ItemDetail({ item }) {
  const locale = useLocale();
  const t = useTranslations();
  const isRtl = locale === "ar" || locale === "ckb";

  return (
    <div style={{ background: "var(--background)", minHeight: "100vh" }}>

      {/* ── Hero image ─────────────────────────────── */}
      <div style={{ position: "relative", width: "100%", height: "360px" }}>
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.imageAlt || item.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "var(--brand-100)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "4rem",
            }}
          >
            🍬
          </div>
        )}

        {/* Bottom gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, rgba(248,246,242,1) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* ── Content ────────────────────────────────── */}
      <div
        className="max-w-lg mx-auto"
        style={{ padding: "0 20px 60px", marginTop: "-24px", position: "relative" }}
      >
        {/* Back button */}
        <Link
          href={`/${locale}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.78rem",
            fontWeight: 500,
            color: "var(--ink-700)",
            textDecoration: "none",
            marginBottom: "20px",
            padding: "6px 12px",
            borderRadius: "var(--radius-full)",
            background: "rgba(255,255,255,0.85)",
            border: "1px solid var(--ink-100)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span style={{ fontSize: "13px" }}>{isRtl ? "→" : "←"}</span>
          {t("item.back")}
        </Link>

        {/* Card */}
        <div
          style={{
            background: "var(--surface)",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--ink-100)",
            overflow: "hidden",
          }}
        >
          {/* Category badge */}
          {item.categoryName && (
            <div style={{ padding: "18px 20px 0" }}>
              <span
                style={{
                  display: "inline-block",
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--brand-600)",
                  background: "var(--brand-100)",
                  padding: "3px 10px",
                  borderRadius: "var(--radius-full)",
                }}
              >
                {item.categoryName}
              </span>
            </div>
          )}

          {/* Name */}
          <div style={{ padding: "12px 20px 0" }}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.35rem",
                fontWeight: 700,
                lineHeight: 1.25,
                color: "var(--ink-900)",
                margin: 0,
              }}
            >
              {item.name}
            </h1>
          </div>

          {/* Price */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 20px 16px",
              margin: "14px 20px 0",
              borderTop: "1px solid var(--ink-100)",
              borderBottom: "1px solid var(--ink-100)",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 500,
                color: "var(--ink-400)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {t("item.price")}
            </span>
            <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
              <span
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 800,
                  color: "var(--gold-600)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                {Number(item.price).toLocaleString()}
              </span>
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 500,
                  color: "var(--ink-400)",
                  letterSpacing: "0.06em",
                }}
              >
                IQD
              </span>
            </div>
          </div>

          {/* Description */}
          {item.description && (
            <div style={{ padding: "16px 20px 20px" }}>
              <p
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--ink-400)",
                  marginBottom: "8px",
                }}
              >
                {t("item.description")}
              </p>
              <p
                style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  color: "var(--ink-700)",
                }}
              >
                {item.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}