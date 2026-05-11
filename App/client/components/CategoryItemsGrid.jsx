"use client";

import { useState, useCallback, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import dynamic from "next/dynamic";
import MenuCard from "./MenuCard";

// Lazy-load ItemModal — only needed after a tap, never in the initial bundle.
const ItemModal = dynamic(() => import("./ItemModal"), { ssr: false });

// CategoryItemsGrid is the full items view for a single category.
// It lives at /[locale]/category/[categoryId] and receives its data from the
// server page component, keeping this component purely presentational + modal state.
export default function CategoryItemsGrid({ items, categoryName, locale }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const t = useTranslations();
    const isRtl = locale === "ar" || locale === "ckb";

    const handleItemClick = useCallback((item) => {
        setSelectedItem(item);
    }, []);

    const handleModalClose = useCallback(() => {
        setSelectedItem(null);
    }, []);

    return (
        <div className="w-full flex flex-col items-center">
            <main className="w-full max-w-[900px] px-8 pt-5 pb-[60px]">
                {/* Back row */}
                <div className="flex items-center gap-3 pb-10">
                    <Link
                        href={`/${locale}`}
                        className="inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-ink-700 bg-white border border-ink-100 rounded-full px-4 py-[7px] cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.06)] transition-colors hover:bg-ink-50"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                            className={`shrink-0 ${isRtl ? "rotate-180" : ""}`}>
                            <path d="M11.5 7H2.5M2.5 7L6 3.5M2.5 7L6 10.5"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="pt-[3px]">{t("item.back")}</span>
                    </Link>
                    <span className="text-[1.1rem] font-semibold text-ink-900">
                        {categoryName}
                    </span>
                </div>

                {items.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-4">
                        {items.map((item, i) => (
                            <MenuCard
                                key={item.id}
                                item={item}
                                index={i}
                                isRtl={isRtl}
                                onClick={handleItemClick}
                            />
                        ))}
                    </div>
                )}
            </main>

            {selectedItem && (
                <ItemModal
                    item={selectedItem}
                    isRtl={isRtl}
                    onClose={handleModalClose}
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