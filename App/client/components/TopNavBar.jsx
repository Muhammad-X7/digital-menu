"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function TopNavBar() {
    const t = useTranslations("nav");

    return (
        <header className="w-full bg-transparent px-8 pt-6 pb-3 flex flex-col items-center gap-3">
            {/* Top row: logo + language switcher */}
            <div className="w-full flex items-center justify-between">
                <Image
                    src="/logo.png"
                    alt="Jiggly Cake"
                    width={110}
                    height={110}
                    priority
                    className="object-contain"
                />
                <LanguageSwitcher />
            </div>

            {/* Tagline */}
            <p className="text-base font-normal text-ink-600 tracking-[0.01em] text-center leading-normal">
                {t("tagline")}
            </p>
        </header>
    );
}