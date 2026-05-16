"use client";

// components/CategoryItemsGrid.jsx
// Client Component — owns ItemModal open/close state only.
//
// useSearchParams() requires a Suspense boundary during static generation.
// The component is split into two parts:
//   - CategoryItemsGrid: the exported shell that provides the Suspense boundary
//   - CategoryItemsGridInner: the actual implementation that calls useSearchParams
//
// This keeps the Suspense boundary co-located with the component that needs it
// rather than pushing it up to page.jsx.
//
// Back navigation strategy:
//   CategoryCard embeds ?from=<sectionDocumentId> in the category href when
//   a section filter is active. handleBack reads that param and navigates
//   directly to /${locale}?section=<from> — bypassing the browser history
//   stack entirely. This means language switches on this page (which add new
//   history entries) don't interfere with the back destination.
//   If no ?from= param exists (user came from "All" or direct URL),
//   handleBack goes to /${locale} with no section filter.
import { useState, useCallback, Suspense } from "react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import MenuCard from "./MenuCard";

// Lazy-load ItemModal — only needed after a tap, never in the initial bundle.
// ssr: false because the modal uses document.body and window (browser APIs).
const ItemModal = dynamic(() => import("./ItemModal"), { ssr: false });

// Inner component — calls useSearchParams, must be inside <Suspense>.
function CategoryItemsGridInner({ items, categoryName, locale }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const t = useTranslations();
    const router = useRouter();
    const searchParams = useSearchParams();
    const isRtl = locale === "ar" || locale === "ckb";

    // Read the section the user came from — set by CategoryCard in the href.
    // Navigate directly to /${locale}?section=<from> instead of using
    // router.back() so that language switches on this page don't affect
    // where the back button goes.
    const handleBack = useCallback(() => {
        const from = searchParams.get("from");
        if (from) {
            router.push(`/${locale}?section=${from}`);
        } else {
            router.push(`/${locale}`);
        }
    }, [router, locale, searchParams]);

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

// Exported shell — provides the Suspense boundary required by useSearchParams
// during static generation. fallback={null} prevents layout shift.
export default function CategoryItemsGrid(props) {
    return (
        <Suspense fallback={null}>
            <CategoryItemsGridInner {...props} />
        </Suspense>
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