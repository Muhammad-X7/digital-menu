// components/TopNavBar.jsx
// Server Component — no "use client".
//
// Fetches translations on the server; only LanguageSwitcher (a "use client"
// island) is shipped with interactivity. The rest renders as static HTML.
// Suspense boundary around LanguageSwitcher prevents it from blocking the
// initial HTML stream — the rest of the nav renders immediately.
import { Suspense } from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import LanguageSwitcher from "./LanguageSwitcher";

export default async function TopNavBar() {
    const t = await getTranslations("nav");

    return (
        <header className="w-full bg-transparent px-8 pt-6 pb-3 flex flex-col items-center gap-3">
            <div className="w-full flex items-center justify-between">
                <Image
                    src="/logo.png"
                    alt="Jiggly Cake"
                    width={125}
                    height={125}
                    priority
                    className="object-contain"
                />
                {/*
                  Suspense fallback is null so the nav layout doesn't shift.
                  LanguageSwitcher hydrates independently after the page loads.
                */}
                <Suspense fallback={null}>
                    <LanguageSwitcher />
                </Suspense>
            </div>
            <p className="text-xl font-normal text-ink-800 tracking-[0.01em] text-center leading-normal">
                {t("tagline")}
            </p>
        </header>
    );
}