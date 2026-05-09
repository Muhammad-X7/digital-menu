"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import CategoryBar from "./CategoryBar";
import CategoryCard from "./CategoryCard";
import MenuCard from "./MenuCard";
import ItemModal from "./ItemModal";

export default function MenuGrid({ items, categories, sections }) {
    const [activeSection, setActiveSection] = useState(null); // null = All
    const [activeCategory, setActiveCategory] = useState(null); // drill-down
    const [selectedItem, setSelectedItem] = useState(null);
    const t = useTranslations();
    const locale = useLocale();
    const isRtl = locale === "ar" || locale === "ckb";

    // ── Which sections to render in the cards area ──────────────────────────
    const visibleSections =
        activeSection === null
            ? sections
            : sections.filter((s) => s.id === activeSection);

    // ── Drill-down into a single category ───────────────────────────────────
    function openCategory(catId) {
        setActiveCategory(catId);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function closeCategory() {
        setActiveCategory(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // ── Item drill-down view ─────────────────────────────────────────────────
    if (activeCategory !== null) {
        const cat = categories.find((c) => c.id === activeCategory);
        const filtered = items.filter((i) => i.categoryId === activeCategory);

        return (
            <div className="w-full flex flex-col items-center">
                <CategoryBar
                    sections={sections}
                    activeSection={activeSection}
                    onSelect={(secId) => { setActiveSection(secId); closeCategory(); }}
                    isRtl={isRtl}
                />

                <main className="w-full max-w-[900px] px-8 pt-5 pb-[60px]">
                    {/* Back row */}
                    <div className="flex items-center gap-3 mb-5">
                        <button
                            onClick={closeCategory}
                            className="inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-ink-700 bg-white border border-ink-100 rounded-full px-4 py-[7px] cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.06)] transition-colors hover:bg-ink-50"
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                className={`shrink-0 ${isRtl ? "rotate-180" : ""}`}>
                                <path d="M11.5 7H2.5M2.5 7L6 3.5M2.5 7L6 10.5"
                                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {t("item.back")}
                        </button>
                        <span className="text-[1.1rem] font-semibold text-ink-900">
                            {cat?.name}
                        </span>
                    </div>

                    {filtered.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-4">
                            {filtered.map((item, i) => (
                                <MenuCard
                                    key={item.id}
                                    item={item}
                                    index={i}
                                    isRtl={isRtl}
                                    onClick={setSelectedItem}
                                />
                            ))}
                        </div>
                    )}
                </main>

                {selectedItem && (
                    <ItemModal
                        item={selectedItem}
                        isRtl={isRtl}
                        onClose={() => setSelectedItem(null)}
                    />
                )}
            </div>
        );
    }

    // ── Categories view (All or filtered by section) ─────────────────────────
    return (
        <div className="w-full flex flex-col items-center">
            <CategoryBar
                sections={sections}
                activeSection={activeSection}
                onSelect={setActiveSection}
                isRtl={isRtl}
            />

            <main className="w-full max-w-[900px] px-8 pt-5 pb-[60px]">
                {visibleSections.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="flex flex-col gap-8">
                        {visibleSections.map((sec) => {
                            const sectionCats = categories.filter(
                                (c) => c.sectionId === sec.id
                            );
                            if (sectionCats.length === 0) return null;

                            return (
                                <section key={sec.id}>
                                    {/* Section header */}
                                    <div
                                        className="flex items-center gap-3 mb-3"
                                        dir={isRtl ? "rtl" : "ltr"}
                                    >
                                        <h2 className="text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-ink-400">
                                            {sec.name}
                                        </h2>
                                        <div className="flex-1 h-px bg-ink-100" />
                                    </div>

                                    {/* Category cards under this section */}
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                                        {sectionCats.map((cat, i) => (
                                            <CategoryCard
                                                key={cat.id}
                                                category={cat}
                                                index={i}
                                                isRtl={isRtl}
                                                onClick={() => openCategory(cat.id)}
                                            />
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                )}
            </main>

            {selectedItem && (
                <ItemModal
                    item={selectedItem}
                    isRtl={isRtl}
                    onClose={() => setSelectedItem(null)}
                />
            )}
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