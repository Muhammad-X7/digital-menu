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
                    width={100}
                    height={100}
                    priority
                    className="object-contain"
                />
                <LanguageSwitcher />
            </div>

            {/* Tagline */}
            <p className="text-[0.85rem] font-light text-ink-500 tracking-[0.01em] text-center leading-[1.5]">
                {t("tagline")}
            </p>
        </header>
    );
}