"use client";

// components/LanguageSwitcher.jsx
// Client Component — owns dropdown open/close state and locale routing.
//
// Client-side responsibilities:
//   1. open state — whether the dropdown is visible
//   2. switchLocale — replaces the locale segment in the URL path while
//      preserving any existing query params (e.g. ?section=documentId)
//   3. Outside-click handler via useEffect + ref
//   4. Prefetch all other locale routes on mount so switching is instant —
//      Next.js downloads the static HTML in the background before the user
//      clicks. This eliminates the "Rendering..." delay caused by the server
//      round-trip (and any Strapi cold-start on Render's free tier).
//   5. Prefetch on hover as a secondary safety net for first-render misses.
import { useLocale } from "next-intl";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import { locales } from "../i18n";

const LABELS = {
    ar: "عربي",
    en: "English",
    ckb: "کوردی",
};

/** Returns the target path for a given locale, preserving any sub-paths. */
function buildLocalePath(pathname, newLocale) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    return segments.join("/");
}

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const isRtl = locale === "ar" || locale === "ckb";

    // ── Fix #1: Prefetch all other locale routes on mount ──────────────────
    // Since all locale pages are statically generated (generateStaticParams),
    // they already exist as static files on the CDN. Calling router.prefetch()
    // fetches and caches them in the background immediately — so by the time
    // the user opens the dropdown and clicks, the navigation is instant with
    // no server round-trip and no "Rendering..." indicator.
    useEffect(() => {
        locales.forEach((loc) => {
            if (loc !== locale) {
                router.prefetch(buildLocalePath(pathname, loc));
            }
        });
    }, [locale, pathname, router]);

    // ── Fix #2: Prefetch on hover as a safety net ──────────────────────────
    // Covers the edge case where the mount prefetch hasn't resolved yet
    // (e.g. slow connection). By the time the user moves from hover to click,
    // the prefetch is guaranteed to have fired.
    const handleHover = useCallback(
        (loc) => {
            if (loc !== locale) {
                router.prefetch(buildLocalePath(pathname, loc));
            }
        },
        [locale, pathname, router]
    );

    // ── switchLocale ───────────────────────────────────────────────────────
    // useCallback: stable reference so dep arrays of downstream hooks don't
    // invalidate on every render.
    const switchLocale = useCallback(
        (newLocale) => {
            if (newLocale === locale) { setOpen(false); return; }
            const newPath = buildLocalePath(pathname, newLocale);
            // Preserve any existing query params (e.g. ?section=documentId)
            // so the active section filter survives a locale switch.
            const qs = searchParams.toString();
            router.push(qs ? `${newPath}?${qs}` : newPath);
            setOpen(false);
        },
        [locale, pathname, router, searchParams]
    );

    // Close on outside click.
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
                                onMouseEnter={() => handleHover(loc)}
                                onFocus={() => handleHover(loc)}
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