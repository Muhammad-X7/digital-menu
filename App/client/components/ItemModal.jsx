"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ItemModal({ item, isRtl = false, onClose }) {
    const t = useTranslations();

    const formattedPrice = isRtl
        ? Number(item.price).toLocaleString("en-US").replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])
        : Number(item.price).toLocaleString("en-US");

    const currency = isRtl ? "د.ع" : "IQD";

    // Lock body scroll when open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    // Close on Escape
    useEffect(() => {
        function onKey(e) {
            if (e.key === "Escape") onClose();
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="fixed inset-0 z-[200] backdrop-blur-[4px] [animation:backdropIn_0.22s_ease]"
                style={{
                    background: "rgba(0,0,0,0.45)",
                    WebkitBackdropFilter: "blur(4px)",
                }}
            />

            {/* Modal */}
            <div
                role="dialog"
                aria-modal="true"
                dir={isRtl ? "rtl" : "ltr"}
                className={[
                    "fixed z-[201] bg-white rounded-[var(--radius-xl)] overflow-hidden",
                    "flex flex-row shadow-[0_32px_80px_rgba(0,0,0,0.22)]",
                    "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                    "w-[min(760px,calc(100vw-32px))] max-h-[calc(100dvh-48px)]",
                    "[animation:modalIn_0.28s_cubic-bezier(0.22,1,0.36,1)]",
                    /* Mobile: bottom sheet */
                    "max-sm:left-0 max-sm:top-auto max-sm:bottom-0 max-sm:translate-x-0 max-sm:translate-y-0",
                    "max-sm:w-full max-sm:max-h-[90dvh]",
                    "max-sm:rounded-b-none",
                    "max-sm:flex-col",
                    "max-sm:[animation:sheetIn_0.30s_cubic-bezier(0.22,1,0.36,1)]",
                ].join(" ")}
            >
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
                        <div className="w-full h-full flex items-center justify-center text-[4rem]">
                            🍬
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="flex-1 px-7 pt-8 pb-7 flex flex-col overflow-y-auto">
                    {/* Category badge */}
                    {item.categoryName && (
                        <span className="self-start inline-block text-[0.68rem] font-semibold tracking-[0.08em] uppercase text-brand-600 bg-brand-100 px-2.5 py-[3px] rounded-full mb-3">
                            {item.categoryName}
                        </span>
                    )}

                    {/* Name */}
                    <h2 className="text-[1.5rem] font-bold leading-[1.2] text-ink-900 mb-3">
                        {item.name}
                    </h2>

                    {/* Description */}
                    {item.description && (
                        <p className="text-[0.9rem] font-light leading-[1.7] text-ink-600 mb-6 flex-1">
                            {item.description}
                        </p>
                    )}

                    {/* Price */}
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
            </div>

            <style>{`
        @keyframes backdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: translate(-50%, -46%) scale(0.96); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes sheetIn {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
      `}</style>
        </>
    );
}