"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { locales } from "../i18n";

const LABELS = {
  ar: "عربي",
  en: "English",
  ckb: "کوردی",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isRtl = locale === "ar" || locale === "ckb";

  function switchLocale(newLocale) {
    if (newLocale === locale) { setOpen(false); return; }
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    setOpen(false);
  }

  // Close on outside click
  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 20px",
          borderRadius: "var(--radius-full)",
          background: "#fff",
          border: "1px solid var(--ink-100)",
          fontSize: "0.9rem",
          fontWeight: 500,
          color: "var(--ink-900)",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          transition: "box-shadow 0.18s ease",
        }}
      >
        {LABELS[locale]}
        {/* Chevron */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.18s ease",
            color: "var(--ink-400)",
          }}
        >
          <path d="M2.5 5L7 9.5L11.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            ...(isRtl ? { left: 0 } : { right: 0 }),
            minWidth: "140px",
            background: "#fff",
            border: "1px solid var(--ink-100)",
            borderRadius: "var(--radius-md)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
            overflow: "hidden",
            zIndex: 100,
          }}
        >
          {locales.map((loc) => {
            const isActive = loc === locale;
            return (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                style={{
                  width: "100%",
                  padding: "10px 16px",
                  textAlign: isRtl ? "right" : "left",
                  fontSize: "0.88rem",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "var(--ink-900)" : "var(--ink-700)",
                  background: isActive ? "var(--ink-50)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.12s ease",
                  display: "block",
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "var(--ink-50)"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
              >
                {LABELS[loc]}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}