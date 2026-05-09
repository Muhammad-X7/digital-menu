"use client";

import { useTranslations } from "next-intl";

export default function CategoryBar({ sections, activeSection, onSelect, isRtl = false }) {
    const t = useTranslations();

    return (
        <div
            className="sticky z-40 w-full border-b border-ink-100"
            style={{
                top: "88px",
                background: "rgba(251,240,224,0.92)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
            }}
        >
            <div
                className="flex items-center gap-2 px-5 py-3 overflow-x-auto hide-scrollbar max-w-[900px] mx-auto"
                role="navigation"
                aria-label="Section filter"
                dir={isRtl ? "rtl" : "ltr"}
            >
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
        </div>
    );
}

function Pill({ label, isActive, onClick }) {
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
}