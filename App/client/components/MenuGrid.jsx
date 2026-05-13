// components/MenuGrid.jsx
// Server Component — no "use client".
//
// Bridge between the server data layer (page.jsx fetches) and the client
// interactivity layer (MenuGridClient owns section-filter state).
//
// Why this wrapper exists:
//   - getTranslations() and getLocale() are server-only APIs.
//   - MenuGridClient needs emptyLabel and allLabel as strings (not a
//     translation function), so we resolve them here and pass as props.
//   - Suspense boundary allows the page shell to stream to the browser
//     while MenuGridClient hydrates without blocking.
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import MenuGridClient from "./MenuGridClient";

export default async function MenuGrid({ categories, sections, locale }) {
    const t = await getTranslations();
    const isRtl = locale === "ar" || locale === "ckb";

    return (
        <div className="w-full flex flex-col items-center">
            <Suspense fallback={null}>
                <MenuGridClient
                    categories={categories}
                    sections={sections}
                    locale={locale}
                    isRtl={isRtl}
                    emptyLabel={t("item.unavailable")}
                    allLabel={t("category.all")}
                />
            </Suspense>
        </div>
    );
}