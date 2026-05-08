"use client";

import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";

export default function TopNavBar() {
    return (
        <header className="w-full bg-transparent px-8 py-6 flex items-center justify-between">
            {/* Logo */}
            <Image
                src="/logoss.png"
                alt="/logoss.png"
                width={100}
                height={100}
                priority
                className="object-contain"
            />

            {/* Language switcher */}
            <LanguageSwitcher />
        </header>
    );
}