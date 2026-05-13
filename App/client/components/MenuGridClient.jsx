"use client";

// components/MenuGridClient.jsx
// Client Component — owns section-filter state only.
//
// Receives all data as serialisable props from MenuGrid (Server Component).
// No data fetching, no Strapi calls. The only client-side work is:
//   - useState for the active section pill
//   - Derived `visibleSections` via Array.filter (cheap, synchronous)
//
// CategoryBar and CategoryCard are rendered here:
//   - CategoryBar: Client Component (pill click handlers)
//   - CategoryCard: Server Component rendered inside a Client Component tree.
//     This is valid in React 19 — Server Components can be passed as children
//     or rendered directly inside Client Components when they carry no server-
//     only APIs. Since CategoryCard only uses next/link and next/image (both
//     work in client trees), it renders correctly with zero JS overhead.
import { useState } from "react";
import CategoryBar from "./CategoryBar";
import CategoryCard from "./CategoryCard";

export default function MenuGridClient({
    categories,
    sections,
    locale,
    isRtl,
    emptyLabel,
    allLabel,
}) {
    // activeSection: null = show all; string documentId = show one section.
    const [activeSection, setActiveSection] = useState(null);

    const visibleSections =
        activeSection === null
            ? sections
            : sections.filter((s) => s.documentId === activeSection);

    return (
        <div className="w-full flex flex-col items-center">
            {/*
              CategoryBar is a "use client" component — it renders the pill
              buttons and calls onSectionChange (which sets state here).
            */}
            <CategoryBar
                sections={sections}
                isRtl={isRtl}
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                allLabel={allLabel}
            />
            <main className="w-full max-w-[900px] px-8 pt-10 sm:pt-0 pb-[60px]">
                {visibleSections.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center pt-[80px] pb-[80px]">
                        <div className="w-16 h-16 rounded-full bg-ink-100 flex items-center justify-center text-[1.8rem] mb-4">
                            🍬
                        </div>
                        <p className="text-[0.88rem] font-light text-ink-400">
                            {emptyLabel}
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-28 sm:gap-20">
                        {visibleSections.map((sec) => {
                            const sectionCats = categories.filter(
                                (c) => c.sectionId === sec.id
                            );
                            if (sectionCats.length === 0) return null;
                            return (
                                <section key={sec.id}>
                                    <h2
                                        className="text-[2rem] sm:text-[2.4rem] font-extrabold text-ink-900 leading-[1.1] tracking-[-0.02em] pb-10 sm:p-12 text-center"
                                        dir={isRtl ? "rtl" : "ltr"}
                                    >
                                        {sec.name}
                                    </h2>
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                                        {sectionCats.map((cat, i) => (
                                            <CategoryCard
                                                key={cat.id}
                                                category={cat}
                                                locale={locale}
                                                index={i}
                                                isRtl={isRtl}
                                            />
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}