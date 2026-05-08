"use client";

import { useTranslations } from "next-intl";

export default function CategoryBar({ categories, activeCategory, onSelect, isRtl = false }) {
    const t = useTranslations();

    return (
        <div
            className="sticky z-40 w-full border-b border-ink-100 backdrop-blur-[12px]"
            style={{
                top: "60px",
                background: "rgba(248,246,242,0.90)",
                WebkitBackdropFilter: "blur(12px)",
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
            className={[
                "flex-shrink-0 whitespace-nowrap px-4 py-1.5 rounded-full text-[0.8rem] tracking-[0.01em] cursor-pointer border-none transition-all duration-[180ms] ease-in-out",
                isActive
                    ? "bg-ink-900 text-white font-semibold outline-none"
                    : "bg-transparent text-ink-700 font-normal outline outline-1 -outline-offset-1 outline-ink-200",
            ].join(" ")}
        >
            {label}
        </button>
    );
}