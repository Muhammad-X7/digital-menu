"use client";

// components/CategoryItemsGrid.jsx
// Client Component — owns ItemModal open/close state only.
//
// Data arrives as plain serialisable props from the CategoryPage Server
// Component — no fetching happens here. The client-side responsibilities are:
//   1. selectedItem state — which item's modal is open (null = closed)
//   2. handleItemClick / handleModalClose — stable callbacks via useCallback
//   3. Lazy-loading ItemModal via next/dynamic — the modal JS is excluded from
//      the initial bundle and only downloaded after the first card tap
//
// The Back button uses router.back() when there is browser history so that
// the exact previous URL — including any ?section= query param — is restored.
// If the user arrived directly (shared link, typed URL), window.history.length
// is 1 and there is nothing to go back to, so we fall back to /${locale}.
//
// MenuCard is a "use client" component (it has an onClick prop). It is
// memoized so that changing selectedItem (e.g. opening/closing a modal) does
// NOT re-render every card — only the modal itself re-renders.
import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import MenuCard from "./MenuCard";

// Lazy-load ItemModal — only needed after a tap, never in the initial bundle.
// ssr: false because the modal uses document.body and window (browser APIs).
const ItemModal = dynamic(() => import("./ItemModal"), { ssr: false });

export default function CategoryItemsGrid({ items, categoryName, locale }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const t = useTranslations();
    const router = useRouter();
    const isRtl = locale === "ar" || locale === "ckb";

    // router.back() restores the exact previous URL including ?section= param.
    // Falls back to /${locale} if the user arrived directly with no history.
    const handleBack = useCallback(() => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push(`/${locale}`);
        }
    }, [router, locale]);

    // useCallback: stable reference prevents MenuCard re-renders caused by
    // a new function identity on every CategoryItemsGrid render.
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
                    <button
                        onClick={handleBack}
                        className="inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-ink-700 bg-white border border-ink-100 rounded-full px-4 py-[7px] cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.06)] transition-colors hover:bg-ink-50"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                            className={`shrink-0 ${isRtl ? "rotate-180" : ""}`}>
                            <path d="M11.5 7H2.5M2.5 7L6 3.5M2.5 7L6 10.5"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="pt-[3px]">{t("item.back")}</span>
                    </button>
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

            {/* ItemModal only mounts when an item is selected */}
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