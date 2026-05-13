// Pure server component — no "use client", no hooks, zero JS shipped for this file.
// Previously this was a client component only because it used useSearchParams().
// That hook is no longer needed here: page.jsx reads searchParams from its own
// props (server-side, no hook required) and passes pre-filtered data down.
// This means every CategoryCard inside also stays server-rendered.

import { getTranslations, getLocale } from "next-intl/server";
import CategoryBar from "./CategoryBar";
import CategoryCard from "./CategoryCard";

export default async function MenuGrid({ categories, sections, activeSection }) {
    const locale = await getLocale();
    const t = await getTranslations();
    const isRtl = locale === "ar" || locale === "ckb";

    // Filter visible sections by documentId match — done here on the server,
    // no client-side useMemo needed.
    const visibleSections =
        activeSection === null
            ? sections
            : sections.filter((s) => s.documentId === activeSection);

    return (
        <div className="w-full flex flex-col items-center">
            {/*
                CategoryBar must stay "use client" because it uses useLocale()
                and useTranslations() for the pill labels and locale-aware hrefs.
                It receives sections + activeSection as serializable props.
            */}
            <CategoryBar
                sections={sections}
                activeSection={activeSection}
                isRtl={isRtl}
            />

            <main className="w-full max-w-[900px] px-8 pt-10 sm:pt-0 pb-[60px]">
                {visibleSections.length === 0 ? (
                    <EmptyState label={t("item.unavailable")} />
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

// Extracted so it can receive the translated string as a prop — keeps this
// component free of any client-only hooks.
function EmptyState({ label }) {
    return (
        <div className="flex flex-col items-center justify-center text-center pt-[80px] pb-[80px]">
            <div className="w-16 h-16 rounded-full bg-ink-100 flex items-center justify-center text-[1.8rem] mb-4">
                🍬
            </div>
            <p className="text-[0.88rem] font-light text-ink-400">{label}</p>
        </div>
    );
}