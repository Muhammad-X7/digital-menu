"use client";

import { useTranslations } from "next-intl";

export default function CategoryBar({ categories, activeCategory, onSelect }) {
  const t = useTranslations();

  return (
    <div
      className="sticky z-40 w-full"
      style={{
        top: "60px", /* matches TopNavBar height */
        background: "rgba(248,246,242,0.90)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--ink-100)",
      }}
    >
      <div
        className="flex items-center gap-1.5 px-5 py-3 overflow-x-auto hide-scrollbar max-w-2xl mx-auto"
        role="navigation"
        aria-label="Category filter"
      >
        <Pill
          label={t("category.all")}
          isActive={activeCategory === null}
          onClick={() => onSelect(null)}
        />
        {categories.map((cat) => (
          <Pill
            key={cat.id}
            label={cat.name}
            isActive={activeCategory === cat.id}
            onClick={() => onSelect(cat.id)}
          />
        ))}
      </div>
    </div>
  );
}

function Pill({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={isActive}
      className="flex-shrink-0 whitespace-nowrap"
      style={{
        padding: "6px 16px",
        borderRadius: "var(--radius-full)",
        fontSize: "0.8rem",
        fontWeight: isActive ? 600 : 400,
        letterSpacing: "0.01em",
        transition: "all 0.18s ease",
        cursor: "pointer",
        border: "none",
        /* Active: warm charcoal fill */
        background: isActive ? "var(--ink-900)" : "transparent",
        color: isActive ? "#fff" : "var(--ink-700)",
        /* Subtle border on inactive */
        outline: isActive ? "none" : "1px solid var(--ink-200)",
        outlineOffset: "-1px",
      }}
    >
      {label}
    </button>
  );
}