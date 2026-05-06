"use client";

import LanguageSwitcher from "./LanguageSwitcher";

export default function TopNavBar() {
  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--ink-100)",
      }}
    >
      <div
        className="max-w-2xl mx-auto px-5 flex items-center justify-between"
        style={{ height: "60px" }}
      >
        {/* Wordmark */}
        <div className="flex items-center gap-2.5">
          {/* Minimal icon mark */}
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "1.5px solid var(--gold-500)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1L8.5 5.5H13L9.5 8.5L11 13L7 10L3 13L4.5 8.5L1 5.5H5.5L7 1Z"
                fill="var(--gold-500)"
              />
            </svg>
          </div>

          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.05rem",
              fontWeight: 600,
              letterSpacing: "0.01em",
              color: "var(--ink-900)",
            }}
          >
            حلوياتنا
          </span>
        </div>

        {/* Language switcher */}
        <LanguageSwitcher />
      </div>
    </header>
  );
}