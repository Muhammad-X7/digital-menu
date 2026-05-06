"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { locales } from "../i18n";

const LABELS = {
  ar: "عربي",
  en: "EN",
  ckb: "کوردی",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale) {
    if (newLocale === locale) return;
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  }

  return (
    <div
      className="flex items-center"
      style={{
        background: "var(--ink-50)",
        border: "1px solid var(--ink-100)",
        borderRadius: "var(--radius-full)",
        padding: "3px",
        gap: "2px",
      }}
    >
      {locales.map((loc) => {
        const isActive = loc === locale;
        return (
          <button
            key={loc}
            onClick={() => switchLocale(loc)}
            aria-label={`Switch to ${LABELS[loc]}`}
            aria-current={isActive ? "true" : undefined}
            style={{
              padding: "4px 10px",
              borderRadius: "var(--radius-full)",
              fontSize: "0.72rem",
              fontWeight: isActive ? 700 : 400,
              letterSpacing: "0.02em",
              transition: "all 0.18s ease",
              background: isActive ? "#fff" : "transparent",
              color: isActive ? "var(--ink-900)" : "var(--ink-400)",
              boxShadow: isActive ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              border: "none",
              cursor: "pointer",
              lineHeight: 1.4,
            }}
          >
            {LABELS[loc]}
          </button>
        );
      })}
    </div>
  );
}