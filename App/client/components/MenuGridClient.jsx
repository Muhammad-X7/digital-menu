"use client";

// components/MenuGridClient.jsx
// Client Component — owns section-filter state only.
//
// activeSection is stored in the URL as ?section=documentId so that:
//   - switching locale preserves the selected section (LanguageSwitcher
//     already forwards all query params via searchParams.toString())
//   - the back button and sharing a URL both restore the correct filter
//
// useRouter + useSearchParams replace useState for this one piece of state.
// Everything else is unchanged.
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
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
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Read active section from URL — null means "All"
    const activeSection = searchParams.get("section") || null;

    // Write active section to URL — preserves any other query params
    const setActiveSection = useCallback(
        (documentId) => {
            const params = new URLSearchParams(searchParams.toString());
            if (documentId === null) {
                params.delete("section");
            } else {
                params.set("section", documentId);
            }
            const qs = params.toString();
            router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
        },
        [router, pathname, searchParams]
    );

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