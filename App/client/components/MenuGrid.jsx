"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import CategoryCard from "./CategoryCard";
import MenuCard from "./MenuCard";
import ItemModal from "./ItemModal";

export default function MenuGrid({ items, categories }) {
    const [activeCategory, setActiveCategory] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const t = useTranslations();
    const locale = useLocale();
    const isRtl = locale === "ar" || locale === "ckb";

    // If no category selected, show category cards grid (homepage)
    if (activeCategory === null) {
        return (
            <div className="w-full flex flex-col items-center">
                <main className="w-full max-w-[900px] px-8 pt-3 pb-[60px]">
                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-5">
                        {categories.map((cat, i) => (
                            <CategoryCard
                                key={cat.id}
                                category={cat}
                                index={i}
                                isRtl={isRtl}
                                onClick={() => setActiveCategory(cat.id)}
                            />
                        ))}
                    </div>
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

    // Category selected — show items with a back bar
    const filtered = items.filter((item) => item.categoryId === activeCategory);
    const activeCat = categories.find((c) => c.id === activeCategory);

    return (
        <div className="w-full flex flex-col items-center">
            {/* Back bar */}
            <div className="w-full max-w-[900px] px-8 pb-5 flex items-center gap-3">
                <button
                    onClick={() => setActiveCategory(null)}
                    className="inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-ink-700 bg-white border border-ink-100 rounded-full px-4 py-[7px] cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className={`shrink-0 ${isRtl ? "rotate-180" : ""}`}
                    >
                        <path d="M11.5 7H2.5M2.5 7L6 3.5M2.5 7L6 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {t("item.back")}
                </button>
                <span
                    className="text-[1.1rem] font-semibold text-ink-900"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    {activeCat?.name}
                </span>
            </div>

            <main className="w-full max-w-[900px] px-8 pb-[60px]">
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

function EmptyState() {
    const t = useTranslations();
    return (
        <div className="flex flex-col items-center justify-center text-center pt-[80px] pb-[80px]">
            <div className="w-16 h-16 rounded-full bg-ink-100 flex items-center justify-center text-[1.8rem] mb-4">
                🍬
            </div>
            <p className="text-[0.88rem] text-ink-400">
                {t("item.unavailable")}
            </p>
        </div>
    );
}