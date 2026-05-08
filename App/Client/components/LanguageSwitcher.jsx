"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { locales } from "../i18n";

const LABELS = {
    ar: "عربي",
    en: "English",
    ckb: "کوردی",
};

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const isRtl = locale === "ar" || locale === "ckb";

    function switchLocale(newLocale) {
        if (newLocale === locale) { setOpen(false); return; }
        const segments = pathname.split("/");
        segments[1] = newLocale;
        router.push(segments.join("/"));
        setOpen(false);
    }

    // Close on outside click
    useEffect(() => {
        function handle(e) {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        }
        document.addEventListener("mousedown", handle);
        return () => document.removeEventListener("mousedown", handle);
    }, []);

    return (
        <div ref={ref} className="relative">
            {/* Trigger button */}
            <button
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-ink-100 text-[0.9rem] font-medium text-ink-900 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow duration-[180ms] ease-in-out"
            >
                {LABELS[locale]}
                {/* Chevron */}
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className={`text-ink-400 transition-transform duration-[180ms] ease-in-out ${open ? "rotate-180" : "rotate-0"}`}
                >
                    <path d="M2.5 5L7 9.5L11.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    className={`absolute top-[calc(100%+8px)] min-w-[140px] bg-white border border-ink-100 rounded-[var(--radius-md)] shadow-[0_8px_32px_rgba(0,0,0,0.10)] overflow-hidden z-[100] ${isRtl ? "left-0" : "right-0"}`}
                >
                    {locales.map((loc) => {
                        const isActive = loc === locale;
                        return (
                            <button
                                key={loc}
                                onClick={() => switchLocale(loc)}
                                className={`
                                    w-full px-4 py-2.5 text-[0.88rem] border-none cursor-pointer block
                                    transition-colors duration-[120ms] ease-in-out
                                    ${isRtl ? "text-right" : "text-left"}
                                    ${isActive
                                        ? "font-semibold text-ink-900 bg-ink-50"
                                        : "font-normal text-ink-700 bg-transparent hover:bg-ink-50"
                                    }
                                `}
                            >
                                {LABELS[loc]}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}