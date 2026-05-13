"use client";

// components/ItemModal.jsx
// Client Component — manages popup open/close side-effects.
//
// Client-side responsibilities:
//   - useEffect to lock body scroll while the modal is open
//   - useEffect to listen for Escape key to close
//   - CSS keyframe animations (backdropIn, modalIn, sheetIn)
//
// Loaded lazily via next/dynamic in CategoryItemsGrid:
//   const ItemModal = dynamic(() => import("./ItemModal"), { ssr: false })
// This ensures the modal JS is NOT in the initial page bundle — it is only
// downloaded after the user taps a card for the first time.
//
// ssr: false is correct here because:
//   1. The modal is only visible after a user action (never on first paint)
//   2. It accesses document.body directly in useEffect
import { useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ItemModal({ item, isRtl = false, onClose }) {
    const t = useTranslations();

    const formattedPrice = isRtl
        ? Number(item.price).toLocaleString("en-US").replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])
        : Number(item.price).toLocaleString("en-US");

    const currency = isRtl ? "د.ع" : "IQD";

    // Lock body scroll when open — cleanup restores scroll on unmount.
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    // Close on Escape — cleanup removes the listener on unmount.
    useEffect(() => {
        function onKey(e) { if (e.key === "Escape") onClose(); }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    const content = (
        <>
            {/* Image */}
            <div className="relative w-[45%] max-sm:w-full shrink-0 bg-brand-100 min-h-[340px] max-sm:min-h-[220px]">
                {item.imageUrl ? (
                    <Image
                        src={item.imageUrl}
                        alt={item.imageAlt || item.name}
                        fill
                        className="object-cover"
                        sizes="340px"
                        priority
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[4rem]">🍬</div>
                )}
            </div>

            {/* Details */}
            <div className="flex-1 px-7 pt-8 pb-7 flex flex-col overflow-y-auto">
                {item.categoryName && (
                    <span className="self-start inline-block text-[0.68rem] font-semibold tracking-[0.08em] uppercase text-brand-600 bg-brand-100 px-2.5 py-[3px] rounded-full mb-3">
                        {item.categoryName}
                    </span>
                )}
                <h2 className="text-[1.5rem] font-bold leading-[1.2] text-ink-900 mb-3">
                    {item.name}
                </h2>
                {item.description && (
                    <p className="text-[0.9rem] font-light leading-[1.7] text-ink-600 mb-6 flex-1">
                        {item.description}
                    </p>
                )}
                <div className="flex items-baseline gap-1.5 mt-auto pt-5 border-t border-ink-100">
                    <span className="text-[2rem] font-extrabold text-gold-600 tracking-[-0.02em] leading-none">
                        {formattedPrice}
                    </span>
                    <span className="text-[0.75rem] font-normal text-ink-400 tracking-[0.06em] uppercase">
                        {currency}
                    </span>
                </div>
            </div>

            {/* Close button */}
            <button
                onClick={onClose}
                aria-label={t("item.back")}
                className={`absolute top-3.5 w-8 h-8 rounded-full bg-white/95 border border-ink-100 cursor-pointer flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.12)] z-[1] text-[1.1rem] text-ink-700 leading-none ${isRtl ? "left-3.5" : "right-3.5"}`}
            >
                ✕
            </button>
        </>
    );

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="fixed inset-0 z-[200] backdrop-blur-[4px]"
                style={{
                    background: "rgba(0,0,0,0.45)",
                    WebkitBackdropFilter: "blur(4px)",
                    animation: "backdropIn 0.22s ease both",
                }}
            />

            {/* ── Desktop: perfectly centered modal ── */}
            <div
                role="dialog"
                aria-modal="true"
                dir={isRtl ? "rtl" : "ltr"}
                className="max-sm:hidden flex flex-row fixed z-[201] bg-white rounded-[var(--radius-xl)] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.22)]"
                style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "min(760px, calc(100vw - 32px))",
                    maxHeight: "calc(100dvh - 48px)",
                    animation: "modalIn 0.30s cubic-bezier(0.22,1,0.36,1) both",
                    willChange: "transform, opacity",
                }}
            >
                {content}
            </div>

            {/* ── Mobile: bottom sheet ── */}
            <div
                role="dialog"
                aria-modal="true"
                dir={isRtl ? "rtl" : "ltr"}
                className="sm:hidden flex flex-col fixed z-[201] bg-white rounded-t-[var(--radius-xl)] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.22)] w-full max-h-[90dvh] bottom-0 left-0"
                style={{
                    animation: "sheetIn 0.30s cubic-bezier(0.22,1,0.36,1) both",
                    willChange: "transform, opacity",
                }}
            >
                {content}
            </div>

            <style>{`
                @keyframes backdropIn {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
                @keyframes modalIn {
                    from { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
                    to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                }
                @keyframes sheetIn {
                    from { opacity: 0; transform: translateY(100%); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
}