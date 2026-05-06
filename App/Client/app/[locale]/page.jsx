import { getTranslations } from "next-intl/server";
import { getCategories, getMenuItems } from "../../lib/strapi";
import TopNavBar from "../../components/TopNavBar";
import MenuGrid from "../../components/MenuGrid";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "menu" });
  return { title: t("title") };
}

export default async function MenuPage({ params }) {
  const { locale } = await params;

  let categories = [];
  let items = [];

  try {
    [categories, items] = await Promise.all([
      getCategories(locale),
      getMenuItems(locale),
    ]);
  } catch (err) {
    console.error("Failed to fetch menu data:", err);
  }

  const headingMap = {
    ar: { label: "قائمتنا", heading: "حلوياتنا الشهية" },
    ckb: { label: "مێنیوی ئێمە", heading: "شیرینییەکانمان" },
    en: { label: "Our Menu", heading: "Our Confectionery" },
  };
  const copy = headingMap[locale] ?? headingMap.en;

  return (
    <div style={{ minHeight: "100vh", background: "var(--background)" }}>
      <TopNavBar />

      {/* ── Page header ──────────────────────────────── */}
      <div
        style={{
          padding: "36px 20px 28px",
          textAlign: "center",
          background: "var(--background)",
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontSize: "0.68rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--gold-500)",
            marginBottom: "10px",
          }}
        >
          {copy.label}
        </p>

        {/* Heading */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 5vw, 2rem)",
            fontWeight: 700,
            color: "var(--ink-900)",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
          }}
        >
          {copy.heading}
        </h1>

        {/* Thin decorative rule */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginTop: "16px",
            color: "var(--ink-200)",
          }}
        >
          <div style={{ width: "40px", height: "1px", background: "currentColor" }} />
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 0L6.2 3.8H10L6.9 6.2L8.1 10L5 7.6L1.9 10L3.1 6.2L0 3.8H3.8L5 0Z" fill="var(--gold-400)" />
          </svg>
          <div style={{ width: "40px", height: "1px", background: "currentColor" }} />
        </div>
      </div>

      <MenuGrid items={items} categories={categories} />
    </div>
  );
}