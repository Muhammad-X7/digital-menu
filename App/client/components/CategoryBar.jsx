"use client";

import { memo } from "react";
import { useTranslations } from "next-intl";

// memo: CategoryBar receives sections (stable array reference from server),
// activeSection (changes on pill click), onSelect (now stable useCallback from
// MenuGrid), and isRtl (stable). Without memo, it re-renders on every MenuGrid
// state change. With memo it only re-renders when activeSection changes — which
// is exactly when it needs to, to update the active pill highlight.
const CategoryBar = memo(function CategoryBar({ sections, activeSection, onSelect, isRtl = false }) {
    const t = useTranslations();

    return (
        <div
            className="w-full"
            style={{
                top: "88px",
                background: "rgba(251,240,224,0.92)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
            }}
        >
            {/* Outer: full width, scrollable on mobile */}
            <div className="w-full overflow-x-auto hide-scrollbar">
                {/* Inner: centered pills row */}
                <div
                    className="flex items-center gap-2 py-3 px-5 w-max mx-auto"
                    role="navigation"
                    aria-label="Section filter"
                    dir={isRtl ? "rtl" : "ltr"}
                    style={{ minWidth: "100%" }}
                >
                    {/* Spacer to help center when content fits */}
                    <div className="flex-1 hidden sm:block" />

                    <div className="flex items-center gap-2">
                        {/* "All" — always hardcoded */}
                        <Pill
                            label={t("category.all")}
                            isActive={activeSection === null}
                            onClick={() => onSelect(null)}
                        />

                        {/* One pill per section — dynamic from Strapi */}
                        {sections.map((sec) => (
                            <Pill
                                key={sec.id}
                                label={sec.name}
                                isActive={activeSection === sec.id}
                                onClick={() => onSelect(sec.id)}
                            />
                        ))}
                    </div>

                    <div className="flex-1 hidden sm:block" />
                </div>
            </div>
        </div>
    );
});

export default CategoryBar;

// Pill is a module-level component (not defined inside CategoryBar), so React
// never treats it as a new component type between renders. memo here prevents
// inactive pills from re-rendering when only the active pill changes.
const Pill = memo(function Pill({ label, isActive, onClick }) {
    return (
        <button
            onClick={onClick}
            aria-pressed={isActive}
            className={[
                "flex-shrink-0 whitespace-nowrap px-4 py-1.5 rounded-full text-[0.82rem] font-medium tracking-[0.015em] cursor-pointer border-none transition-all duration-[200ms] ease-in-out",
                isActive
                    ? "bg-ink-900 text-white shadow-[0_2px_8px_rgba(17,16,8,0.18)]"
                    : "bg-white/70 text-ink-700 shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:bg-white hover:text-ink-900 outline outline-1 -outline-offset-1 outline-ink-200",
            ].join(" ")}
        >
            {label}
        </button>
    );
});