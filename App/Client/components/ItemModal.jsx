"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ItemModal({ item, onClose }) {
    const t = useTranslations();

    // Lock body scroll when open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    // Close on Escape
    useEffect(() => {
        function onKey(e) { if (e.key === "Escape") onClose(); }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.45)",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                    zIndex: 200,
                    animation: "backdropIn 0.22s ease",
                }}
            />

            {/* Modal */}
            <div
                role="dialog"
                aria-modal="true"
                style={{
                    position: "fixed",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "min(760px, calc(100vw - 32px))",
                    maxHeight: "calc(100dvh - 48px)",
                    background: "#fff",
                    borderRadius: "var(--radius-xl)",
                    overflow: "hidden",
                    zIndex: 201,
                    display: "flex",
                    flexDirection: "row",
                    boxShadow: "0 32px 80px rgba(0,0,0,0.22)",
                    animation: "modalIn 0.28s cubic-bezier(0.22,1,0.36,1)",
                }}
            >
                {/* Left: Image */}
                <div
                    style={{
                        position: "relative",
                        width: "45%",
                        flexShrink: 0,
                        background: "var(--brand-100)",
                        minHeight: "340px",
                    }}
                >
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
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "4rem",
                            }}
                        >
                            🍬
                        </div>
                    )}
                </div>

                {/* Right: Details */}
                <div
                    style={{
                        flex: 1,
                        padding: "32px 28px 28px",
                        display: "flex",
                        flexDirection: "column",
                        overflowY: "auto",
                    }}
                >
                    {/* Category badge */}
                    {item.categoryName && (
                        <span
                            style={{
                                display: "inline-block",
                                fontSize: "0.68rem",
                                fontWeight: 600,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                color: "var(--brand-600)",
                                background: "var(--brand-100)",
                                padding: "3px 10px",
                                borderRadius: "var(--radius-full)",
                                marginBottom: "12px",
                                alignSelf: "flex-start",
                            }}
                        >
                            {item.categoryName}
                        </span>
                    )}

                    {/* Name */}
                    <h2
                        style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "1.5rem",
                            fontWeight: 700,
                            lineHeight: 1.2,
                            color: "var(--ink-900)",
                            margin: "0 0 12px",
                        }}
                    >
                        {item.name}
                    </h2>

                    {/* Description */}
                    {item.description && (
                        <p
                            style={{
                                fontSize: "0.9rem",
                                lineHeight: 1.7,
                                color: "var(--ink-600)",
                                margin: "0 0 24px",
                                flex: 1,
                            }}
                        >
                            {item.description}
                        </p>
                    )}

                    {/* Price */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "baseline",
                            gap: "6px",
                            marginTop: "auto",
                            paddingTop: "20px",
                            borderTop: "1px solid var(--ink-100)",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "2rem",
                                fontWeight: 800,
                                color: "var(--gold-600)",
                                letterSpacing: "-0.02em",
                                lineHeight: 1,
                            }}
                        >
                            {Number(item.price).toLocaleString()}
                        </span>
                        <span
                            style={{
                                fontSize: "0.75rem",
                                fontWeight: 500,
                                color: "var(--ink-400)",
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                            }}
                        >
                            IQD
                        </span>
                    </div>
                </div>

                {/* Close button */}
                <button
                    onClick={onClose}
                    aria-label="Close"
                    style={{
                        position: "absolute",
                        top: "14px",
                        right: "14px",
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.92)",
                        border: "1px solid var(--ink-100)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                        zIndex: 1,
                        fontSize: "1.1rem",
                        color: "var(--ink-700)",
                        lineHeight: 1,
                    }}
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

        /* Mobile: bottom sheet style */
        @media (max-width: 560px) {
          [role="dialog"] {
            left: 0 !important;
            top: auto !important;
            bottom: 0 !important;
            transform: none !important;
            width: 100% !important;
            max-height: 90dvh !important;
            border-bottom-left-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
            flex-direction: column !important;
            animation: sheetIn 0.30s cubic-bezier(0.22,1,0.36,1) !important;
          }
          [role="dialog"] > div:first-child {
            width: 100% !important;
            min-height: 220px !important;
          }
          @keyframes sheetIn {
            from { transform: translateY(100%); }
            to   { transform: translateY(0); }
          }
        }
      `}</style>
        </>
    );
}