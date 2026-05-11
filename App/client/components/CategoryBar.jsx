"use client";

import { memo } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

// Pills link to /?section=<documentId> (stable across locales) instead of
// /?section=<id> (locale-specific numeric id). This ensures that switching
// language keeps the same section selected — e.g. "Japanese Cake" is section
// documentId "xyz" in both EN and CKB, even though its numeric id differs.
const CategoryBar = memo(function CategoryBar({ sections, activeSection, isRtl = false }) {
    const t = useTranslations();
    const locale = useLocale();

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
                    <div className="flex-1 hidden sm:block" />

                    <div className="flex items-center gap-2">
                        {/* "All" pill — clears section filter */}
                        <Pill
                            label={t("category.all")}
                            isActive={activeSection === null}
                            href={`/${locale}`}
                        />

                        {/* One pill per section — uses documentId for locale-stable URLs */}
                        {sections.map((sec) => (
                            <Pill
                                key={sec.id}
                                label={sec.name}
                                isActive={activeSection === sec.documentId}
                                href={`/${locale}?section=${sec.documentId}`}
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

const Pill = memo(function Pill({ label, isActive, href }) {
    return (
        <Link
            href={href}
            aria-pressed={isActive}
            className={[
                "flex-shrink-0 whitespace-nowrap px-4 py-2.5 rounded-full text-[0.82rem] font-medium tracking-[0.015em] cursor-pointer border-none transition-all duration-[200ms] ease-in-out",
                isActive
                    ? "bg-ink-900 text-white shadow-[0_2px_8px_rgba(17,16,8,0.18)]"
                    : "bg-white/70 text-ink-700 shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:bg-white hover:text-ink-900 outline outline-1 -outline-offset-1 outline-ink-200",
            ].join(" ")}
        >
            {label}
        </Link>
    );
});