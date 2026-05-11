"use client";

import { useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import CategoryBar from "./CategoryBar";
import CategoryCard from "./CategoryCard";

export default function MenuGrid({ categories, sections }) {
    const t = useTranslations();
    const locale = useLocale();
    const isRtl = locale === "ar" || locale === "ckb";
    const searchParams = useSearchParams();

    // activeSection is now a documentId string (e.g. "abc123xyz") or null.
    // Previously it was a Number() — that broke cross-locale section filtering
    // because numeric ids differ per locale. documentId is stable across all locales.
    const activeSection = searchParams.get("section") ?? null;

    // Filter visible sections by documentId match — only recomputes when
    // sections array or URL param changes.
    const visibleSections = useMemo(
        () =>
            activeSection === null
                ? sections
                : sections.filter((s) => s.documentId === activeSection),
        [sections, activeSection]
    );

    return (
        <div className="w-full flex flex-col items-center">
            <CategoryBar
                sections={sections}
                activeSection={activeSection}
                isRtl={isRtl}
            />

            <main className="w-full max-w-[900px] px-8 pt-10 sm:pt-0 pb-[60px]">
                {visibleSections.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="flex flex-col gap-28 sm:gap-20">
                        {visibleSections.map((sec) => {
                            const sectionCats = categories.filter(
                                (c) => c.sectionId === sec.id
                            );
                            if (sectionCats.length === 0) return null;

                            return (
                                <section key={sec.id}>
                                    <h2
                                        className="text-[2rem] sm:text-[2.4rem] font-extrabold text-ink-900 leading-[1.1] tracking-[-0.02em] pb-10 sm:p-12 text-center"
                                        dir={isRtl ? "rtl" : "ltr"}
                                    >
                                        {sec.name}
                                    </h2>

                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                                        {sectionCats.map((cat, i) => (
                                            <CategoryCard
                                                key={cat.id}
                                                category={cat}
                                                locale={locale}
                                                index={i}
                                                isRtl={isRtl}
                                            />
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}

function EmptyState() {
    const t = useTranslations();
    return (
        <div className="flex flex-col items-center justify-center text-center pt-[80px] pb-[80px]">
            <div className="w-16 h-16 rounded-full bg-ink-100 flex items-center justify-center text-[1.8rem] mb-4">
                🍬
            </div>
            <p className="text-[0.88rem] font-light text-ink-400">
                {t("item.unavailable")}
            </p>
        </div>
    );
}