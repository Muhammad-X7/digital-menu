"use client";

import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";

export default function TopNavBar() {
  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: "transparent",
        padding: "24px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <Image
        src="/logo.jpg"
        alt="/logo.jpg"
        width={100}
        height={100}
        priority
        style={{ objectFit: "contain" }}
      />

      {/* Language switcher */}
      <LanguageSwitcher />
    </header>
  );
}